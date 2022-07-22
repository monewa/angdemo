
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserRepositoryService } from '../model/user.repository.service';

@Component({
  selector: 'app-mailinglistdata',
  templateUrl: './mailinglistdata.component.html',
  styleUrls: ['./mailinglistdata.component.css' , '../app.component.css']
})
export class MailinglistdataComponent implements OnInit {

	message:string= '';
	selectedIndex:number= -1;
	newName:string= '';
	newLastName:string= '';
	newCountry:string= '';
	newEmail:string= '';
	newPhone:string= '';
	JSONDATA= this.repository.getJSONData();
	httpmessage= this.repository.output; 
	
	constructor(private repository:UserRepositoryService) { }
	
	getUsers(){
		return this.repository.users
	}
	
	editUsers(index:number):void{
		this.selectedIndex=index;
		this.newName= this.repository.getFirstName(index);
		this.newLastName= this.repository.getLastName(index);
		this.newCountry= this.repository.getCountry(index);
		this.newEmail= this.repository.getEmail(index);
		this.newPhone= this.repository.getPhone(index);
	}
	
	checkForEditMode(index:number):boolean{
		if(this.selectedIndex== index){
			return false;
		}
		return true;
	}
	
	saveNewData(index:number):void{
		this.selectedIndex= -1;
		this.message= ' ';
		this.updateNewName(index);
		this.updateNewLastName(index);
		this.updateNewCountry(index);
		this.updateNewEmail(index);
		this.updateNewPhone(index);
		
	}
	
	updateNewName(index:number):void{
		if(this.repository.getFirstName(index) != this.newName){
			this.message+= 
			`${this.repository.getFirstName(index)} is changed to ${this.newName}; `;
			this.repository.setFirstname(index, this.newName);
		}
	}
	
	updateNewLastName(index:number):void{
		if(this.repository.getLastName(index) != this.newLastName){
			this.message+= `${this.repository.getLastName(index)} is changed to ${this.newLastName}; `;
			this.repository.setLastname(index, this.newLastName);
		}
	}
	
	updateNewCountry(index:number):void{
		if(this.repository.getCountry(index) != this.newCountry){
			this.message+= `${this.repository.getCountry(index)} is changed to ${this.newCountry}; `;
			this.repository.setCountry(index, this.newCountry) ;
		}
	}
	   
		
	
	updateNewEmail(index:number):void{
		if(this.repository.getEmail(index) != this.newEmail){
			this.message+= `${this.repository.getEmail(index)} is changed to ${this.newEmail}; `;
			this.repository.setEmail(index, this.newEmail) ;
		}
	}
	
	updateNewPhone(index:number):void{
		if(this.repository.getPhone(index)!= this.newPhone){
			this.message+= `${this.repository.getPhone(index)} is changed to ${this.newPhone}; `;
			this.repository.setPhone(index, this.newPhone) ;
		}
	}
	
	deleteUser(index:number):void{
		this.message= this.repository.getFirstName(index) || 
		this.repository.users[index]?.lastName+' deleted';
		this.repository.deleteUser(index);
	}

	setWidth(length:number= 2):string{
		return `width:${length*5+ 80}px`;
	} 
	
	checkForData():boolean{
		if(this.repository.users.length<= 0){
			return false;
		}
		return true;
	}

	ngOnInit(): void { 	
		this.getUsers();
	}

}
