

import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from '../model/user.repository.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../app.component.css', '../w3.css']
})
export class MenuComponent implements OnInit {

    eventLogIsOpen: boolean= false;

    constructor(protected repository:UserRepositoryService) { }

    getEventLogUpdate(): string{
      return this.repository.logUpdate;
    }

    getEditMessage(): string{
      return this.repository.editNotify;
    }

    getDeleteMessage(): string{
      return this.repository.deleteNotify;
    }

    closeEditBox():void{
      this.repository.editNotificationIsOpen= false;
    }
  
    closeDeleteBox():void{
      this.repository.deleteNotificationIsOpen= false;
    }
  
    openEventLog(): void{
      this.eventLogIsOpen= true;
    }
  
    closeEventLog(): void{
        this.eventLogIsOpen= false;
    }
  
    checkForEvents(): boolean{
      if(this.repository.logUpdate == ''){
        return true;
      }
      return false;
    }

    ngOnInit(): void {
    }

}
