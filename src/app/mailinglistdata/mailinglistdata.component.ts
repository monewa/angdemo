
import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from '../model/user.repository.service';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-mailinglistdata',
  templateUrl: './mailinglistdata.component.html',
  styleUrls: ['./mailinglistdata.component.css' , '../app.component.css']
})
export class MailinglistdataComponent implements OnInit {

	users:any[]= this.repository.users;
	message:string= '';
	selectedIndex:number= -1;
	name:string= '';
	lastName:string= '';
	country:string= '';
	email:string= '';
	phone:string= '';
	timeout=setTimeout(() => {this.users= this.repository.users;}, 4000);
	
	constructor(private repository:UserRepositoryService, private window:WindowService) { }
	
	editUsers(index:number):void{
		this.selectedIndex=index;
		this.name= this.repository.getFirstName(index);
		this.lastName= this.repository.getLastName(index);
		this.country= this.repository.getCountry(index);
		this.email= this.repository.getEmail(index);
		this.phone= this.repository.getPhone(index);
	}
	
	checkForEditMode(index:number):boolean{
		if(this.selectedIndex== index){
			return false;
		}
		return true;
	}
	
	updateData(index:number):void{
		this.selectedIndex= -1;
		this.message= '';

		this.updateName(index);
		this.updateLastName(index);
		this.updateCountry(index);
		this.updateEmail(index);
		this.updatePhone(index);
		this.users= this.repository.users;
	}

	updateName(index:number):void{
		if(this.repository.getFirstName(index) != this.name){
			this.message+= `id no:${this.repository.getId(index)} ${this.repository.getFirstName(index)} is changed to ${this.name}`;
			this.repository.patchName(index, this.name);

		}
	}
	
	updateLastName(index:number):void{
		if(this.repository.getLastName(index) != this.lastName){
			this.message+= `id no:${this.repository.getId(index)} ${this.repository.getLastName(index)} is changed to ${this.lastName}`;
			this.repository.patchLastname(index, this.lastName);
		}
	}
	
	updateCountry(index:number):void{
		if(this.repository.getCountry(index) != this.country){
			this.message+= `id no:${this.repository.getId(index)} ${this.repository.getCountry(index)} is changed to ${this.country}`;
			this.repository.patchCounty(index, this.country);
		}
	}
	
	updateEmail(index:number):void{
		if(this.repository.getEmail(index) != this.email){
			this.message+= `id no:${this.repository.getId(index)} ${this.repository.getEmail(index)} is changed to ${this.email}`;
			this.repository.patchEmail(index, this.email);
		}
	}
	
	updatePhone(index:number):void{
		if(this.repository.getPhone(index)!= this.phone){
			this.message+= `id no:${this.repository.getId(index)} ${this.repository.getPhone(index)} is changed to ${this.phone}`;
			this.repository.patchPhone(index, this.phone);
		}
	}
	
	deleteUser(index:number):void{
		this.message= `id no:${this.repository.getId(index)}  ${this.repository.getFirstName(index)}  is deleted`;
		this.repository.deleteUser(index);
		this.users= this.repository.users
	}

	setWidth(length:number):string{
		return `width:${length*5+ 80}px; font-size: 19px;`;
	} 
	
	checkForData():boolean{
		if(this.users.length<= 0){
			return false;
		}
		return true;
	}

	ngOnInit(): void {
		this.window.scrollToTop();
		this.timeout
	}

}
