
import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from '../model/user.repository.service';
import {NgModel, NgForm} from '@angular/forms'
import { WindowService } from '../services/window.service';
import {SuccessPopupService} from './success-popup.service';


@Component({
  selector: 'app-mailinglist',
  templateUrl: './mailinglist.component.html',
  styleUrls: ['./mailinglist.component.css', '../app.component.css', '../w3.css']
})
export class MailinglistComponent implements OnInit {

	firstName: string= '';
	lastName: string= '';
	country: string= '';
	email: string= '';
	code: string= '';
	phone: string= '';
	comments: string= '';
	submitted= false; 
	countryList: any[]= [];
	formIsValid: boolean= false;
	successPopupIsHidden: boolean= true;
	codeInfoIsHidden: boolean= false;
	tipStyle: string= 'opacity: 0';
	timeout= setTimeout(() => {this.countryList= this.repository.countries;}, 6000);
	
  constructor(private repository: UserRepositoryService, private popup: SuccessPopupService, 
						public window: WindowService) { }
	
	checkFormValidity(form: NgForm): void{
		this.submitted= true
		if(form.valid&& this.submitted){ 
			this.formIsValid= true;
		}  
	}
	
	checkFieldValidity(field: NgModel): boolean{
		if(this.submitted&& field.invalid){
			return true;
		}
		return false;
	}

	generateNextId(): number{
		let lastIndex= this.repository.users.length- 1
		if(lastIndex <= -1){
			return 1;
		}
		let lastId= this.repository.users[lastIndex].id;
		return lastId+1;
	}

	suggestCode(): void{
		let result = this.countryList.find(c=> c.country == this.country)
		this.code= result.code
	}
	
	saveForm(): void{			
		if(!this.formIsValid){
			return;
		}
		let phone = `+${this.code} ${this.phone}`;
		this.repository.addUser(this.generateNextId(), this.firstName, this.lastName, 
		this.country, this.email, phone, this.comments);
		this.popup.setDetails(this.firstName, this.lastName, this.country, this.email, phone);
		this.resetValues();
	}
			
	resetValues(): void{
		this.window.scrollToBottom();
		this.successPopupIsHidden= false;
		this.submitted= false;
		this.formIsValid= false;
	}

	clear(): void{
		this.firstName= '';
		this.lastName= '';
		this.country= '';
		this.email= '';
		this.phone= '';
		this.code= '';
		this.comments= '';
	}

	showTip(){
		this.tipStyle= 'opacity: 1';
	}

	hideTip(){
		this.tipStyle= 'opacity: 0';
	}

	ngOnInit(): void { 
		this.window.scrollToTop();
    }

}


