
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
  startDate: string= '';
  endDate: string= '';

  constructor(private repository: TournamentRepository, public tournament: TournamentModel,
    public message: GolfMessageService) {  }

  getTournamentId(): number{
    const startIndex= this.selectedTournament.indexOf('-')
    const id= this.selectedTournament.slice(startIndex+1)
    return Number(id);
  }

  selectTournament(): void{    
    this.tournament.selectId(this.getTournamentId())    
    this.getDates();
  }

  getDates(): void{
    this.startDate= this.tournament.getStartDate()
    this.endDate= this.tournament.getEndDate()
  }

  getTournaments(): Tournament[]{
  return this.repository.getTournaments();
  }

  getTournament(): Tournament{
    return this.repository.getTournament(this.getTournamentId());
  }

  getFinalResults(): any[]{
    return this.repository.getResults(this.getTournamentId());
  }

  ngOnInit(): void {
  }
}
