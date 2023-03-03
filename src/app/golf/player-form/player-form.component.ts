
import { Component, OnInit } from '@angular/core';
import { Player } from '../model/player';
import { PlayerRepository } from '../model/player.repository';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css', '../golf.component.css']
})
export class PlayerFormComponent implements OnInit {

  firstName: string= '';
  surname: string= '';
  birthDate: any;
  handicap: number= 0;
  gamesPlayed: number= 0;
  gamesWon: number= 0;
  tournamentsWon: number= 0;
  awardsWon: number= 0;
  submitted: boolean= false;
  isSaved: boolean= false;
  formInvalid: boolean= false;

  constructor(private repository: PlayerRepository, private message: MessageService) { }
  
  submit(): void {
    if (this.formInvalid) {
      return;
    } 
    else {

    }
    this.saveNewPlayer();
  }

  saveNewPlayer(): void {
    let player=  new Player( 
      this.firstName, this.surname, this.birthDate, this.handicap,this.gamesPlayed, 
      this.gamesWon, this.tournamentsWon, this.awardsWon
      )
    this.repository.post(player);
    this.reset();        
  }

  reset(): void {
    this.isSaved= false;
    this.submitted= false;
    this.firstName= '';
    this.surname= '';
    this.birthDate= new Date(1980, 1, 1);
    this.handicap= 0;
    this.gamesPlayed= 0;
    this.gamesWon= 0;
    this.tournamentsWon= 0;
    this.awardsWon= 0;
  }

  get messageIsOpen(): boolean {
    return this.message.isOpen;
  }

  ngOnInit(): void {
  }

}
