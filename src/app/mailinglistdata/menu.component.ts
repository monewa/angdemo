

import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../app.component.css', '../w3.css']
})
export class MenuComponent implements OnInit {

    eventLogIsOpen: boolean= false;

    constructor(private menu: MenuService) { }

    getEventLogUpdate(): string{
      return this.menu.getEventLogUpdate();
    }

    getEditId(): number{
      return this.menu.getEditedId();
    }

    getDeleteId(): number{
      return this.menu.getDeleteId();
    }  

    openEditBox():boolean{
      return this.menu.getEditBoxStatus();
    }
  
    closeEditBox():void{
      this.menu.closeEditBox();
    }
  
    openDeleteBox():boolean{
      return this.menu.getDeleteBoxStatus();
    }
  
    closeDeleteBox():void{
      this.menu.closeDeleteBox();
    }
  
    openEventLog(): void{
      this.eventLogIsOpen= true;
    }
  
    closeEventLog(): void{
        this.eventLogIsOpen= false;
    }
  
    checkForEvents(): boolean{
      if(this.menu.getEventLogUpdate() == ''){
        return true;
      }
      return false;
    }

    ngOnInit(): void {
    }

}
