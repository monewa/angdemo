
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  defaultTitle: string= '';

  constructor(private service: MessageService) { }

  get title(): string{
    return this.service.title;
  }

  get message(): string{
    return this.service.message;
  }

  get type(): string{
    return this.service.type;
  }

  get isOpen(): boolean{
    return this.service.isOpen;
  }
  
  get class(): string{
    if (this.type== 'success') {
      this.defaultTitle= 'Thank you!'
      return 'alert-success bg-success text-white';      
    }
    if (this.type== 'error') {
      this.defaultTitle= 'Error!'
      return ' alert-danger bg-danger text-white';      
    }
    this.defaultTitle= 'Info'
    return 'alert-info bg-info';      
  }

  close(): void{
    this.service.closeMessage();
  }

removeMessageAutomatically(): void{  
    if (this.isOpen) {
        setTimeout(() => {
        this.close();
        }, 5000);      
    }
}

  ngOnInit(): void {
    this.removeMessageAutomatically()
  }

}
