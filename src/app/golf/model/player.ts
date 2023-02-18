
import { Injectable } from "@angular/core";
import { PlayerRepository } from "./player.repository";

@Injectable({
    providedIn: 'root'
  })

export class PlayerModel{

  id: number= 0;
  index: number= 0;

  constructor(private repository: PlayerRepository) {  }

  selectIndex(index: number){
    this.index= index;
  }

  selectId(id: number){
    this.id= id;
  }

  getPlayer(){
    return this.repository.getPlayer(this.id) || this.repository.getPlayerbyIndex(this.index);
  }

  calculateHandcap(): void{  
  }

  calculateRating(): void{ 
    let rating= ((this.getPlayer().awardsWon* 5) + (this.getPlayer().tournamentsWon*3) + (this.getPlayer().gamesWon*1))
  / (this.getPlayer().gamesPlayed);
    this.getPlayer().rating= Math.floor(rating);
  }
  
  calculateAge(): void{
   this.getPlayer().age= new Date().getFullYear() - this.getPlayer().birthDate.getFullYear()-1;
   if (  this.getPlayer().birthDate.getMonth() <= new Date().getMonth() ) {
       this.getPlayer().age++;
   }
  } 

  getDateOfBirth(): string {
    let birth= `${this.getPlayer().birthDate.getDate()}-${this.getPlayer().birthDate.getMonth()}-${this.getPlayer().birthDate.getFullYear()}`
    return birth;
  } //Player proflie
  
  playGame(gameNo: number, tournament: string, score: number, points: number ): void{
    this.getGames().push({"gameNo": gameNo, "tournament": tournament, "score": score, "points": points}) 
    this.getPlayer().gamesPlayed= this.getGames().length;
  } //End Game

  getGames(): any[]{
    return this.repository.getPlayer(this.id).games;
  }

  getTournamentGames(tournament: string, ): any[]{
    let tournamentGames= this.getGames().filter( g=> {return g.tournament == tournament})
    return tournamentGames;
  } //Tournament report

  getTournamentPoints(tournament: string, ): number{
    let tournamentPoints= 0;
    this.getTournamentGames(tournament).forEach(g => { 
      tournamentPoints+= g.points; 
    });
    return tournamentPoints;
  } //Tournament report

  getTournamentGamesPlayed(tournament: string, ): number{
    return this.getTournamentGames(tournament).length
  } //Tournament report

  winGame(): void{
    this.getPlayer().gamesWon++;
  } //End Game
  
  winTournament(): void{
    this.getPlayer().tournamentsWon++;
  } //End Tournament 
  
  winAward(): void{
    this.getPlayer().awardsWon++;
  } //Give award

}


export class Player{

    id: number= 0;
    firstName: string= '';
    surname: string= '';
    birthDate: Date= new Date();
    age: number= 0;
    handicap: number= 0;
    gamesPlayed: number= 0;
    games: any[]= [];  
    gamesWon: number= 0;
    tournamentsWon: number= 0;
    awardsWon: number= 0;
    rating: number= 0;
     
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
        this.calculateAge();   
        // this.generateId();
        this.calculateRating();
        
    }
    
    // generateId(){
    //   this.playerId= Math.floor(Math.random()*9999)+ this.surname.charAt(0)+ this.firstName.charAt(0);
    // }

    calculateAge(){ 
      this.age= new Date().getFullYear() - this.birthDate.getFullYear()-1;
      if (  this.birthDate.getMonth() <= new Date().getMonth() ) {
        this.age++;
      }
    } 

    calculateRating(){ 
        let rating= ((this.awardsWon* 5) + (this.tournamentsWon*3) + (this.gamesWon*1))
        / (this.gamesPlayed)
        this.rating= this.rating= Math.floor(rating);
    }    
}
