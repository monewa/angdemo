
import { Injectable } from "@angular/core";
import { TournamentRepository } from "./tournament.repository";

@Injectable({
    providedIn: 'root'
  })

export class ScorecardLineModel{

    id: number= 0;
    gameNo: number= 0;
    playerId: number= 0;

   constructor(private repository: TournamentRepository) {   }

    selectPlayerId$Game(id: number, gameNo: number, playerId: number): void{
        this.id= id;
        this.gameNo= gameNo;
        this.playerId= playerId
    }

    getScorecardLine(){
        return this.repository.getScoreLine(this.id, this.gameNo, this.playerId)
    }

    getPlayerId(): number{
        return this.repository.getScoreLine(this.id, this.gameNo, this.playerId).playerId;
    }

    editLine(id: number, firstName: string, surname: string, handicap: number): void{
        this.getScorecardLine().playerId= id;
        this.getScorecardLine().firstName= firstName;
        this.getScorecardLine().surname= surname;
        this.getScorecardLine().handicap= handicap;
    } //update Scorecard

    updateScores(score: number): void{
        this.getScorecardLine().score= score;
    } //update Scorecard

    setPosition(position: number): void{
        this.getScorecardLine().position= position;
        this.calculatePoints();
    } //End Game

    calculatePoints(): void{
        switch (this.getScorecardLine().position) {
            case 1: this.getScorecardLine().points= 12;   break;
            case 2: this.getScorecardLine().points= 10;   break;
            case 3: this.getScorecardLine().points= 8;     break;
            default: this.getScorecardLine().points= 2;     break;
        }
    } //End Game   

}

export class ScorecardLine{

    id: number= 0;
    playerId: number= 0;
    position: number= 0;
    firstName: string= ''; 
    surname: string= ''; 
    handicap: number= 0;  
    score: number= 0;  
    points: number= 0;

    constructor(playerId: number, firstName: string, surname: string, handicap: number ){ 
      this.playerId= playerId;
      this.firstName= firstName
      this.surname=  surname
      this.handicap= handicap; 
    }



}