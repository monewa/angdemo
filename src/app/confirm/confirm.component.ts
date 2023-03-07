
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Input() title: string= ''; 
  @Input() question: string= '';

  @Output('close') isClosed: EventEmitter<boolean>=  new EventEmitter<boolean>(); 
  @Output() isDue: EventEmitter<boolean>=  new EventEmitter<boolean>(); 
  @Output('confirm') isConfirmed: EventEmitter<boolean>= new EventEmitter<boolean>(); 

  constructor() {  }

  selectOption(isConfirmed: boolean): void{
    this.isConfirmed.emit(isConfirmed);
    this.close();
}

  close(): void{
    this.isClosed.emit(false);
  }

  ngOnInit(): void {
  }

}
