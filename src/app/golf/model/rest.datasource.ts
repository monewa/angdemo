
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './course';
import { Game } from './game';
import { Player } from './player';
import { Scorecard } from './scorecard';
import { ScorecardLine } from './scorecardLine';
import { Tournament } from './tournament';

@Injectable({
  providedIn: 'root'
})

export class RestDataSource{

  // readonly URL: string= 'http://firebase/';
  readonly PLAYERSURL: string= 'assets/data/players.json';    
  // readonly PLAYERSURL: string= 'assets/data/players2.json';    
  readonly TOURNAMENTSURL: string= 'assets/data/tournaments.json';    
  readonly COURSEURL: string= 'assets/data/courses.json';    
  // readonly PLAYERSURL: string= 'http://localhost:3000/Players/';
  // readonly TOURNAMENTSURL: string= 'http://localhost:3000/Tournaments/';    
  // readonly COURSEURL: string= 'http://localhost:3000/Courses/';    

  constructor(private http: HttpClient) {  }

  readonly playerData: any[]= [ 
    { "id": 1, "playerId": "6040MB", "firstName": "Boshomane", "surname": "Mohera", "birthDate": "1989-04-14T22:00:00.000Z", "age": 33, "handicap": 12, "gamesPlayed": 4, 
      "games": [ 
        { "gameNo": 1, "tournament": "tebex cup 2000", "score": 89, "points": 12 }, { "gameNo": 2, "tournament": "tebex cup 2000", "score": 80, "points": 8 }, { "gameNo": 3, "tournament": "tebex cup 2000", "score": 60, "points": 2 }, { "gameNo": 1, "tournament": "tebex cup 2005", "score": 90, "points": 12 } 
      ], "gamesWon": 5, "tournamentsWon": 0, "awardsWon": 0, "rating": 0 }, 
    { "id": 2, "playerId": "4933PS", "firstName": "Senoamadi", "surname": "Phatelang", "birthDate": "2001-05-24T22:00:00.000Z", "age": 21, "handicap": 10, "gamesPlayed": 4, 
      "games": [ 
        { "gameNo": 1, "tournament": "tebex cup 2000", "score": 79, "points": 8 }, { "gameNo": 2, "tournament": "tebex cup 2000", "score": 85, "points": 12 }, { "gameNo": 3, "tournament": "tebex cup 2000", "score": 50, "points": 2 }, { "gameNo": 1, "tournament": "tebex cup 2005", "score": 70, "points": 8 } 
      ], "gamesWon": 0, "tournamentsWon": 0, "awardsWon": 0, "rating": 0 }, 
   { "id": 3, "playerId": "7329MK", "firstName": "Kays", "surname": "Mguni", "birthDate": "2000-06-04T22:00:00.000Z", "age": 22, "handicap": 10, "gamesPlayed": 4, 
    "games": [
       { "gameNo": 1, "tournament": "tebex cup 2000", "score": 70, "points": 6 }, { "gameNo": 2, "tournament": "tebex cup 2000", "score": 75, "points": 6 }, { "gameNo": 3, "tournament": "tebex cup 2000", "score": 70, "points": 12 }, { "gameNo": 1, "tournament": "tebex cup 2005", "score": 40, "points": 2 }
       ], "gamesWon": 0, "tournamentsWon": 0, "awardsWon": 0, "rating": 0 },
    { "id": 4, "playerId": "7829MK", "firstName": "Alicia", "surname": "Still", "birthDate": "2001-06-04T22:00:00.000Z", "age": 21, "handicap": 10, "gamesPlayed": 0, 
    "games": [ ], "gamesWon": 0, "tournamentsWon": 0, "awardsWon": 0, "rating": 0 } 

  ];
  readonly tournamentData: any[]= [ 
    { "id": 1, "name": "tebex cup 2000", "startDate": "2000-03-04T22:00:00.000Z", "endDate": "2000-08-04T22:00:00.000Z", 
    "games": [
        { "id": 1, "gameNo": 1, "tournament": "tebex cup 2000", "course": "jhb", "startDate": "2000-04-04T22:00:00.000Z", "endDate": "2000-04-04T22:00:00.000Z", "isEnded": false,
         "scorecard": { "id": 0, "gameNo": 0, 
         "scores": [
        { "id": 1, "playerId": 1, "position": 0, "firstName": "Boshomane", "surname": "Mohera", "handicap": 0, "score": 0, "points": 0 }, 
        { "id": 2, "playerId": 2, "position": 0, "firstName": "Senoamadi", "surname": "Phatelang", "handicap": 0, "score": 0, "points": 0 }, 
        { "id": 3, "playerId": 3, "position": 0, "firstName": "Kays", "surname": "Mguni", "handicap": 0, "score": 0, "points": 0 }  
        ],      "playersList": [] } }, 
     
      { "id": 2, "gameNo": 2, "tournament": "tebex cup 2000", "course": "jhb", "startDate": "2000-04-14T22:00:00.000Z", "endDate": "2000-04-14T22:00:00.000Z", "isEnded": false, "scorecard": { "id": 0, "gameNo": 0, "scores": [], "playersList": [] } }, 
     { "id": 3, "gameNo": 3, "tournament": "tebex cup 2000", "course": "jhb", "startDate": "2000-04-24T22:00:00.000Z", "endDate": "2000-04-24T22:00:00.000Z", "isEnded": false, "scorecard": { "id": 0, "gameNo": 0, "scores": [], "playersList": [] } }
    ],
     "noOfgames": 0, 
  "results": [ { "position": 1, "name": "Mguni", "points": 24, "gamesPlayed": 3 }, { "position": 2, "name": "Phatelang", "points": 22, "gamesPlayed": 3 }, { "position": 3, "name": "Mohera", "points": 22, "gamesPlayed": 3 } ], "isEnded": false, "lastGameNo": 0 }, 
  { "id": 2, "name": "tebex cup 2005", "startDate": "2005-03-04T22:00:00.000Z", "endDate": "2005-10-04T22:00:00.000Z",
   "games": [
    { "id": 4, "gameNo": 1, "tournament": "tebex cup 2005", "course": "centurion", "startDate": "2005-04-04T22:00:00.000Z", "endDate": "2005-04-04T22:00:00.000Z", "isEnded": false, "scorecard": { "id": 0, "gameNo": 0, "scores": [], "playersList": [] } } 
   ], "noOfgames": 0, "results": [], "isEnded": false, "lastGameNo": 0 } 
  ]  
  readonly staticDataGames: any[] =[
    { "id": 1, "gameNo": 1, "tournament": "tebex cup 2000", "course": "jhb", "startDate": "2000-04-04T22:00:00.000Z", "endDate": "2000-04-04T22:00:00.000Z", "isEnded": false,
     "scorecard": { "id": 0, "gameNo": 0, "scores": [
      { "id": 1, "playerId": "6040MB", "position": 0, "firstName": "Boshomane", "surname": "Mohera", "handicap": 0, "score": 0, "points": 0 }, 
      { "id": 2, "playerId": "4933PS", "position": 0, "firstName": "Senoamadi", "surname": "Phatelang", "handicap": 0, "score": 0, "points": 0 }, 
      { "id": 3, "playerId": "7329MK", "position": 0, "firstName": "Kays", "surname": "Mguni", "handicap": 0, "score": 0, "points": 0 }  
     ], "playersList": [] } }, 
    { "id": 2, "gameNo": 2, "tournament": "tebex cup 2000", "course": "jhb", "startDate": "2000-04-14T22:00:00.000Z", "endDate": "2000-04-14T22:00:00.000Z", "isEnded": false, "scorecard": { "id": 0, "gameNo": 0, "scores": [], "playersList": [] } }, 
    { "id": 3, "gameNo": 3, "tournament": "tebex cup 2000", "course": "jhb", "startDate": "2000-04-24T22:00:00.000Z", "endDate": "2000-04-24T22:00:00.000Z", "isEnded": false, "scorecard": { "id": 0, "gameNo": 0, "scores": [], "playersList": [] } }, 
    { "id": 4, "gameNo": 1, "tournament": "tebex cup 2005", "course": "centurion", "startDate": "2005-04-04T22:00:00.000Z", "endDate": "2005-04-04T22:00:00.000Z", "isEnded": false, "scorecard": { "id": 0, "gameNo": 0, "scores": [], "playersList": [] } } 

    // new Game('tebex cup 2000', new Date(2000, 3, 5), new Date(2000, 3, 5), 'jhb' ), 
    // new Game('tebex cup 2000', new Date(2000, 3, 15), new Date(2000, 3, 15), 'jhb' ), 
    // new Game('tebex cup 2000', new Date(2000, 3, 25), new Date(2000, 3, 25), 'jhb' ), 
    // new Game('tebex cup 2005', new Date(2005, 3, 5), new Date(2005, 3, 5), 'centurion' ), 
  ]
  readonly staticDataScorecard: Scorecard[]=[
    { "id": 1, "gameNo": 1, "scores": [], "playersList": [] }, 
    { "id": 2, "gameNo": 2, "scores": [], "playersList": [] }, 
    { "id": 3, "gameNo": 3, "scores": [], "playersList": [] }
    // new Scorecard(1), 
    // new Scorecard(2), 
    // new Scorecard(3), 
  ]
  readonly staticDataScorecardLine: ScorecardLine[]= [
    { "id": 1, "playerId": 1, "position": 0, "firstName": "Boshomane", "surname": "Mohera", "handicap": 0, "score": 0, "points": 0 }, 
    { "id": 2, "playerId": 2, "position": 0, "firstName": "Senoamadi", "surname": "Phatelang", "handicap": 0, "score": 0, "points": 0 }, 
    { "id": 3, "playerId": 3, "position": 0, "firstName": "Kays", "surname": "Mguni", "handicap": 0, "score": 0, "points": 0 }

    // new ScorecardLine('6040MB', 'Boshomane', 'Mohera', 0), 
    // new ScorecardLine('4933PS', 'Senoamadi', 'Phatelang', 0), 
    // new ScorecardLine('7329MK', 'Kays', 'Mguni', 0), 
  ]
  readonly staticDataCourses: Course[]= [
    { "id": 1, "name": "jhb", "location": "jhb", "games": [] }, 
    { "id": 2, "name": "centurion", "location": "pta", "games": [] }, 
    { "id": 3, "name": "volo", "location": "ktp", "games": [] }
    // new Course( 'jhb', 'jhb'),
    // new Course( 'centurion', 'pta'),
    // new Course( 'volo', 'ktp'),
  ]

