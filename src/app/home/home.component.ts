import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {
	
	openAboutMeIsOpen=false;
	imageNo:number= 1
	constructor() { }

	openAboutMe(){
		this.openAboutMeIsOpen= !this.openAboutMeIsOpen;
	}	
	
	changeImageUrl= ()=>{		
		if(this.imageNo>= 4){
			this.imageNo= 0;
		}
		this.imageNo++;
	}

	ngOnInit(): void {
		setInterval(this.changeImageUrl, 5000);
	  }

}
