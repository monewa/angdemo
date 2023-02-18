
import { Injectable } from "@angular/core";
import { Game } from "./game";

@Injectable({
    providedIn: 'root'
  })

export class CourseModel{

   constructor() {   }

   addNewGame(game: Game, course: Course): void{
       const games= {
        "gameNo": game.gameNo,
        "tournament": game.tournament
       }
      course.games.push(games);
    }
}


export class Course{

    id: number= 0;
    name: string= ''; 
    location: string= ''; 
    games: any[]= [];  
    
    constructor(name: string, location: string){ 
        this.name= name;
        this.location= location;
    }
}