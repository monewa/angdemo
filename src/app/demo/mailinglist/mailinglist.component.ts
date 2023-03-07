
import { Component, OnInit } from '@angular/core';
import { Repository } from '../model/repository';
import {NgModel, NgForm} from '@angular/forms'
import { WindowService } from '../../services/window.service';
import { Recipient, RecipientModel } from '../model/recipient.model'; 
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-mailinglist',
  templateUrl: './mailinglist.component.html',
  styleUrls: ['./mailinglist.component.css', '../demo.component.css']
})
export class MailinglistComponent implements OnInit {

	protected firstName: string= ''; 
	protected lastName: string= '';
	protected country: string= '';
	protected email: string= '';
	protected code: string= '';
	protected phone: string= '';
	protected phone_code: string= ''
	protected comments: string= '';
	submitted= false; 
	formIsValid: boolean= false;
	successPopupIsOpen: boolean= false;
	 
    constructor(private repository: Repository, private model: RecipientModel, private message: MessageService,
	public window: WindowService) { }
	
	get countries(): any[] {
		return this.repository.countries
	}

	get messageIsOpen(): boolean {
		return this.message.isOpen;
	}

	get successDetails(): { "label": string, "value": any }[]{
		return [ 
			{"label": 'Name' , "value": this.firstName},
			{"label": 'Lastname' , "value": this.lastName},
			{"label": 'Email' , "value": this.email},
			{"label": 'Country' , "value": this.country},
			{"label": 'Phone' , "value": this.phone_code},
			{"label": 'Comments' , "value": this.comments},
		]		 
	}
	
	validateForm(form: NgForm): void{
		this.submitted= true
		if(form.valid&& this.submitted){ 
			this.formIsValid= true;
		}  
	}
	
	fieldIsInvalid(field: NgModel): boolean{
		if(this.submitted&& field.invalid){
			return true;
		}
		return false;
	}

	suggestCode(): void{
		this.code= this.repository.getCountryCode(this.country);
	}
	
	saveForm(): void{			
		if(!this.formIsValid){
			return;
		}
		this.phone_code = `+${this.code} ${this.phone}`;
		this.model.save(this.firstName, this.lastName, this.country, this.email, this.phone_code, this.comments)
	}
			
	resetValues(): void{
		this.window.scrollToBottom();
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

	ngOnInit(): void { 
		this.window.scrollToTop();
    }

}


