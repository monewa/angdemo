
import { Component, OnInit } from '@angular/core';
import { Player } from '../model/player';
import { PlayerRepository } from '../model/player.repository';
import { GolfMessageService } from '../services/message.service';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css', '../golf.component.css'  ]
})

export class PlayerProfileComponent implements OnInit {

  selectedPlayer: string= '';

  constructor(private repository: PlayerRepository, public message: GolfMessageService) { }
  
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

  ngOnInit(): void {
  }

}
