
import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {
	

	constructor(private window:WindowService) { }

	ngOnInit(): void {
    this.window.scrollToTop();
	}

}
