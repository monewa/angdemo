
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css', '../app.component.css', '../mailinglist/mailinglist.component.css']
})
export class BookstoreComponent implements OnInit {

	profileCreated:boolean= this.messageService.profileCreated;
	
	constructor(private messageService:MessageService) { }
	
	cancelMessage():void{
		this.messageService.cancelMessage();
	}

	  ngOnInit(): void {
  }

}
