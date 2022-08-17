
import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from '../model/user.repository.service';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-mailinglistdata',
  templateUrl: './mailinglistdata.component.html',
  styleUrls: ['./mailinglistdata.component.css' , '../app.component.css']
})
export class MailinglistdataComponent implements OnInit {

	users: any[]= this.repository.users;
	messageLog: string= '';
	eventLogIsOpen= false;
	message: string= '';
	messageBoxIsOpen= false;
	selectedIndex: number= -1;
	name: string= '';
	lastName: string= '';
	country: string= '';
	email: string= '';
	phone: string= '';
	messageColor= ''
	timeout= setTimeout(() => {this.users= this.repository.users;}, 4000);
	
	constructor(private repository:UserRepositoryService, private window:WindowService) { }
	
	editUsers(index:number): void{
		this.selectedIndex=index;
		this.name= this.repository.getFirstName(index);
		this.lastName= this.repository.getLastName(index);
		this.country= this.repository.getCountry(index);
		this.email= this.repository.getEmail(index);
		this.phone= this.repository.getPhone(index);
	}
	
	checkForEditMode(index:number): boolean{
		if(this.selectedIndex == index){
			return false;
		}
		return true;
	}
	
	updateData(index:number): void{
		this.selectedIndex= -1;
		this.messageLog += `<br>id no:${this.repository.getId(index)} was selected<br>`;
		this.message= `id no:${this.repository.getId(index)} was edited`;
		this.messageColor= 'background-color:rgb(0, 81, 255)';
		this.updateName(index);
		this.updateLastName(index); 
		this.updateCountry(index);
		this.updateEmail(index);
		this.updatePhone(index);
		this.users = this.repository.users;
		this.openMessageBox();
	}

	updateName(index:number): void{
		if(this.repository.getFirstName(index) != this.name){
			this.messageLog+= ` ${this.repository.getFirstName(index)} is changed to ${this.name}<br>`;
			this.repository.patchName(index, this.name);

		}
	}
	
	updateLastName(index:number): void{
		if(this.repository.getLastName(index) != this.lastName){
			this.messageLog+= `${this.repository.getLastName(index)} is changed to ${this.lastName}<br>`;
			this.repository.patchLastname(index, this.lastName);
		}
	}
	
	updateCountry(index:number): void{
		if(this.repository.getCountry(index) != this.country){
			this.messageLog+= `${this.repository.getCountry(index)} is changed to ${this.country}<br>`;
			this.repository.patchCounty(index, this.country);
		}
	}
	
	updateEmail(index:number): void{
		if(this.repository.getEmail(index) != this.email){
			this.messageLog+= `${this.repository.getEmail(index)} is changed to ${this.email}<br>`;
			this.repository.patchEmail(index, this.email);
		}
	}
	
	updatePhone(index:number): void{
		if(this.repository.getPhone(index) != this.phone){
			this.messageLog+= `${this.repository.getPhone(index)} is changed to ${this.phone}<br>`;
			this.repository.patchPhone(index, this.phone);
		}
	}
	
	deleteUser(index:number): void{
		this.messageLog+= `<br>id no:${this.repository.getId(index)} ${this.repository.getFirstName(index)}  is deleted<br>`;
		this.messageColor= 'background-color: crimson';
		this.message= `id no:${this.repository.getId(index)} was deleted`;
		this.repository.deleteUser(index);
		this.users= this.repository.users;
	}

	openMessageBox():void{
		this.messageBoxIsOpen= this.message== ''? false: true;
		this.closeEventLog();
	}

	closeMessageBox():void{
		this.messageBoxIsOpen= false;
		this.message= "";
	}

	openEventLog(){
		this.eventLogIsOpen= true;
		this.closeMessageBox();

	}

	closeEventLog(){
		this.eventLogIsOpen= false;
	}

	checkForEvents(){
		if(this.messageLog==''){
			return true;
		}
		return false;
	}


	closePopups(){
		if(this.eventLogIsOpen){
			this.closeEventLog();
		}
		if(this.messageBoxIsOpen){
			this.closeMessageBox();
		}
	}

	setWidth(length:number): string{
		return `width:${length*5+ 80}px; font-size: 19px;`;
	} 	

	checkForData(): boolean{
		if(this.users.length <= 0){
			return false;
		}
		return true;
	}

	ngOnInit(): void {
		this.window.scrollToTop();
		this.timeout
	}

}
