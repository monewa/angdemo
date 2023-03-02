
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  isOpen: boolean= false;

  constructor(private service: MessageService) { }

  get message(){
    return this.service.message;
  }

  get title(){
    return this.service.title;
  }

  get type(){
    return this.service.type;
  }

  close(){
    this.service.isOpen= false;
  }

  ngOnInit(): void {
  }

}
