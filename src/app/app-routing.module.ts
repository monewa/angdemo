
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CalculatorComponent } from './demo/calculator/calculator.component';
import { ConverterComponent } from './demo/converter/converter.component';
import { MailinglistComponent } from './demo/mailinglist/mailinglist.component';
import { MailinglistdataComponent } from './demo/mailinglistdata/mailinglistdata.component';
import { BookstoreComponent } from './demo/bookstore/bookstore.component';
import { AboutmeComponent } from './demo/aboutme/aboutme.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './demo/mailinglistdata/menu/menu.component';
import { SuccessPopupComponent } from './success-popup/success-popup.component'
import { DemoComponent } from './demo//demo.component';
import { GolfComponent } from './golf/golf.component';
import { GolfHomeComponent } from './golf/golf-home/golf-home.component';
import { PlayerFormComponent } from './golf/player-form/player-form.component';
import { PlayerProfileComponent } from './golf/player-profile/player-profile.component';
import { TournamentReportComponent } from './golf/tournament-report/tournament-report.component';
import { PlayersDataComponent } from './golf/players-data/players-data.component';
import { TournamentFormComponent } from './golf/tournament-form/tournament-form.component';
import { ScorecardFormComponent } from './golf/scorecard-form/scorecard-form.component';
import { DemoHomeComponent } from './demo/demo-home/demo-home.component';
import { MessageComponent } from './message/message.component';
import { EventlogComponent } from './eventlog/eventlog.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ScheduledConfirmComponent } from './scheduled-confirm/scheduled-confirm.component';
 
// import { golfroutes } from './golf/golf-app.module';

const title1: string = 'Demo';
const title2: string = 'Golf';
const site1: string = 'demo/';
const site2: string = 'golf/';

export const golfroutes: Routes= [
	{ path: 'golf', title: title2, component: GolfComponent, children: [
		{path: '', outlet: 'golf-1', title: title2, component: GolfHomeComponent},
		{path: '', outlet: 'golf-2', title: title2, component: PlayerFormComponent},
		{path: '', outlet: 'golf-3', title: title2, component: TournamentFormComponent},
	] },
];

export const routing= RouterModule.forChild( golfroutes )

const routes: Routes = [
	// {path: 'golf-home', title: title2, component: GolfHomeComponent},
	// {path: 'player-form', title: title2, component: PlayerFormComponent},
	// {path: 'tournament-form', title: title2, component: TournamentFormComponent},
	{path: 'scorecard-form', title: title2, component: ScorecardFormComponent},
	{path: 'profile', title: title2, component: PlayerProfileComponent},
	{path: 'tournament-report', title: title2, component: TournamentReportComponent},
	{path: 'player-table', title: title2, component: PlayersDataComponent},
	// { path: 'home-golf', title: title2, children: golfroutes },
	{ path: 'home', title: 'Home', component: HomeComponent},  
	{ path: 'demo-home', title: title1, component: DemoHomeComponent},  
	{ path: 'calculator', title: title1, component: CalculatorComponent},
	{ path: 'converter', title: title1, component: ConverterComponent}, 
	{ path: 'mailinglistdata', title: title1, component: MailinglistdataComponent}, 
	{ path: 'mailinglist', title: title1, component: MailinglistComponent},
	{ path: 'bookstore', title: title1, component: BookstoreComponent },
	{ path: 'aboutme', title: title1, component: AboutmeComponent },
	{ path: 'calculator', title: title1, pathMatch:'full', redirectTo:'calculator' },
	{ path: '', pathMatch:'full', title: title1, redirectTo: 'golf-home' },
	{ path: '**', component:PageNotFoundComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appComponents= [
	EventlogComponent, AppComponent, HomeComponent, PageNotFoundComponent, 
	ConfirmComponent, ScheduledConfirmComponent, SuccessPopupComponent
] 

export const demoComponents= [ 
	CalculatorComponent, ConverterComponent, MailinglistComponent, 
	MailinglistdataComponent, BookstoreComponent, AboutmeComponent, 	
	MenuComponent, DemoComponent
]

export const golfComponents= [
    GolfComponent, GolfHomeComponent, PlayerProfileComponent, MessageComponent,
    TournamentReportComponent, PlayersDataComponent, ScorecardFormComponent,
    PlayerFormComponent, TournamentFormComponent
]
