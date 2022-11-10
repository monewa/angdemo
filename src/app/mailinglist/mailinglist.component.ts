
import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from '../model/user.repository.service';
import {NgModel, NgForm} from '@angular/forms'
import { WindowService } from '../services/window.service';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-mailinglist',
  templateUrl: './mailinglist.component.html',
  styleUrls: ['./mailinglist.component.css', '../app.component.css', '../w3.css']
})
export class MailinglistComponent implements OnInit {

	id: number= -1;
	protected firstName: string= '';
	protected lastName: string= '';
	protected country: string= '';
	protected email: string= '';
	protected code: string= '';
	protected phone: string= '';
	protected phone_code: string= ''
	protected comments: string= '';
	submitted= false; 
	countryList: any[]= [];
	formIsValid: boolean= false;
	successPopupIsHidden: boolean= true;
	codeInfoIsHidden: boolean= false;
	saveError: string= '';
	saveErrorFound: boolean= false;
	countriesListError: string= '';
	idErrorFound: boolean= false;
	tipStyle: string= 'opacity: 0';
	
  constructor(private repository: UserRepositoryService, private messenger: MessageService,
	public window: WindowService) { }
	
	validateForm(form: NgForm): void{
		this.submitted= true
		if(form.valid&& this.submitted){ 
			this.formIsValid= true;
		}  
	}
	
	validateField(field: NgModel): boolean{
		if(this.submitted&& field.invalid){
			return true;
		}
		return false;
	}

	generateNextId(): void{
		this.repository.getUsers().subscribe(
			data =>{
				let lastIndex= data.length -1
				if(lastIndex <= -1){
					this.id= 1;
				}
				this.id= data[lastIndex].id+1;
			}, 
			err =>{
				this.idErrorFound= true;
				this.messenger.setLogUpdate('', '', false, err.message, 'create-id', this.id);
			});
	}

	suggestCode(): void{
		let result = this.countryList.find(c=> c.country == this.country)
		this.code= result.code
	}
	
	saveForm(): void{			
		if(!this.formIsValid){
			return;
		}
		this.generateNextId();
		if (this.idErrorFound) {
			this.saveError= 'error: wrong id';
			return;
		}
		this.phone_code = `+${this.code} ${this.phone}`;
		this.repository.addUser(this.id, this.firstName, this.lastName, 
		this.country, this.email, this.phone_code, this.comments).subscribe(
			add =>{ },
			err =>{ 
				this.saveErrorFound= true;
			console.log('1st '+this.saveErrorFound);
				this.saveError= err.message;
				this.messenger.setLogUpdate('',this.firstName, false, err.message, 'created');
			}, 
			() =>{
				this.messenger.setLogUpdate('', this.firstName, true, '', 'created');
				this.resetValues();
			}); 
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

	getCountries(): void{
		this.repository.getCountries().subscribe(
			(data: any[])=> { 
				this.countryList= data; 
			},
		err=> {
			this.countriesListError= '(country list not found!) '
		},
		()=> {
			this.countriesListError= '';
		});
	}

	ngOnInit(): void { 
		this.window.scrollToTop();
		this.generateNextId();
		this.getCountries();
    }

}


