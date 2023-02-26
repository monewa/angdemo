
import { Injectable } from "@angular/core";
import { Player, PlayerModel } from "./player";
import { Scorecard } from "./scorecard";
import { ScorecardLine } from "./scorecardLine";
import { Tournament } from "./tournament";
import { TournamentRepository } from "./tournament.repository";

@Injectable({
    providedIn: 'root'
  })

export class GameModel{

    constructor(private player: PlayerModel, private repository: TournamentRepository ) { }

    getTournament(id: number): Tournament{
        return this.repository.getActiveTournament(id);
    }

    getScores(id: number, gameNo: number): ScorecardLine[]{
        return this.repository.getScores(id, gameNo);
    }

    getGame(id: number, gameNo: number): Game{
        return this.repository.getActiveGame(id, gameNo);
    }

    linkToTournament(id: number, gameNo: number, name: string): void{
        this.getGame(id, gameNo).tournament= name;
    } // create game / update game

    linkToCourse(id: number, gameNo: number, name: string): void{
        this.getGame(id, gameNo).course= name;
    } // create game / update game

    linkToScorecard(id: number, gameNo: number, scorecard: Scorecard): void{
        this.getGame(id, gameNo).scorecard= scorecard
    } // create game / update game
    
    showEndGameAlert(id: number, gameNo: number): boolean{
        if (this.getGame(id, gameNo).endDate <= new Date()) {
            return true;
        }
        return false;
    } //home

    postponeGame(id: number, gameNo: number): void{
        const newEndDate= this.getGame(id, gameNo).endDate.getDay()+1
        this.getGame(id, gameNo).endDate.setDate(newEndDate)
        this.getGame(id, gameNo).isEnded= false;
    } //alert

    endGame(id: number, gameNo: number): void{
        this.getGame(id, gameNo).isEnded= true;
        this.updateGamesPlayed(id, gameNo);
        this.declareWinner(id, gameNo);
    }// end game
    
    updateGamesPlayed(id: number, gameNo: number): void{
        this.getScores(id, gameNo).forEach( (s)=> {
           const tournamentId= this.getTournament(id).id;
           const tournament= this.getGame(id, gameNo).tournament;
           this.player.playGame(s.playerId, tournamentId, tournament, gameNo, s.score, s.points)
      });
    } //end game

    getLeaderId(id: number, gameNo: number): number{
        const result= this.getScores(id, gameNo).find( s=> { return s.position == 1 } );
        return result?.playerId || -1;
     }
  
    declareWinner(id: number, gameNo: number): void{
        this.player.winGame(this.getLeaderId(id, gameNo));
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

    linkToTournament(name: string): void{
        this.tournament= name;
    } // create game / update game

    linkToCourse(name: string): void{
        this.course= name;        
    } // create game / update game

    linkToScorecard(scorecard: Scorecard): void{
        this.scorecard= scorecard
    } // create game / update game
    
    showEndGameAlert(): boolean{
        if (this.endDate <= new Date()) {
            return true;
        }
        return false;
    } //home

    postponeGame(): void{
        const newEndDate= this.endDate.getDay()+1
        this.endDate.setMonth(newEndDate)
        this.isEnded= false;
    } //alert

    endGame(): void{
        this.isEnded= true;
    }// end game
  
    declareWinner(player: Player): void{
        player.winGame();
    }
}