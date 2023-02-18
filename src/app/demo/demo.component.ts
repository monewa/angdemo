import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SiteManagerService } from '../services/site-manager.service';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor(private router:Router, public window:WindowService, public site: SiteManagerService){  }

  
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

  ngOnInit(): void {
  }

}
