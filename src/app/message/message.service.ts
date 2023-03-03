
import { Injectable } from "@angular/core";

@Injectable(
    {providedIn: 'root'}
)
export class MessageService{

    title: string= '';
    message: string= '';
    type: string= '';
    isOpen: boolean= false;

    constructor() {    }

    setMessage(title: string, message: string, type: string): void{
        this.message= message;
        this.title= title;
        this.type= type
        this.showMessage()
    }
    
    showMessage(): void{
        this.isOpen= true;
    }

    closeMessage(): void{
        this.isOpen= false;
    }
}