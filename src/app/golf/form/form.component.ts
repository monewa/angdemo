
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  name: string= '';
  score: string= '';
  message: string= ''; 
  constructor() { }

  savePlayer(){
    this.message= 'player saved'
  }

  ngOnInit(): void {
  }

}
