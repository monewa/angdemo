
import { Game } from "./game";
import { Player, PlayerModel } from "./player";
import { Injectable } from "@angular/core";
import { TournamentRepository } from "./tournament.repository";

@Injectable({
    providedIn: 'root'
  })

export class TournamentModel{

   id: number= 1;

   constructor(private player: PlayerModel, private repository: TournamentRepository) {   }

   selectId(id: number): void{
      this.id= id;
   }

   getTournament(): Tournament{
      return this.repository.getTournament(this.id);
   }

   getGames(): Game[]{
      return this.getTournament().games;
   }

   getStartDate(): string{
      const date= this.getTournament().startDate.toString();
      const result= date.substring(0,10)
      return result;
   }

   getEndDate(): string{
      const date= this.getTournament().endDate.toString();
      const result= date.substring(0,10)
      return result;
   }

   addNewGame(game: Game): void{
      this.getTournament().games.push(game);
      this.getTournament().noOfgames= this.getTournament().games.length;
      this.calculateResults();
      this.getTournament().lastGameNo= game.gameNo;
   } //end game
   
   removeGame(index: number): void{
      this.getTournament().games.splice(index, 1);
      this.getTournament().noOfgames= this.getTournament().games.length;
   } //update game

   addNewPlayer(player: Player): void{
      const aleadyThere= this.getTournament().results.some( r=> { return r.name==  player.surname})
      if (!aleadyThere) {
         this.player.selectId(player.id)
         const result= {
            "playerId": player.id,
            "position": 0, 
            "name": player.surname, 
            "points": this.player.getTournamentPoints(this.getTournament().name),
            "gamesPlayed": this.player.getTournamentGamesPlayed(this.getTournament().name)
         }
         this.getTournament().results.push(result);
      } 
   } //end game / player proflie

   updatePoints$Games(index: number, player: Player): void{
      this.player.selectId(player.id)
     this.getResults()[index].points= this.player.getTournamentPoints(this.getTournament().name);
     this.getResults()[index].gamesPlayed= this.player.getTournamentGamesPlayed(this.getTournament().name)
   } //player proflie

   calculateResults(): void{
      this.getResults().sort(( a: any, b: any)=> {  return a.points - b.points;
      });
      this.getResults().reverse();
      this.getResults().forEach( (r, index) => { r.position= index+1 });
   } //end game

   getResults(): any[]{
      return this.getTournament().results
   }

   showEndTournamentAlert(): boolean{
      if (this.getTournament().endDate <= new Date()) {
         return true;
      }
      return false;
   } // home

   postponeTournament(): void{
      const newEndDate= this.getTournament().endDate.getMonth()+1
      this.getTournament().endDate.setMonth(newEndDate)
      this.getTournament().isEnded= false;
   }// alert

   endTournament(): void{
      this.getTournament().isEnded= true;
   } //end tournament / alert

   getLeaderId(): number{
      const result= this.getResults().find( r=>{ return r.position == 1 } )
      const leaderId= result.playerId;
      return leaderId;
   }

   declareWinner(): void{
      this.player.selectId(this.getLeaderId())
      this.player.winTournament();
   }//end tournament

}


export class Tournament{

   id: number= 0;
   name: string= '';
   startDate: Date= new Date();
   endDate: Date= new Date();
   games: Game[]= [];
   noOfgames: number= 0;
   results: any[]= [];  
   isEnded: boolean= false;
   lastGameNo: number= 0;

   constructor(name: string, startDate: Date, endDate: Date){ 
     this.name= name;
     this.startDate= startDate;
     this.endDate= endDate;
   }

}