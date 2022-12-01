
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { UserRepositoryService } from './model/user.repository.service';
import {components} from './app-routing.module';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { FormComponent } from './golf/form/form.component';
import { GolfHomeComponent } from './golf/home/golf-home.component';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [components, FormComponent, GolfHomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // NgbModule,
  ],
providers: [UserRepositoryService, {provide:LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
