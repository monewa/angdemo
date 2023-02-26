
import { Injectable } from "@angular/core";
import { PlayerRepository } from "./player.repository";

@Injectable({
    providedIn: 'root'
  })

export class PlayerModel{

  constructor(private repository: PlayerRepository) {  }

  getPlayer(id: number): Player{
    return this.repository.getPlayer(id);
  }

  getSurname(id: number): string{
    return this.repository.getPlayer(id).surname;
  }

  calculateHandcap(id: number): void{  
    this.getPlayer(id).calculateHandcap();
  }

  getDateOfBirth(id: number): string {
      const date= this.getPlayer(id).birthDate.toString();
      return date.substring(0,10)
  } //Player proflie

  getRating(awardsWon: number, tournamentsWon: number, gamesWon: number, gamesPlayed: number, ) : number {
    let rating= (awardsWon* 5) + (tournamentsWon*3) + (gamesWon*1)/ (gamesPlayed);
    return rating= Math.floor(rating);
  }
  
  playGame(id: number, tournamentId:number, tournament: string, gameNo: number, score: number, points: number ): void{
    this.getPlayer(id).games.push({ "tournamentId": tournamentId, "tournament": tournament, "gameNo": gameNo, "score": score, "points": points}) 
    // this.getPlayer(id).playGame(tournamentId, tournament, gameNo, score, points);
  } //End Game

  getGames(id: number): any[]{
    return this.repository.getPlayer(id).games;
  }

  getTournamentGames(id: number, tournamentId: number, ): any[]{
    return this.getPlayer(id).getTournamentGames(tournamentId);
  } //Tournament report

  getTournamentPoints(id: number, tournamentId: number, ): number{
    // return this.getPlayer(id).getTournamentPoints(tournamentId);
    let tournamentPoints= 0;
    this.getTournamentGames(id, tournamentId).forEach(g => { tournamentPoints+= g.points; });
    return tournamentPoints;
  } //Tournament report

  getTournamentGamesPlayed(id: number, tournamentId: number, ): number{
    return this.getTournamentGames(id, tournamentId).length
  } //Tournament report

  winGame(id: number): void{
    // this.getPlayer(id).winGame();
    this.getPlayer(id).gamesWon++;
  } //End Game
  
  winTournament(id: number): void{
    // this.getPlayer(id).winTournament();
    this.getPlayer(id).tournamentsWon++;

  } //End Tournament 
  
  winAward(id: number): void{
    // this.getPlayer(id).winAward();
    this.getPlayer(id).awardsWon++;

  } //Give award

}


export class Player{

    id: number= 0;
    firstName: string= '';
    surname: string= '';
    birthDate: Date= new Date();
    handicap: number= 0;
    gamesPlayed: number= 0;
    games: any[]= [];  
    gamesWon: number= 0;
    tournamentsWon: number= 0;
    awardsWon: number= 0;
     
    constructor(firstName: string, surname: string, date: any, handicap: number, 
        gamesPlayed: number, gamesWon: number, tournamentsWon: number, awardsWon: number ){
        this.firstName= firstName;
        this.surname= surname;
        this.birthDate= new Date(date);
        this.handicap= handicap;    
        this.gamesPlayed= gamesPlayed;
        this.gamesWon= gamesWon;
        this.tournamentsWon= tournamentsWon;
        this.awardsWon= awardsWon;
    }

    get rating() : number {
      let rating= (this.awardsWon* 5) + (this.tournamentsWon*3) + (this.gamesWon*1)/ 
        (this.gamesPlayed);
        rating= Math.floor(rating);
      return rating
    }
    
    get age(): number{ 
      let age= new Date().getFullYear() - this.birthDate.getFullYear()-1;
      if (  this.birthDate.getMonth() <= new Date().getMonth() ) {
        age++;
      }
      return age;
    }   

    playGame(tournamentId:number, tournament: string, gameNo: number, score: number, points: number ): void{
      this.games.push({ "tournamentId": tournamentId, "tournament": tournament, "gameNo": gameNo, "score": score, "points": points}) 
      this.gamesPlayed++;
    } 

    getTournamentGames(tournamentId: number): any[]{
      let tournamentGames= this.games.filter( g=> {return g.tournamentId == tournamentId})
      return tournamentGames;
    }

    getTournamentPoints(tournamentId: number): number{
      let tournamentPoints= 0;
      this.getTournamentGames(tournamentId).forEach(g => { tournamentPoints+= g.points; });
      return tournamentPoints;
    } //Tournament report

    calculateHandcap(): void{  
    
    }

    winGame(): void{
      this.gamesWon++;
    } //End Game
    
    winTournament(): void{
      this.tournamentsWon++;
    }

    winAward(): void{
      this.awardsWon++;
    } 



    // public get firstName() : string { return this.firstName }

    // public set surname(val : string) { this.firstName = val;  }

    // public set birthDate(val : any) { this.firstName = val;  }

    // public set handicap(val : number) { this.handicap = val;  }

    // public set gamesPlayed(val : number) { this.gamesPlayed = val;  }

    // public set gamesWon(val : number) { this.gamesWon = val;  }

    // public set tournamentsWon(val : number) { this.tournamentsWon = val;  }

    // public set awardsWon(val : number) { this.awardsWon = val;  }
    

}
