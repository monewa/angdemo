
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router:Router){  }
 
	showDatalinks(){
		if(this.router.isActive('mailinglist', true)){
			return false;			
		}
		return true;
	}
	
	showMoreDatalinks(){
		if(this.router.isActive('mailinglistdata', true)){
			return false;			
		}
		return true;
	}
 
	ngOnInit(): void{
		//this.router.navigateByUrl("/home")
	}
	
}
