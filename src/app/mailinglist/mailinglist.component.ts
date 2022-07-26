
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserRepositoryService } from '../model/user.repository.service';
import { MessageService } from '../message.service';
import {NgModel, NgForm} from '@angular/forms'
import {Router} from '@angular/router';

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
	message:string= ''
	submitted=false;
	countryList= this.repository.countryList
	
  constructor(private repository:UserRepositoryService, private router:Router,
						private messageService:MessageService) { }
	
	checkFormValidity(form:NgForm){
		this.submitted= true
		if(form.valid&& this.submitted){
			this.saveForm();
		}
	}
	
	checkFieldValidity(field:NgModel):boolean{
		if(field.name== 'email'){
			if(this.email.length<=3){
		//		console.log('email',this.email)
			}
		}
		if(field.invalid&& this.submitted){
			return true;
		}
		return false;
	}
	
	goBackToStore(){
		this.router.navigateByUrl("/bookstore")
	}
	
	generateNextId():number{
		let lastIndex= this.repository.users.length- 1
		if(lastIndex<= -1){
			return 1;
		}
		let lastId= this.repository.users[lastIndex].id;
		return lastId+1;
	}
	
	saveForm():void{	
		this.submitted= false;
		let user:User= new User(this.generateNextId(), this.firstName, this.lastName, 
			this.country, this.email, '+'+this.code+' '+this.phone, this.comments);
		this.repository.addUser(user);
		this.goBackToStore();
		this.messageService.showSuccessMessage();
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

	ngOnInit():void { }

}


