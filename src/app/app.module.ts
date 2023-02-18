
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { UserRepository } from './demo/model/user.repository.service';
import { demoComponents, golfComponents } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [demoComponents, golfComponents, ConfirmComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // NgbModule,
  ],
providers: [UserRepository, {provide:LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
