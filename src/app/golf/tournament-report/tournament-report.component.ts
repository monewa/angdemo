
import { Component, OnInit } from '@angular/core';
import { Tournament, TournamentModel } from '../model/tournament';
import { TournamentRepository } from '../model/tournament.repository';
import { GolfMessageService } from '../services/message.service';

@Component({
   selector: 'app-tournament-report',
   templateUrl: './tournament-report.component.html',
   styleUrls: ['./tournament-report.component.css', '../golf.component.css']
})

export class TournamentReportComponent implements OnInit {

  selectedTournament: string= '';

  constructor(private repository: TournamentRepository, public tournamentModel: TournamentModel,
    public message: GolfMessageService) {  }

  get tournamentId(): number{
    const startIndex= this.selectedTournament.indexOf('-')
    const id= this.selectedTournament.slice(startIndex+1)
    return Number(id);
  }
  
  get startDate() : string {
    return this.tournamentModel.getStartDate(this.tournamentId)
  }

  get endDate() : string {
    return this.tournamentModel.getEndDate(this.tournamentId)
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

  ngOnInit(): void {
  }
}
