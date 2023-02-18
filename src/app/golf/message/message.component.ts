
import { Component, OnInit } from '@angular/core';
import { GolfMessageService } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css', '../golf.component.css']
})
export class GolfMessageComponent implements OnInit {

  isOpen: boolean= false;

  constructor(private service: GolfMessageService) { }

  getMessage(){
    return this.service.message;
  }

  getTitle(){
    return this.service.title;
  }

  getType(){
    return this.service.type;
  }

  ngOnInit(): void {
  }

}
