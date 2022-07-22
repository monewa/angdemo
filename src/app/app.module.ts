
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , FormControl } from "@angular/forms";
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ConverterComponent } from './converter/converter.component';
import { MailinglistComponent } from './mailinglist/mailinglist.component';
import { MailinglistdataComponent } from './mailinglistdata/mailinglistdata.component';
import { HomeComponent } from './home/home.component';
import { UserRepositoryService } from './model/user.repository.service';

export const components= [AppComponent, HomeComponent,
											  CalculatorComponent, 
											  ConverterComponent, 
											  MailinglistComponent, 
											  MailinglistdataComponent];

@NgModule({
  declarations: [components, HomeComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [UserRepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
