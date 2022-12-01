
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-golf-home',
  templateUrl: './golf.component.html',
  styleUrls: ['./golf.component.css',
  ]
})
export class GolfComponent implements AfterViewInit {

  element: string= '';
  constructor() { }

  runScripts(){
    let button= document.createElement('button');
    button.textContent= 'close'
  }

  ngAfterViewInit(){
  }
  
  ngOnInit(): void {
    setTimeout(() => {
      this.runScripts();
    }, 4000);

  }

}
