
import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css', '../../app.component.css']
})
export class SuccessPopupComponent implements OnInit {
  
  constructor() { }

  @Input('name') firstname: string= '';
  @Input('lastname') lastname: string= '';
  @Input('email') email: string= '';
  @Input('nation') country: string= '';
  @Input('phone') phone: string= '';

 ngOnInit(): void {    }

}
