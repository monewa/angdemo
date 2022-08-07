
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , FormControl } from "@angular/forms";
import { AppComponent } from './app.component';
import { UserRepositoryService } from './model/user.repository.service';
import {components} from './app-routing.module';
import {PathLocationStrategy, LocationStrategy, HashLocationStrategy} from '@angular/common'

@NgModule({
  declarations: [components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
providers: [UserRepositoryService, {provide:LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
