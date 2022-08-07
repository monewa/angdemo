
import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from '../model/user.repository.service';
import {NgModel, NgForm} from '@angular/forms'
import {Router} from '@angular/router';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-mailinglist',
  templateUrl: './mailinglist.component.html',
  styleUrls: ['./mailinglist.component.css', '../app.component.css']
})
export class MailinglistComponent implements OnInit {

	firstName: string= '';
	lastName: string= '';
	country: string= '';
	email: string= '';
	code: string= '';
	phone: string= '';
	comments: string= '';
	userDetailsSummary:string= '';
	submitted= false; 
	countryList:any[]= [];
	formIsValid:boolean=false;
	hideSuccessPopup:boolean=  true;
	codeInfoIsHidden:boolean= true;
	
  constructor(private repository:UserRepositoryService, private router:Router,
						private window:WindowService) { }
	
	checkFormValidity(form:NgForm):void{
		this.submitted= true
		if(form.valid&& this.submitted){ 
			this.formIsValid=true;
		}  
	}
	
	checkFieldValidity(field:NgModel):boolean{
		if(this.submitted&& field.invalid){
			return true;
		}
		return false;
	}

	goBackToStore():void{
		this.router.navigateByUrl("/bookstore")
		this.hideSuccessPopup=true;
			  
	}
	
	generateNextId():number{
		let lastIndex= this.repository.users.length- 1
		if(lastIndex<= -1){
			return 1;
		}
		let lastId= this.repository.users[lastIndex].id;
		return lastId+1;
	}

	suggestCode():void{
		let result =this.countryList.find(c=> c.country== this.country)
		this.code= result.code
	}
	
	saveForm():void{			
		if(!this.formIsValid){
			return;
		}
		this.repository.addUser(this.generateNextId(), this.firstName, this.lastName, 
		this.country, this.email, '+'+this.code+' '+this.phone, this.comments);
		this.displaySavedDetails();
		this.resetValues();
	}
			
	resetValues():void{
		this.window.scrollToTop();
		this.hideSuccessPopup=false;
		this.submitted= false;
		this.formIsValid=false;
	}

	displaySavedDetails(){
		this.userDetailsSummary= `<br>First name:${this.firstName} 
			<br>Last name:${this.lastName} <br>Email:${this.email} 
			<br>Country:${this.country} 
			 <br>Phone:+${this.code} ${this.phone}`	
	}

	showCodeInfo(){		
		this.codeInfoIsHidden= false;
	}

	hideCodeInfo(){
		this.codeInfoIsHidden= true;
	}

	clear():void{
		this.firstName= '';
		this.lastName= '';
		this.country= '';
		this.email= '';
		this.phone= '';
		this.code= '';
		this.comments= '';
	}

	timeout=setTimeout(() => {this.countryList= this.repository.countries;}, 6000);

	

	ngOnInit():void { 
		this.window.scrollToTop();
    }

}


