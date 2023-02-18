
import { Injectable } from "@angular/core";

@Injectable(
    {providedIn: 'root'}
)
export class GolfMessageService{

    title: string= '';
    message: string= '';
    type: string= '';
    isOpen: boolean= false;

    constructor() {    }

    setMessage(title: string, message: string, type: string){
        this.message= message;
        this.title= title;
        this.type= type
    }

    showMessage(): void{
        if (this.message!= '' && this.type!= '') {
            this.isOpen= true
        }
    }

    removeMessageAutomatically(): void{
        if (this.isOpen) {
            setTimeout(() => {
            this.setMessage('', '', '');
            this.isOpen= false;
            }, 6500);      
        }
    }
    
    show$removeMessage(): boolean{
        this.showMessage()
        this.removeMessageAutomatically()
        return this.isOpen;
      }
}