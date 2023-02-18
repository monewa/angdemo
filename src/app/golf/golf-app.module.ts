
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { GolfComponent } from "./golf.component";
import { PlayerRepository } from "./model/player.repository";
import { CourseRepository } from "./model/course.repository";
import { GolfHomeComponent } from "./golf-home/golf-home.component";
import { PlayerFormComponent } from "./player-form/player-form.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

// export const golfroutes: Routes= [
//     {path: 'home-golf', outlet: 'golf', component: GolfHomeComponent},
//     {path: 'player-form', outlet: 'golf', component: PlayerFormComponent},
// ]

// const router= RouterModule.forRoot(routes)

// @NgModule({
//   declarations: [   ],
//   imports: [  FormsModule, CommonModule, RouterModule, BrowserModule
//   ],  
//   exports: [GolfAppModule], 
//   providers: [ CourseRepository , PlayerRepository],
//   bootstrap: [GolfComponent]
// })

export class GolfAppModule { }