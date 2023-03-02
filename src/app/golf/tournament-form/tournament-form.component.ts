
import { Component, OnInit } from '@angular/core';
import { Tournament } from '../model/tournament';
import { TournamentRepository } from '../model/tournament.repository';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.css', '../golf.component.css']
})  
export class TournamentFormComponent implements OnInit {

  name: string= '';
  startDate: Date= new Date();
  endDate: Date= new Date();

  constructor(private message: MessageService, private repository: TournamentRepository ) { }

  get tournaments(){
    return this.repository.getActiveTournaments()
  }

  save(){
    this.repository.post(
      new Tournament(this.name,this.startDate, this.endDate))
  }
  
  get messageIsOpen(): boolean {
    return this.message.isOpen
  }
  

  ngOnInit(): void {
  }

}
