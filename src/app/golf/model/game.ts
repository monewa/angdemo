
import { Injectable } from "@angular/core";
import { PlayerModel } from "./player";
import { Scorecard } from "./scorecard";
import { ScorecardLine } from "./scorecardLine";
import { TournamentRepository } from "./tournament.repository";

@Injectable({
    providedIn: 'root'
  })

export class GameModel{

    gameNo: number= 0;
    id: number= 0;

    constructor(private player: PlayerModel, private repository: TournamentRepository ) { }

    selectId$Game(id: number, gameNo: number): void{
        this.id= id;
        this.gameNo= gameNo;
    }

    getGame(): Game{
        return this.repository.getActiveGame(this.id, this.gameNo);
    }
    
    generateGameNo(lastGameNo: number): void{
        this.getGame().gameNo= lastGameNo+ 1;
    } // create game / update game

    getScorecard(): Scorecard{
        return this.getGame().scorecard;     
    }

    getScores(): ScorecardLine[]{
        return this.getGame().scorecard.scores;     
    }

    linkToTournament(name: string): void{
        this.getGame().tournament= name;
    } // create game / update game

    linkToCourse(name: string): void{
        this.getGame().course= name;
    } // create game / update game

    linkToScorecard(scorecard: Scorecard): void{
        this.getGame().scorecard= scorecard
    } // create game / update game
    
    showEndGameAlert(): boolean{
        if (this.getGame().endDate <= new Date()) {
            return true;
        }
        return false;
    } //home

    postponeGame(): void{
        const newEndDate= this.getGame().endDate.getDay()+1
        this.getGame().endDate.setMonth(newEndDate)
        this.getGame().isEnded= false;
    } //alert

    endGame(): void{
        this.getGame().isEnded= true;
        this.updateGamesPlayed();
        this.declareWinner();
    }// end game
    
    updateGamesPlayed(): void{
        this.getScores().forEach( (s)=> {
           const gameNo= this.getGame().gameNo
           const tournament= this.getGame().tournament
           this.player.selectId(s.playerId)
           this.player.playGame(gameNo, tournament, s.score, s.points)
      });
    } //end game

    getLeaderId(): number{
        const result= this.getScores().find( r=> { return r.position == 1 } )
        return result?.playerId || -1;
     }
  
    declareWinner(): void{
        this.player.selectId(this.getLeaderId())
        this.player.winGame();
    }
}


export class Game{

    id: number= 0;
    gameNo: number= 0;
    tournament: string= ''; 
    course: string= '';         
    startDate: Date= new Date();
    endDate: Date= new Date();
    isEnded: boolean= false;
    scorecard: Scorecard= new Scorecard(0);

    constructor(tournament: string, startDate: Date, endDate: Date, course: string){
        this.tournament= tournament;
        this.course= course;
        this.startDate= startDate;
        this.endDate= endDate;
    }
}