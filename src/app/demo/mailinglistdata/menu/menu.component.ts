
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../../demo.component.css']
})
export class MenuComponent implements OnInit {

   eventLogIsOpen: boolean= false;

   constructor(protected messenger: MessageService) { }

   closeEditBox():void{
     this.messenger.editNotificationIsOpen= false;
   }
   closeDeleteBox():void{
      this.messenger.deleteNotificationIsOpen= false;
   }
   openEventLog(): void{
      this.eventLogIsOpen= true;
   }
   closeEventLog(): void{
        this.eventLogIsOpen= false;
   }
   checkForEvents(): boolean{
     if(this.messenger.getLog() == ''){
       return true;
     }
     return false;
   }
   ngOnInit(): void {
   }
}
