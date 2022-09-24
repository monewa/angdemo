
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SuccessPopupService} from './success-popup.service';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css', '../app.component.css']
})
export class SuccessPopupComponent implements OnInit {
  
    constructor(private router: Router, private popup: SuccessPopupService) { }

    showPopup(){
      return this.popup.openPopup();
    }

    goBackToStore(): void{
      this.router.navigateByUrl("/bookstore")
      this.popup.hidePopup(true);
    }

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

    ngOnInit(): void {
    }

}
