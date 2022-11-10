
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

constructor(private window: WindowService, private repository: UserRepositoryService) { }

error: string= '';

getBooks(): void{
  console.log('sub');
  
  this.repository.getBooks().subscribe(
    (data:any[])=> { 
      this.books= data; 
    }, 
    err=> {
      this.error= '(no books not found!)';
    },
    ()=> {
      this.error= '';
    });
}

ngOnInit(): void { 
    this.window.scrollToTop();
    this.getBooks();
  }

}
