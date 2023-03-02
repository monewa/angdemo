
import { Component, OnInit } from '@angular/core';
import { Game} from '../model/game';
import { ScorecardModel } from '../model/scorecard';
import { ScorecardLine } from '../model/scorecardLine';
import { TournamentRepository } from '../model/tournament.repository';
import { Tournament } from '../model/tournament';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-scorecard-form',
  templateUrl: './scorecard-form.component.html',
  styleUrls: ['./scorecard-form.component.css', '../golf.component.css']
})
export class ScorecardFormComponent implements OnInit {

  selectedGame:number= 0;
  selectedTournament:string= '';

  constructor(private scorecard: ScorecardModel, private repository: TournamentRepository, private message: MessageService) { }

  getStringify(object: any){
     return JSON.stringify(object, null, ' ');
  }

  selectGame(){
    this.scorecard.filterScorecard(this.tournamentId, this.selectedGame);
  }

  get  tournamentId(): number{
    const startIndex= this.selectedTournament.indexOf('-')
    const id= this.selectedTournament.slice(startIndex+1)
    return Number(id);
  }

  get tournaments(): Tournament[]{    
    return this.repository.getActiveTournaments()
  }

  get games(): Game[] {
    return this.repository.getActiveGames(this.tournamentId);
  }

  get game(): Game {
    return this.repository.getActiveGame(this.tournamentId, this.selectedGame);
  }

  get scores(): ScorecardLine[]{    
    return this.scorecard.filteredscorecard;
  }
  
  get playersCard(): ScorecardLine[]{    
    return this.scorecard.playersCard;
  }

  getScoreline(playerId: number) : ScorecardLine {
    return this.repository.getScoreLine(this.tournamentId, this.selectedGame, playerId)
  }
  
  removePlayer(playerId: number): void{
    this.scorecard.add$removeScorecardLine(this.tournamentId, this.selectedGame, playerId, false);

  }

  addPlayers(): void{ 
    this.scorecard.compareCard$Players(this.tournamentId, this.selectedGame);
  }
  
  add(playerId: number){
    this.scorecard.add$removeScorecardLine(this.tournamentId, this.selectedGame, playerId, true);
    
  }

  updateLine(playerId: number, score: string){
    this.scorecard.updateScoreline(this.tournamentId, this.selectedGame, playerId, Number(score))
  }

  update(){
    this.scorecard.updateScorecard(this.games, this.tournamentId)
  }

  
  get messageIsOpen(): boolean {
    return this.message.isOpen
  }
  

  ngOnInit(): void { 
    }
}
