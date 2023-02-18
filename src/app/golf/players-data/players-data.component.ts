
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

  errorFound: boolean= false;
  success: boolean= false;
  confirmIsopen: boolean= false;
  selectedIndex: number= -1;
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
  rating: number= 0; 
  stringify=''
  
  constructor(protected model: PlayerModel ,private repository: PlayerRepository, public message: GolfMessageService) {   }

   get players(): Player[]{
    return this.repository.getPlayers(); 
  }

  getDateOfBirth(): string {
    let birth= `${this.birthDate.getDate()}-${this.birthDate.getMonth()}-${this.birthDate.getFullYear()}`
    return birth;
 } 

  adjustVariablesForEditing(){
    this.firstName= this.players[this.selectedIndex].firstName
    this.surname= this.players[this.selectedIndex].surname
    this.handicap= this.players[this.selectedIndex].handicap
    this.birthDate= this.players[this.selectedIndex].birthDate
    this.gamesPlayed= this.players[this.selectedIndex].gamesPlayed
    this.gamesWon= this.players[this.selectedIndex].gamesWon
    this.tournamentsWon= this.players[this.selectedIndex].tournamentsWon
    this.awardsWon= this.players[this.selectedIndex].awardsWon
  }

  checkForEditMode(index: number): boolean{
    if (this.editMode && this.selectedIndex == index) {
      return true;
    } 
    else {
      return false
    }
  }

  edit(index: number){
    this.selectedIndex= index;
    this.adjustVariablesForEditing();
    this.editMode= true;
  }

  openConfirmBox(){
    let player= this.players[this.selectedIndex]
    let firstNameChanged= this.firstName != player.firstName;
    let surnameChanged= this.surname != player.surname;
    let handicapChanged= this.handicap != player.handicap;
    let birthDateChanged= this.birthDate != player.birthDate;
    let gamesPlayedChanged= this.gamesPlayed != player.gamesPlayed;
    let gamesWonChanged= this.gamesWon != player.gamesWon;
    let tournamentsWonChanged= this.gamesWon != player.gamesWon;
    let awardsWonChanged= this.gamesWon != player.gamesWon;

    if (firstNameChanged || surnameChanged || handicapChanged || birthDateChanged
      || handicapChanged || gamesPlayedChanged || gamesWonChanged || tournamentsWonChanged|| 
      awardsWonChanged){
      this.toggleConfirmBox(true);
    }
    else{
      this.editMode= false;
    }
  }

  toggleConfirmBox(option: boolean){
    this.confirmIsopen= option;
  }

  updateChanges(){
    let player= this.players[this.selectedIndex];
    player.firstName= this.firstName;    
    player.surname= this.surname;    
    player.handicap= this.handicap;    
    player.birthDate= this.birthDate;    
    player.gamesPlayed= this.gamesPlayed;    
    player.gamesWon= this.gamesWon;    
    player.tournamentsWon= this.tournamentsWon;    
    player.awardsWon= this.awardsWon;
  }

  test(){
    // this.stringify= this.repository.getStringify(this.repository.players)

    // let tgames= this.model.getTournamentGames('t2')
    // let games= this.model.getGames();
    // let points= this.model.getTournamentPoints('t2')

    // console.log('result: ', games );
    // console.log('result2: ', tgames );
    // console.log('result3:', points );
    
  }

  update(){
    let player= this.players[this.selectedIndex];
    this.updateChanges();
    this.model.selectIndex(this.selectedIndex)
    this.model.calculateAge();
    this.model.calculateRating();
    this.repository.put(player, player.id);
    this.reset();
  }

  reset(){
    this.editMode= false;
    this.toggleConfirmBox(false);
    // this.get();
    setTimeout(() => {
      this.errorFound= false;
      this.success= false;
    }, 6000);
  }

  delete(id: number){
    this.repository.delete(id);
      this.reset();
  }
  
  ngOnInit(): void {
    // this.test();
  }

}
