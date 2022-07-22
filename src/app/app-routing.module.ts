import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ConverterComponent } from './converter/converter.component';
import { MailinglistComponent } from './mailinglist/mailinglist.component';
import { MailinglistdataComponent } from './mailinglistdata/mailinglistdata.component';
import {components} from './app.module';

const routes: Routes = [{path:'home', component:HomeComponent},  
										{path:'calculator', component:CalculatorComponent},
										{path:'converter', component:ConverterComponent}, 
										{path:'mailinglistdata', component:MailinglistdataComponent}, 
										{path:'mailinglist', component:MailinglistComponent}
										];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
