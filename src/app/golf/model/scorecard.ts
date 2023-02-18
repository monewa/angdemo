
import { ScorecardLine } from "./scorecardLine";
import { Injectable } from "@angular/core";
import { PlayerRepository } from "./player.repository";
import { TournamentRepository } from "./tournament.repository";

@Injectable({
    providedIn: 'root'
  })

export class ScorecardModel{

    playersList: any[]= [];
    id: number= 0;
    gameNo: number= 0;

    constructor(private playerRepository: PlayerRepository, private tournamentRepository: TournamentRepository ) { 
      }

    selectId$Game(id: number, gameNo: number): void{
        this.id= id;
        this.gameNo= gameNo;
    }

    getScorecard(){  
        return this.tournamentRepository.getScorecard(this.id, this.gameNo);
    }
    
    getScores(): ScorecardLine[]{
        this.populatePlayersList();
        return this.getScorecard().scores;
    }

    addNewScorecardLine(scoreline: ScorecardLine): void{
        const alreadyThere= this.getScores().some( s=> { return s.playerId== scoreline.playerId; })
        this.sortByScore();
        if (!alreadyThere) {
            this.getScores().push(scoreline);
            const playerId=scoreline.playerId
            this.addToPlayerCard(playerId);
        }
    }//update Scorecard

    removeScorecardLine(index: number, playerId: number): void{
        this.getScores().splice(index, 1);
        this.getPlayer(playerId).isOnScorecard= false;
    }//update Scorecard

    populatePlayersList(): void{ 
        this.playerRepository.getPlayers().forEach( p=> {
            const aleadyThere= this.playersList.some( (pl)=> { return pl.id== p.id })
            if (!aleadyThere) { 
                const player= {
                    'id': p.id, 
                    'firstName': p.firstName, 
                    'surname': p.surname,
                    'handicap': p.handicap, 
                    'isOnScorecard': false
                }
                this.playersList.push(player);  
            }
        });
    }

    getPlayersList(): any[]{
       this.populatePlayersList();
       this.comparePlayersList$Scorecard();
       return this.playersList.filter( p=> { return p.isOnScorecard== false })
    }

    getPlayer(playerId: number): any{
        const player= this.playersList.find( p=> { return p.id== playerId })
        return player || {}
     }

    comparePlayersList$Scorecard(): void{
        this.playersList.forEach( pl=> { 
            const alreadyThere= this.getScores().some( s=> { return pl.id== s.playerId })
            if (alreadyThere) { 
                pl.isOnScorecard= true;
            }
        })
    }

    addToPlayerCard(playerId: number): void{
        this.getPlayer(playerId).isOnScorecard=true;
    }

    sortByScore(): void{
        this.getScores().sort( (a: ScorecardLine, b: ScorecardLine)=> { return a.score - b.score });
        this.getScores().reverse();
        this.getScores().forEach( (s, index)=> { 
            s.position= index+1;
         });
    } //End Game(save) / update Scorecard

}

export class Scorecard{

    id: number= 0;
    gameNo: number= 0;  
    scores: ScorecardLine[]= [];  
    playersList: any[]= [];
    
    constructor(gameNo: number){ 
        this.gameNo= gameNo;

    }
}