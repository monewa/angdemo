
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserRepositoryService } from '../model/user.repository.service';

@Component({
  selector: 'app-mailinglist',
  templateUrl: './mailinglist.component.html',
  styleUrls: ['./mailinglist.component.css', '../app.component.css']
})
export class MailinglistComponent implements OnInit {

	nextUserId= 0;
	color:string= ''
	message:string= ''
	firstName: string= '';
	lastName: string= '';
	country: string= '';
	email: string= '';
	code: string= '';
	phone: string= '';
	comments: string= '';

  constructor(private repository:UserRepositoryService) { }
	
	preventForm():void{
		// let form= document.getElementById('form');
		// form.addEventListener('submit', 
		// function(event){
			// event.preventDefault();
		// });		
	}
	
	validateForm():boolean{
		if(this.checkFormValidity('name') || this.checkFormValidity('lastName') ||
			this.checkFormValidity('country') || this.checkFormValidity('email') || 
			this.checkFormValidity('phone') || this.checkFormValidity('code')){
				return true;
		}
		return false;
	}
	
	checkFormValidity(id:string):boolean{
		let element = (<HTMLInputElement>document.getElementById(id));
		if(!element.checkValidity()){
			this.setColor('red');
			this.setBorderColor(id, 'red');
			this.message= element.validationMessage;
			if(id== 'phone'){
				this.message= 'Phone number must be 7 characters';
			}
			if(id== 'code'){
				this.message= 'Code must be 4 characters';
			}
			return true;
		}
		this.message= '';
		this.setBorderColor(id, 'white')
		return false;
	}
	
	saveForm():void{
		if(this.validateForm()){
		//	return;
		}  			
		this.nextUserId= this.repository.users.length+1;
		let user:User= new User(this.nextUserId, this.firstName, this.lastName, this.country, this.email, this.code+this.phone, this.comments);
		this.repository.addUser(user);
		this.message= 'Your proflie is saved successfully' ;
		this.setColor('lime');
	//	this.saveLocal();
	}
		
	clear():void{
	//	document.getElementById('lastName').innerHTML= 'json';
	//	document.getElementById('lastName').innerText= '';
	}
	
	setColor(newcolor:string, id:string= 'message'):void{
		this.color=`color:{${newcolor}`;
	}
	
	setBorderColor(newcolor:string, id?:string):string{
		return `border:solid {${newcolor}`;
	}

	ngOnInit():void {
		this.preventForm();
  }

}


