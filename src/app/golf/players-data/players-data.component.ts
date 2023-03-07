
import { Component, OnInit } from '@angular/core';
import { Player, PlayerModel } from '../model/player';
import { PlayerRepository } from '../model/player.repository';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-players-data',
  templateUrl: './players-data.component.html',
  styleUrls: ['./players-data.component.css', '../golf.component.css']
})
export class PlayersDataComponent implements OnInit {

  confirmUpdateIsOpen: boolean= false;
  confirmDeleteIsOpen: boolean= false;
  selectedId: number= 0;
  inEditMode: boolean= false;
  firstName: string= '';
  surname: string= '';
  birthDate: Date= new Date();
  gamesPlayed: number= 0;
  games: any[]= [];  
  gamesWon: number= 0;
  tournamentsWon: number= 0;
  handicap: number= 0;
  awardsWon: number= 0;
  
  constructor(protected playerModel: PlayerModel ,private repository: PlayerRepository, private message: MessageService) {   }

   get players(): Player[]{
    return this.repository.getPlayers(); 
  }

  get player(): Player{
    return this.repository.getPlayer(this.selectedId); 
  }

  age(id: number): number{
   return this.playerModel.getAge(id);
  }

  rating(id: number): number{
    return this.playerModel.getRating(id); 
  } 

  assignVariablesForEditing(): void{
    const p= this.player;
    this.firstName= p.firstName
    this.surname= p.surname
    this.handicap= p.handicap
    this.birthDate= p.birthDate
    this.gamesPlayed= p.gamesPlayed
    this.gamesWon= p.gamesWon
    this.tournamentsWon= p.tournamentsWon
    this.awardsWon= p.awardsWon
  }

  isInEditMode(id: number): boolean{
    if (this.inEditMode && this.selectedId == id) {
      return true;
    } 
    else {
      return false
    }
  }

  edit(id: number): void{
    this.selectedId= id;
    this.assignVariablesForEditing();
    this.inEditMode= true;
  }

  dataIsChanged(): boolean{
    const p= this.player;
    const firstNameChanged= this.firstName != p.firstName;
    const surnameChanged= this.surname != p.surname;
    const handicapChanged= this.handicap != p.handicap;
    const birthDateChanged= this.birthDate != p.birthDate;
    const gamesPlayedChanged= this.gamesPlayed != p.gamesPlayed;
    const gamesWonChanged= this.gamesWon != p.gamesWon;
    const tournamentsWonChanged= this.gamesWon != p.gamesWon;
    const awardsWonChanged= this.gamesWon != p.gamesWon;

    if (firstNameChanged || surnameChanged || handicapChanged || birthDateChanged || handicapChanged 
        || gamesPlayedChanged || gamesWonChanged || tournamentsWonChanged|| awardsWonChanged) {
      return true;
    }
    return false;
  }
  
  showConfirmSave(): void{
    this.cancelEditMode(); 
    if (this.dataIsChanged()) {
      this.confirmUpdateIsOpen= true;
    }
  }

  showConfirmDelete(id: number): void{
    this.confirmDeleteIsOpen= true;
    this.selectedId= id
  }
    
  confirmSave(yes: boolean): void{
    if (!yes) {
      return;      
    } 
    this.update();          
  }

  confirmDelete(yes: boolean): void{
    if (!yes) {
      return;      
    } 
    this.delete(this.selectedId);          
  }
    
  update(): void{ 
      this.playerModel.update(this.selectedId, this.firstName, this.surname, this.handicap, this.birthDate, this.gamesPlayed, 
        this.gamesWon, this.tournamentsWon, this.awardsWon);
        this.cancelEditMode();
  }

  cancelEditMode(): void{
    this.inEditMode= false;
  }

  delete(id: number): void{
    this.playerModel.delete(id);
  }

  get messageIsOpen(): boolean {
    return  this.message.isOpen
  }

  ngOnInit(): void {
  }

}
