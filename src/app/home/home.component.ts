import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {
	
	openAboutMeIsOpen=false;
	changeUrl:boolean= false
	constructor() { }

	openAboutMe(){
		this.openAboutMeIsOpen= !this.openAboutMeIsOpen;
	}	

	changeImageUrl= ()=>{		
		this.changeUrl= !this.changeUrl
	}

	ngOnInit(): void {
		setInterval(this.changeImageUrl, 5000);
	  }

}
