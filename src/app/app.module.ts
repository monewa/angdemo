
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { appComponents, AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { Repository } from './demo/model/repository';
import { demoComponents, golfComponents } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; 
  
@NgModule({
  declarations: [demoComponents, golfComponents, appComponents],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // NgbModule,
  ],
providers: [Repository, {provide:LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
