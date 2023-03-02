
import { Component, OnInit, OnChanges } from '@angular/core';
import { Player, PlayerModel } from '../model/player';
import { PlayerRepository } from '../model/player.repository';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-players-data',
  templateUrl: './players-data.component.html',
  styleUrls: ['./players-data.component.css', '../golf.component.css']
})
export class PlayersDataComponent implements OnInit {

  title: string= ''; 
  question: string= '';
  confirmIsOpen: boolean= false;
  isConfirmed: boolean= false;

  selectedId: number= 0;
  editMode: boolean= false;
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

  getDateOfBirth(id: number): string{
    return this.playerModel.getDateOfBirth(id); 
  } 

  age(id: number): number{
   return this.playerModel.getAge(id);
  }

  rating(id: number): number{
    return this.playerModel.getRating(id); 
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
    this.confirmIsOpen= false;
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

    if (firstNameChanged || surnameChanged || handicapChanged || birthDateChanged || handicapChanged 
      || gamesPlayedChanged || gamesWonChanged || tournamentsWonChanged|| awardsWonChanged) {
        this.showConfirm();
      }
      this.cancelEditMode(); 
  }
    
  showConfirm(){
      this.title= 'Confirm Update';
      this.question= 'Are you sure you want save the changes?';
      this.confirmIsOpen= true;
  }
    
  update(): void{ 
    setTimeout(() => {      
      if (!this.isConfirmed) {
        return;      
      } 
      this.playerModel.update(this.selectedId, this.firstName, this.surname, this.handicap, this.birthDate, this.gamesPlayed, 
        this.gamesWon, this.tournamentsWon, this.awardsWon);
        this.cancelEditMode();
      }, 3000);
  }

  cancelEditMode(): void{
    this.editMode= false;
  }

  delete(id: number): void{
    this.playerModel.delete(id);
  }

  get messageIsOpen(): boolean {
    return this.message.show$removeMessage();
  }
  
  public get errorMessage() : string {
    return '' //this.repository.err;
  }

  ngOnChanges(){

  }
  

  ngOnInit(): void {
  }

}
