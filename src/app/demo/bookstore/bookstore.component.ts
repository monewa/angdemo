
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { WindowService } from '../../services/window.service';
import { Repository } from '../model/repository';

@Component({ 
  selector: 'app-bookstore',
  templateUrl: './bookstore.component.html',
  styleUrls: ['./bookstore.component.css', '../demo.component.css']
})
export class BookstoreComponent implements OnInit {


constructor(private window: WindowService, private repository: Repository, private message: MessageService) { }

get books(): any[] {
  return this.repository.books
}

get messageIsOpen(): boolean {
  return this.message.isOpen;
}


ngOnInit(): void { 
    this.window.scrollToTop();
}

}
