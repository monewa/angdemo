
import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../services/window.service';


@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css', '../demo.component.css']
})
export class AboutmeComponent implements OnInit {

  picStyle1: string = 'display: none';
  picStyle2: string = 'display: none';
  picStyle3: string = 'display: block';
  timeout= setInterval(() => {this.changetoPic1();}, 3000);
  timeout1= setInterval(() => {this.changeToPic2();}, 6000);
  timeout2= setInterval(() => {this.changeToPic3();}, 9000);

   constructor(private window:WindowService) { }
   

   hideAllPics(): void{
    this.picStyle1= 'display: none';
    this.picStyle2= 'display: none';
    this.picStyle3= 'display: none';
  }
   changetoPic1(){
    this.hideAllPics();
    this.picStyle1 = 'display: block';
   }

   changeToPic2(){
    this.hideAllPics();
    this.picStyle2 = 'display: block';
   }

   changeToPic3(){
    this.hideAllPics();
    this.picStyle3 = 'display: block';
   }

  ngOnInit(): void {
    this.window.scrollToTop();
    this.timeout;
    this.timeout1;
    this.timeout2;

  }

}