  getPlayers(): Observable<Player[]>{
    return this.http.get<Player[]>(this.PLAYERSURL )
  }  

  newPlayer(player: Player): Observable<Player>{
    return this.http.post<Player>(this.PLAYERSURL, player);
  }

  updatePlayer(player: Player, id: number): Observable<Player>{
    const url= this.PLAYERSURL+id
    return this.http.put<Player>(url, player);
  }

  deletePlayer(id: number): Observable<Player>{
    const url= this.PLAYERSURL+id
    return this.http.delete<Player>( url)
  }

  getTournaments(): Observable<Tournament[]>{
    return this.http.get<Tournament[]>(this.TOURNAMENTSURL, {responseType: 'json'})
  }

  newTournament(tournament: Tournament): Observable<Tournament>{
    return this.http.post<Tournament>(this.TOURNAMENTSURL, tournament, {responseType:'json'});
  }

  updateTournament(tournament: Tournament, id: number): Observable<Tournament>{
    return this.http.put<Tournament>(this.TOURNAMENTSURL+id, tournament, {responseType:'json'});
  }

  updateGames(games: Game[], id: number): Observable<Game[]>{
    return this.http.patch<Game[]>(this.TOURNAMENTSURL+id, {"games": games}, {responseType:'json'});
  }

  deleteTournament(id: number): Observable<Tournament>{
    const url= this.TOURNAMENTSURL+id
    return this.http.delete<Tournament>( url, {responseType: 'json'})
  }

  getCourses():Observable<Course[]>{
    return this.http.get<Course[]>(this.COURSEURL, {responseType: 'json'})
  }

  newCourse(course: Course): Observable<Course>{
    return this.http.post<Course>(this.COURSEURL, course, {responseType:'json'});
  }

  updateCourse(course: Course, id: number): Observable<Course>{
    const url= this.COURSEURL+id
    return this.http.patch<Course>(url, course, {responseType: 'json'})
  }

  deleteCourse(id: number): Observable<Course>{
    const url= this.COURSEURL+id
    return this.http.delete<Course>(url, {responseType: 'json'})
  }
}