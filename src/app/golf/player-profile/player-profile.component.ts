
import { Component, OnInit } from '@angular/core';
import { Player, PlayerModel } from '../model/player';
import { PlayerRepository } from '../model/player.repository';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css', '../golf.component.css'  ]
})

export class PlayerProfileComponent implements OnInit {

  selectedPlayer: string= '';

  constructor(private playerModel: PlayerModel, private repository: PlayerRepository, private message: MessageService) { }
  
  get playerId(): number{
    const regex = /[0-9]/g;
    const indexArr= this.selectedPlayer.match(regex)
    let id= '';
    indexArr?.forEach(i=> { id+= i })
    return Number(id);
  }

  get players(): Player[] {
    return this.repository.getPlayers();
  }

  get games(): any[]{
    return this.repository.getGames(this.playerId);
  }
  
  get player(): Player{
    return this.repository.getPlayer(this.playerId);
  }

  get age(): number {
    return this.playerModel.getAge(this.playerId)
  }

  get rating(): number {
    return this.playerModel.getRating(this.playerId)
  }
  
  get messageIsOpen(): boolean {
    return this.message.isOpen
  }
  

  ngOnInit(): void {
  }

}
