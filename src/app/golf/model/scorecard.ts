
import { Injectable } from "@angular/core";
import { ScorecardLine } from "./scorecardLine";
import { PlayerRepository } from "./player.repository";
import { TournamentRepository } from "./tournament.repository";
import { Player } from "./player";
import { Game } from "./game";

@Injectable({
    providedIn: 'root'
  })

export class ScorecardModel{

    playersCard: ScorecardLine[]= [];
    filteredscorecard: ScorecardLine[]= [];

    constructor(private playerRepository: PlayerRepository, private tournamentRepository: TournamentRepository ) {     }

    getScores(id: number, gameNo: number): ScorecardLine[]{  
        return this.tournamentRepository.getScores(id, gameNo);
    }

    getScoreline(id: number, gameNo: number, playerId: number): ScorecardLine{  
        return this.tournamentRepository.getScoreLine(id, gameNo, playerId);
    }

    get players(): Player[]{  
        return this.playerRepository.getPlayers();
    }

    filterScorecard(id: number, gameNo: number) : void {    
        this.filteredscorecard= this.getScores(id, gameNo).filter(s=> { return s.isAddedToCard== true })
        this.playersCard= this.getScores(id, gameNo).filter(s=> { return s.isAddedToCard== false })
        this.sortByScore();
    }

    addNewScorecardLine(id: number, gameNo: number, scoreline: ScorecardLine): void{        
        const alreadyThere= this.getScores(id, gameNo).some( s=> { return s.playerId== scoreline.playerId; })
        if (!alreadyThere) {
            this.getScores(id, gameNo).push(scoreline);
        }
    }//update Scorecard

    compareCard$Players(id: number, gameNo: number): void{
        let alreadyThere= false;
        this.players.forEach( pl=> {
            alreadyThere= this.getScores(id, gameNo).some( s=> { return pl.id== s.playerId })                        
            if (!alreadyThere) { 
                this.addNewScorecardLine(id, gameNo, 
                    new ScorecardLine(pl.id, pl.firstName, pl.surname, pl.handicap) 
                );
            }            
        });
        this.filterScorecard(id, gameNo);
    }

    add$removeScorecardLine(id: number, gameNo: number, playerId: number, option: boolean): void{
        this.getScoreline(id, gameNo, playerId).isAddedToCard= option;
        this.getScoreline(id, gameNo, playerId).position= 0;
        this.filterScorecard(id, gameNo);        
    }//update Scorecard

    updateScoreline(id: number, gameNo: number, playerId: number, score: number): void{
        this.getScoreline(id, gameNo, playerId).score= score;
    } //update Scorecard

    updateScorecard(game: Game[], id: number): void{
        this.tournamentRepository.patchGames(game, id);
        this.sortByScore();
    } 

    sortByScore(): void{
        this.filteredscorecard.sort( (a: ScorecardLine, b: ScorecardLine)=> { return a.score - b.score });
        this.filteredscorecard.reverse();
        this.filteredscorecard.forEach( (s, index)=> { s.position= index+1; });
    } //End Game(save) / update Scorecard

    getLeaderId(id: number, gameNo: number): number{
        const result= this.getScores(id, gameNo).find( s=> { return s.position == 1 } );
        return result?.playerId || -1;
    }

    getPoints(id: number, gameNo: number, playerId: number): number{
        let points= 0;
        const position = this.getScoreline(id, gameNo, playerId).position;
        switch (position) {
            case 1: points= 12;   break;
            case 2: points= 10;   break;
            case 3: points= 8;     break;
            default: points= 2;     break;
        }
        return points;
    }

}


export class Scorecard{

    id: number= 0;
    gameNo: number= 0;  
    scores: ScorecardLine[]= []; 
    playersCard: ScorecardLine[]= [];
    filteredscorecard: ScorecardLine[]= []; 
    
    constructor(gameNo: number){ 
        this.gameNo= gameNo;
    }

    setScores(scores: ScorecardLine[]): void{  
        this.scores= scores;
    }

    getScoreline(playerId: number): ScorecardLine{  
        const line= this.scores.find( s=> { return s.playerId== playerId });
        return line || new ScorecardLine(0, '', '', 0)
    }

    getPlayers(playerRepository: PlayerRepository): Player[]{  
        return playerRepository.getPlayers();
    }

    getPlayer(playerRepository: PlayerRepository, playerId: number): Player{  
        return playerRepository.getPlayer(playerId);
    }

    filterScorecard() : void {
        this.filteredscorecard= this.scores.filter(s=> { return s.isAddedToCard== true })
        this.playersCard= this.scores.filter(s=> { return s.isAddedToCard== false })
    }

    addNewScorecardLine(scoreline: ScorecardLine): void{
        const alreadyThere= this.scores.some( s=> { return s.playerId== scoreline.playerId; })
        if (!alreadyThere) {
            this.scores.push(scoreline);
            this.sortByScore();
        }
    }

    compareCard$Players(playerRepository: PlayerRepository): void{
        let alreadyThere= false;
        this.getPlayers(playerRepository).forEach( pl=> {
            alreadyThere= this.scores.some( s=> { return pl.id== s.playerId })                        
            if (!alreadyThere) { 
                this.addNewScorecardLine(
                    new ScorecardLine(pl.id, pl.firstName, pl.surname, pl.handicap) 
                );
            }
        });
        this.filterScorecard();
        console.log(this.filteredscorecard);
        
    }

    add$removeScorecardLine(playerId: number, option: boolean): void{
        this.getScoreline(playerId).add$RemoveFromCard(option);
        this.filterScorecard();        
    }//update Scorecard

    updateScores(playerId: number, score: number): void{
        this.getScoreline(playerId).setScore(score);
    } //update Scorecard
; 
    updateGamesPlayed(playerRepository: PlayerRepository, playerId: number, tournamentId: number, tournament: string, gameNo: number): void{
        this.scores.forEach( (s)=> {
           this.getPlayer(playerRepository, playerId).playGame(tournamentId, tournament, gameNo, s.score, s.points)
        });
    }

    sortByScore(): void{
        this.scores.sort( (a: ScorecardLine, b: ScorecardLine)=> { return a.score - b.score });
        this.scores.reverse();
        this.scores.forEach( (s, index)=> { s.setPosition(index+1); });
    }  

    getLeaderId(): number{
        const result= this.scores.find( s=> { return s.position == 1 } )
        return result?.playerId || -1;
     }
    
}