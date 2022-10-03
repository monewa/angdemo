
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from './services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './w3.css']
})
export class AppComponent {

	menuIsOpen: boolean= false;

  	constructor(private router:Router, public window:WindowService){  }
 
  	openMenu(): void{
		this.menuIsOpen= !this.menuIsOpen;
  	}

	showMailList(): string{ 
		if(this.router.isActive('mailinglistdata', true) || !this.router.isActive('mailinglist', true)){
			return  'display: none;';
		}
		return 'display: block;'
	}

	showDatalinks(): string{
		if(this.router.isActive('mailinglist', true) || this.router.isActive('mailinglistdata', true) ){
			return 'display: block;'
		}
		return  'display: none;';
	}
	
	showMoreDatalinks(): string{
		if(this.router.isActive('mailinglistdata', true)){
			return 'display: block;'
		}
		return  'display: none;';
	}	

	hideFooter(){
		if(this.router.isActive('mailinglistdata', true)){
			return false;			
		}
		return true;
	}	

	ngOnInit(): void{
	}
	
}
