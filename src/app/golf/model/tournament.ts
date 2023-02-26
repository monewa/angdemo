
import { Injectable } from "@angular/core";
import { Game } from "./game";
import { TournamentRepository } from "./tournament.repository";
import { PlayerRepository } from "./player.repository";
import { PlayerModel } from "./player";

@Injectable({
    providedIn: 'root'
  })

export class TournamentModel{


   constructor(private player: PlayerModel, private tournamentRepository: TournamentRepository) {   }

   getTournament(id: number): Tournament{
      return this.tournamentRepository.getTournament(id);
   }

   getGames(id: number): Game[]{
      return this.tournamentRepository.getActiveGames(id);
   }

   getResults(id: number,): any[]{
      return this.tournamentRepository.getResults(id);
   }

   getResult(playerId: number): any{
      return this.tournamentRepository.getResult(playerId);
   }

   getStartDate(id: number): string{
      // return this.getTournament(id).getStartDate();
      const date= this.getTournament(id).startDate.toString();
      return date.substring(0,10) || '0000-00-00'
   }

   getEndDate(id: number): string{
      // return this.getTournament(id).getEndDate();
      const date= this.getTournament(id).endDate.toString();
      return date.substring(0,10)
   }

   addNewGame(id: number, game: Game): void{
      // this.getTournament(id).addNewGame(game);
      this.getGames(id).push(game);
      game.gameNo= this.getTournament(id).noOfgames+ 1 ;
      this.calculateResults(id);
   } //end game
   
   removeGame(id: number, index: number): void{
      // this.getTournament(id).removeGame(index)
      this.getGames(id).splice(index, 1);
   } //update game

   addNewPlayer(id: number, playerId: number, surname: string, gamesPlayed: number, points: number): void{
      // this.getTournament(id).addNewPlayer(playerId, surname, score, points);
      const isAlreadyThere= this.getResults(id).some( r=> { return r.playerId==  playerId} )
      if (!isAlreadyThere) {
         const result= {
            "playerId": playerId,
            "position": 0, 
            "name": surname, 
            "points": points,
            "gamesPlayed": gamesPlayed
         }
      this.getResults(id).push(result);
      } 
   } //end game / player proflie

   updatePoints$Games(playerId: number, score: number, points: number): void{
      // this.getTournament(id).updatePoints$Games(playerId, score, points);
     this.getResult(playerId).points= points;
     this.getResult(playerId).gamesPlayed= score;
   } //player proflie

   calculateResults(id: number): void{
      // this.getTournament(id).calculateResults()
      this.getResults(id).sort(( a: any, b: any)=> { return a.points - b.points; });
      this.getResults(id).reverse();
      this.getResults(id).forEach( (r, index) => { r.position= index+1 });
   } //end game

   showEndTournamentAlert(id: number): boolean{
      // return this.getTournament(id).showEndTournamentAlert()
      if (this.getTournament(id).endDate <= new Date()) {
         return true;
      }
      return false;
   } // home

   postponeTournament(id: number): void{
      // this.getTournament(id).postponeTournament()
      const newEndDate= this.getTournament(id).endDate.getMonth()+1;
      this.getTournament(id).endDate.setMonth(newEndDate);
      this.getTournament(id).isEnded= false;
   }// alert

   endTournament(id: number): void{
      // this.getTournament(id).endTournament()
      this.getTournament(id).isEnded= true;
   } //end tournament / alert

   getLeaderId(id: number): number{
      // return this.getTournament(id).getLeaderId()
      const leader= this.getResults(id).find( r=>{ return r.position == 1 } )
      return leader.playerId;
   }

   declareWinner(id: number): void{
      // this.getTournament(id).declareWinner(this.playerRepository)
      this.player.winTournament(this.getLeaderId(id));
   }//end tournament

}


export class Tournament{

   id: number= 0;
   name: string= '';
   startDate: Date= new Date();
   endDate: Date= new Date();
   games: Game[]= [];
   results: any[]= [];  
   isEnded: boolean= false;

   constructor(name: string, startDate: Date, endDate: Date){ 
     this.name= name;
     this.startDate= startDate;
     this.endDate= endDate;
   }
 
   get noOfgames() : number {
      return this.games.length
   }

   getStartDate(): string{
      const date= this.startDate.toString();
      return date.substring(0,10)
   }

   getEndDate(): string{
      const date= this.endDate.toString();
      return date.substring(0,10)
   }

   addNewGame(game: Game): void{
      this.games.push(game);
      game.gameNo= this.noOfgames+ 1 ;
      this.calculateResults();
   }
   
   removeGame(index: number): void{
      this.games.splice(index, 1);
   } //update game

   addNewPlayer(playerId: number, surname: string, points: number, gamePlayed: number): void{
      const aleadyThere= this.results.some( r=> {return r.playerId==  playerId} )
      if (!aleadyThere) {
         const result= {
            "playerId": playerId,
            "position": 0, 
            "name": surname, 
            "points": points,
            "gamesPlayed": gamePlayed
         }
         this.results.push(result);
      }       
   } //end game / player proflie

   getResult(playerId: number){
      return this.results.find(r=> { return r.playerId= playerId }) || {}
   }

   updatePoints$Games(playerId: number, points: number, gamePlayed: number ): void{
     this.getResult(playerId).points= points;
     this.getResult(playerId).gamesPlayed= gamePlayed;
   } //player proflie

   calculateResults(): void{
      this.results.sort(( a: any, b: any)=> {  return a.points - b.points;  });
      this.results.reverse();
      this.results.forEach( (r, index) => { r.position= index+1 });
   } //end game

   showEndTournamentAlert(): boolean{
      if (this.endDate <= new Date()) {
         return true;
      }
      return false;
   } // home

   postponeTournament(): void{
      const newEndDate= this.endDate.getMonth()+1
      this.endDate.setMonth(newEndDate)
      this.isEnded= false;
   }// alert

   endTournament(): void{
      this.isEnded= true;
   } //end tournament / alert

   getLeaderId(): number{ 
      const leader= this.results.find( r=>{ return r.position == 1 } )
      return leader.playerId;
   }

   declareWinner(player: PlayerRepository): void{
      player.getPlayer(this.getLeaderId()).winTournament();
      console.log('called-w');
      
   }   

}