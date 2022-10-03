
import { Component, OnInit, OnChanges, } from '@angular/core';
import {SuccessPopupService} from './success-popup.service';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css', '../app.component.css', '../w3.css']
})
export class SuccessPopupComponent implements OnInit {
  
    constructor(private popup: SuccessPopupService) { }

    getName(): string{
      return this.popup.getName();
    }

    getLastname(): string{
      return this.popup.getLastName();
    }

    getCountry(): string{
      return this.popup.getCountry();
    }

    getEmail(): string{
      return this.popup.getEmail();
    }

    getPhone(): string{
      return this.popup.getPhone();
    }

    ngOnInit(): void {    }

}
