

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

    private deletedId: number= -1;
    private editedId: number= -1;
    private deleteNotificationIsOpen: boolean= false;
    private editNotificationIsOpen: boolean= false;
    private eventLog: string= '';

    constructor() { }

    setEvent(event: string, id: number, name: string): void{
      if(event == 'edit'){
        this.editNotificationIsOpen= true;
        this.editedId= id;
        this.setSelectedMessage(id, name);
      }
      else if(event == 'delete'){
        this.deleteNotificationIsOpen= true;
        this.deletedId= id;
        this.setDeletedMessage(id, name);
      }
    }

    closeEditBox(): void{
      this.editNotificationIsOpen= false;
    }

    getEditBoxStatus(): boolean{
      return this.editNotificationIsOpen; 
    }

    closeDeleteBox(): void{
      this.deleteNotificationIsOpen= false;      
    }

    getDeleteBoxStatus(): boolean{
      return  this.deleteNotificationIsOpen; 
    }

    getEventLogUpdate(): string{
      return this.eventLog; 
    }

    setSelectedMessage(id: number, name: string): void{
      this.eventLog+= `<br>
                                    id no:${id} ${name} was selected on <i>${new Date().toUTCString()}</i>
                                    <br>`;      
    }

    setUpdatedMessage(oldVal: string, newVal:string): void{
      this.eventLog+= `- ${oldVal} is changed to ${newVal}
                                    <br>`;
    }

    setDeletedMessage(id: number, name: string): void{
      this.eventLog+= `<p >
                                    id no:${id} ${name} was deleted on <i>${new Date().toUTCString()}</i>
                                    </p>`;      
    }

    getEditedId(): number{
      return this.editedId;
    }

    getDeleteId(): number{
      return this.deletedId;
    }   

}
