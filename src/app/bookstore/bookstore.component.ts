
import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';
import { UserRepositoryService } from '../model/user.repository.service';

@Component({
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css', '../app.component.css', '../w3.css']
})
export class BookstoreComponent implements OnInit {

books: any[] = [];
timeout= setTimeout(()=>{this.books= this.repository.books}, 3000);

constructor(private window: WindowService, private repository: UserRepositoryService) { }

ngOnInit(): void { 
    this.window.scrollToTop();
    // this.books= this.repository.books;
  }

}
