
import { Component, OnInit } from '@angular/core';
import { Tournament, TournamentModel } from '../model/tournament';
import { TournamentRepository } from '../model/tournament.repository';
import { MessageService } from '../../services/message.service';

@Component({
   selector: 'app-tournament-report',
   templateUrl: './tournament-report.component.html',
   styleUrls: ['./tournament-report.component.css', '../golf.component.css']
})

export class TournamentReportComponent implements OnInit {

  selectedTournament: string= '';

  constructor(private repository: TournamentRepository, public tournamentModel: TournamentModel,
    private message: MessageService) {  }

  get tournamentId(): number{
    const startIndex= this.selectedTournament.indexOf('-')
    const id= this.selectedTournament.slice(startIndex+1)
    return Number(id);
  }
  
  get noOfgames(): number {
    return this.tournamentModel.getNoOfgames(this.tournamentId)
  }

  get tournaments(): Tournament[]{
  return this.repository.getTournaments();
  }

  get tournament(): Tournament{
    return this.repository.getTournament(this.tournamentId);
  }

  get finalResults(): any[]{
    return this.tournament.results;
  }

  get messageIsOpen(): boolean {
    return this.message.isOpen
  }

  ngOnInit(): void {
  }
}
