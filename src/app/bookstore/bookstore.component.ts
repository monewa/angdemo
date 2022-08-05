
import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css', '../app.component.css', '../mailinglist/mailinglist.component.css']
})
export class BookstoreComponent implements OnInit {

	
constructor(private window:WindowService) { }

ngOnInit(): void { 
    this.window.scrollToTop();
  }

}
