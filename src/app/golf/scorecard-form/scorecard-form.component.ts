
import { Component, OnInit } from '@angular/core';
import { Game, GameModel } from '../model/game';
import { Scorecard, ScorecardModel } from '../model/scorecard';
import { ScorecardLine } from '../model/scorecardLine';
import { TournamentRepository } from '../model/tournament.repository';
import { Tournament } from '../model/tournament';
import { GolfMessageService } from '../services/message.service';

@Component({
  selector: 'app-scorecard-form',
  templateUrl: './scorecard-form.component.html',
  styleUrls: ['./scorecard-form.component.css', '../golf.component.css']
})
export class ScorecardFormComponent implements OnInit {

  selectedGame:number= 0;
  selectedTournament:string= '';

  constructor(private scorecard: ScorecardModel, private game: GameModel,
    private repository: TournamentRepository, public message: GolfMessageService) { }

  getStringify(object: any){
     return JSON.stringify(object, null, ' ');
  }

  getTournamentId(): number{
    const startIndex= this.selectedTournament.indexOf('-')
    const id= this.selectedTournament.slice(startIndex+1)
    return Number(id);
  }

  selectGame(): void{
    this.game.selectId$Game(this.getTournamentId(), this.selectedGame)
    this.scorecard.selectId$Game(this.getTournamentId(), this.selectedGame)
    this.scorecard.sortByScore();
  }
  
  getPlayers(): any[] {
    return this.scorecard.getPlayersList();
  }

  getTournaments(): Tournament[]{    
    return this.repository.getActiveTournaments()
  }

  getGames(): Game[] {
    return this.repository.getActiveGames(this.getTournamentId());
  }

  getGame(): Game {
    return this.repository.getActiveGame(this.getTournamentId(), this.selectedGame);
  }

  getScoreCard(): Scorecard{
    return this.getGame().scorecard;
  }  
  
  getScores(): ScorecardLine[]{
    return this.getScoreCard().scores;
  }

  removePlayer(index: number, playerId: number): void{
    this.scorecard.removeScorecardLine(index, playerId);
  }

  cancel(index: number){
    // this.players[index]?.selected == false
  }

  addPlayers(){
    
  }
  
  add(playerId: number, firstName: string, surname: string, handicap: number){
    this.scorecard.addNewScorecardLine( 
      new ScorecardLine(playerId, firstName, surname, handicap) 
    )
  }

  update(){
    this.repository.patchGames(this.getGames(), this.getTournamentId())
  }

  ngOnInit(): void {

  }

}
