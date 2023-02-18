
import { Injectable } from '@angular/core';
import { Tournament } from './tournament';
import { RestDataSource } from './rest.datasource';
import { Game } from './game';
import { GolfMessageService } from '../services/message.service';
import { Scorecard } from './scorecard';
import { ScorecardLine } from './scorecardLine';

@Injectable({
  providedIn: 'root'
})
export class TournamentRepository {

  tournaments: Tournament[]= [];
  activeTournaments: Tournament[]= [];

  constructor(private rest: RestDataSource, private message: GolfMessageService) {  
    this.get();
    // this.tournaments= this.rest.tournamentData;
  }

  getTournaments(): Tournament[]{
    return this.tournaments;
  }

  filterActiveTournaments(): void {
    this.activeTournaments= this.tournaments.filter( g=> { return !g.isEnded; })
  }

  getActiveTournaments(): Tournament[]{
    this.filterActiveTournaments()
    return this.activeTournaments;
  }
  
  getTournament(id: number): Tournament{
    let tournament
    tournament= this.tournaments.find( g=>{ return g.id== id }) ||  new Tournament('', new Date, new Date); 
    return  tournament 
  }

  getActiveTournament(id: number): Tournament{
    let tournament
    tournament= this.activeTournaments.find( g=>{ return g.id== id }) || new Tournament('', new Date, new Date) 
    return  tournament 
  }
    
  getResults(id: number): any[]{
    return this.getTournament(id).results;
  }

  getGames(id: number): Game[]{
    return this.getTournament(id).games;
  }

  getActiveGames(id: number): Game[]{
    const games= this.getActiveTournament(id).games.filter( g=> { return !g.isEnded; })
    return games;
}

  getGame(id: number, gameNo: number): Game{
    const game= this.getGames(id).find( g=>{ return g.gameNo== gameNo }) || new Game('', new Date, new Date, '');  
    return  game
  }

  getActiveGame(id: number, gameNo: number): Game{
    const game= this.getActiveGames(id).find( g=>{ return g.gameNo== gameNo }) || new Game('', new Date, new Date, '');    
    return  game
  }

  getScorecard(id: number, gameNo: number): Scorecard{
    return this.getActiveGame(id, gameNo).scorecard;
  }

  getScores(id: number, gameNo: number): ScorecardLine[]{
    return this.getScorecard(id, gameNo).scores;
  }

  getScoreLine(id: number, gameNo: number, playerId: number): ScorecardLine{
    const line= this.getScores(id, gameNo).find( s=> { s.playerId== playerId });
    return line || new ScorecardLine(0, '', '', 0)
  }

  get(): void{
    setTimeout(() => { this.rest.getTournaments().subscribe( 
      data=> { 
        this.tournaments= data;     
        this.filterActiveTournaments();
      },
      err=> { this.message.setMessage('Error!', `Tournament data not loaded ${err.message}`, 'error') }
    )
    }, 3000);
  }  

  post(tournament: Tournament): void{
    this.rest.newTournament( tournament).subscribe( 
      (newtournament)=> { this.tournaments.push(newtournament) }, 
      (err)=> { this.message.setMessage('Error!', `Tournament not saved ${err.message}`, 'error') },
      ()=> { this.message.setMessage('Thank you!', 'Tournament saved', 'success') }
    );
  }

  put(tournament: Tournament, id: number): void{
    this.rest.updateTournament( tournament, id).subscribe( 
      newTournament=> { 
        const index= this.tournaments.indexOf(newTournament)
        this.tournaments.splice(index, 1, newTournament)
      }, 
      (err)=> { this.message.setMessage('Error!', `Tournament not updated ${err.message}`, 'error') },
      ()=> { this.message.setMessage('Thank you!', `You updated [id: ${ id }]`, 'success') }
    );
  }

  patchGames(games: Game[], id: number): void{
    this.rest.updateGames( games, id).subscribe( 
      newGames=> { 
        this.getActiveTournament(id).games= newGames
      }, 
      (err)=> { this.message.setMessage('Error!', `Games not updated ${err.message}`, 'error') },
      ()=> { this.message.setMessage('Thank you!', `You updated [id: ${ id }]`, 'success') }
    );
  }

  delete(id: number): void{
    this.rest.deleteTournament(id).subscribe( 
      (oldtournament)=> {
        const index= this.tournaments.indexOf(oldtournament);
        this.tournaments.splice(index, 1, oldtournament);
      }, 
      (err)=> { this.message.setMessage('Error!', `Not deleted ${err.message}`, 'error') },
      ()=> { this.message.setMessage('Thank you!', 'Tournament deleted', 'success') }
    );
  }

}

