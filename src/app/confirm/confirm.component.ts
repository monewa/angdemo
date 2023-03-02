
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Input() title: string= ''; 
  @Input() question: string= '';

  @Output() open: EventEmitter<boolean> =  new EventEmitter<boolean>(); 
  @Output() isDue: EventEmitter<boolean> =  new EventEmitter<boolean>(); 
  @Output() confirmOption: EventEmitter<boolean> =new EventEmitter<boolean>(); 

  constructor() {  }

  selectOption(isConfirmed: boolean): void{
    this.open.emit(false);
    this.confirmOption.emit(isConfirmed);
}

  ngOnInit(): void {
  }

}
