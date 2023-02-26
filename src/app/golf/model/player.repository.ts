
import { Injectable } from '@angular/core';
import { Player } from "./player";
import { RestDataSource } from './rest.datasource';
import{ GolfMessageService } from '../services/message.service'

@Injectable({
  providedIn: 'root'
})

export class PlayerRepository {

  players: Player[]= [];

  constructor(private rest: RestDataSource, private message: GolfMessageService) { 
    this.get();
  }

  getPlayers(): Player[]{
    return this.players;
  }

  getPlayer(id: number): Player{
    let player= this.players.find( p=> { return p.id== id });
    return player || new Player('', '', new Date, 0, 0, 0, 0, 0)
  }

  getGames(id: number): any[]{
    return this.getPlayer(id).games
  }

  get(): void{
    this.rest.getPlayers().subscribe( 
    data => { this.players= data },
    err=> { this.message.setMessage('Error!', `Player data not loaded ${err.message}`, 'error') }
    );        
  }

  post(player: Player): void{
    this.rest.newPlayer(player).subscribe( 
      newplayer=> { this.players.push(newplayer) }, 
      err=> { this.message.setMessage('Error!', `Player not saved ${err.message}`, 'error') },
      ()=> { this.message.setMessage('Thank you!', 'Player saved', 'success') }
    );
  }

  put(player: Player, id: number): void{
    this.rest.updatePlayer(player, id).subscribe(
      newplayer=> { 
        const index= this.players.indexOf(newplayer);
        this.players.splice(index, 1, newplayer) 
      },
      err=>{ this.message.setMessage('Error!', `Player not updated ${err.message}`, 'error') }, 
      ()=> { this.message.setMessage('Thank you', `You updated [id: ${ id }]`, 'success'); }
    );
      // this.reset();
  }

  delete(id: number): void{
    this.rest.deletePlayer(id).subscribe( 
      oldplayer=> { 
        const index= this.players.indexOf(oldplayer);
        this.players.splice(index, 1) 
      },
      err=> { this.message.setMessage('Error!', `Player not deleted ${err.message}`, 'error') },
      ()=> { this.message.setMessage('Thank you', 'Player deleted', 'success') }
    );
  }

}
