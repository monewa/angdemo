
import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../app.component.css']
})
export class HomeComponent implements OnInit {
	
  firstPicInterval= setInterval(()=> this.show1stPic(), 3000);
  secondPicInterval= setInterval(()=> this.show2ndPic(), 6000);
  thirdPicInterval= setInterval(()=> this.show3rdPic(), 9000);
  fourthPicInterval= setInterval(()=> this.show4thPic(), 12000);



  styleForPic1: string = 'display: none';
  styleForPic2: string = 'display: none';
  styleForPic3: string = 'display: none';
  styleForPic4: string = 'display: block';

	  constructor(private window:WindowService) { }

	ngOnInit(): void {
    this.window.scrollToTop();
	}

  hideAllPics(): void{
    this.styleForPic1= 'display: none';
    this.styleForPic2= 'display: none';
    this.styleForPic3= 'display: none';
    this.styleForPic4= 'display: none';
  }

  show1stPic(): void{
    this.hideAllPics();
    this.styleForPic1= 'display: block';
  }

  show2ndPic(): void{
    this.hideAllPics();
    this.styleForPic2= 'display: block';
  }

  show3rdPic(): void{ 
    this.hideAllPics();
    this.styleForPic3= 'display: block';
  }

  show4thPic(): void{
    this.hideAllPics();
    this.styleForPic4= 'display: block';
  }
}
