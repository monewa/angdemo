
import { Component, OnInit } from '@angular/core';
import { Player, PlayerModel } from '../model/player';
import { PlayerRepository } from '../model/player.repository';
import { GolfMessageService } from '../services/message.service';

@Component({
  selector: 'app-players-data',
  templateUrl: './players-data.component.html',
  styleUrls: ['./players-data.component.css', '../golf.component.css']
})
export class PlayersDataComponent implements OnInit {

  confirmIsopen: boolean= false;
  selectedId: number= 0;
  editMode: boolean= false;

  firstName: string= '';
  surname: string= '';
  birthDate: Date= new Date();
  handicap: number= 0;
  gamesPlayed: number= 0;
  games: any[]= [];  
  gamesWon: number= 0;
  tournamentsWon: number= 0;
  awardsWon: number= 0;
  
  constructor(protected playerModel: PlayerModel ,private repository: PlayerRepository, public message: GolfMessageService) {   }

   get players(): Player[]{
    return this.repository.getPlayers(); 
  }

  get player(): Player{
    return this.repository.getPlayer(this.selectedId); 
  }

  getDateOfBirth(id: number): string{
    return this.playerModel.getDateOfBirth(id); 
  } 

  getRating(awardsWon: number, tournamentsWon: number, gamesWon: number, gamesPlayed: number): number{
    return this.playerModel.getRating(awardsWon, tournamentsWon, gamesWon, gamesPlayed); 
  } 


  adjustVariablesForEditing(): void{
    const player= this.player;
    this.firstName= player.firstName
    this.surname= player.surname
    this.handicap= player.handicap
    this.birthDate= player.birthDate
    this.gamesPlayed= player.gamesPlayed
    this.gamesWon= player.gamesWon
    this.tournamentsWon= player.tournamentsWon
    this.awardsWon= player.awardsWon
  }

  checkForEditMode(id: number): boolean{
    if (this.editMode && this.selectedId == id) {
      return true;
    } 
    else {
      return false
    }
  }

  edit(id: number): void{
    this.selectedId= id;
    this.adjustVariablesForEditing();
    this.editMode= true;
  }

  openConfirmBox(): void{
    const player= this.player;
    const firstNameChanged= this.firstName != player.firstName;
    const surnameChanged= this.surname != player.surname;
    const handicapChanged= this.handicap != player.handicap;
    const birthDateChanged= this.birthDate != player.birthDate;
    const gamesPlayedChanged= this.gamesPlayed != player.gamesPlayed;
    const gamesWonChanged= this.gamesWon != player.gamesWon;
    const tournamentsWonChanged= this.gamesWon != player.gamesWon;
    const awardsWonChanged= this.gamesWon != player.gamesWon;

    if (firstNameChanged || surnameChanged || handicapChanged || birthDateChanged
      || handicapChanged || gamesPlayedChanged || gamesWonChanged || tournamentsWonChanged|| 
      awardsWonChanged){
      this.toggleConfirmBox(true);
    }
    else{
      this.editMode= false;
    }
  }

  toggleConfirmBox(option: boolean): void{
    this.confirmIsopen= option;
  }

  updateChanges(): void{
    const player= this.player;
    player.firstName= this.firstName;    
    player.surname= this.surname;    
    player.handicap= this.handicap;    
    player.birthDate= this.birthDate;    
    player.gamesPlayed= this.gamesPlayed;    
    player.gamesWon= this.gamesWon;    
    player.tournamentsWon= this.tournamentsWon;    
    player.awardsWon= this.awardsWon;
  }

  update(): void{
    const player= this.player;
    this.updateChanges();
    this.repository.put(player, player.id);
    this.reset();
  }

  reset(): void{
    this.editMode= false;
    this.toggleConfirmBox(false);
  }

  delete(id: number): void{
    this.repository.delete(id);
    this.reset();
  }
  
  ngOnInit(): void {
  }

}
