
import { Component, OnInit } from '@angular/core';
import { SiteManagerService } from '../services/site-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {
	
 
	  constructor(public site: SiteManagerService) { }

	ngOnInit(): void {
	}


}
