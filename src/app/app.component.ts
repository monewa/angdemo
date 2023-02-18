
import { Component } from '@angular/core';
import { SiteManagerService } from './services/site-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  	constructor(public site: SiteManagerService){  }
 
	ngOnInit(): void{
	}
	
}
