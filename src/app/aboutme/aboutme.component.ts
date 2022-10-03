
import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';


@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css', '../app.component.css', '../w3.css']
})
export class AboutmeComponent implements OnInit {

  picStyle1: string = 'display: none';
  picStyle2: string = 'display: none';
  picStyle3: string = 'display: block';
  timeout= setInterval(() => {this.changetoPic1();}, 3000);
  timeout1= setInterval(() => {this.changeToPic2();}, 6000);
  timeout2= setInterval(() => {this.changeToPic3();}, 9000);

   constructor(private window:WindowService) { }
   
   changetoPic1(){
    this.picStyle1 = 'display: block';
    this.picStyle2 = 'display: none';
    this.picStyle3 = 'display: none';
   }

   changeToPic2(){
    this.picStyle1 = 'display: none';
    this.picStyle2 = 'display: block';
    this.picStyle3 = 'display: none';
   }

   changeToPic3(){
    this.picStyle1 = 'display: none';
    this.picStyle2 = 'display: none';
    this.picStyle3 = 'display: block';
   }

  ngOnInit(): void {
    this.window.scrollToTop();
    this.timeout;
    this.timeout1;
    this.timeout2;

  }

}
