
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
	eventLogIsOpen: boolean= false;
	deleteNotificationIsOpen: boolean= false;
	editNotificationIsOpen: boolean= false;
	id: number= -1;

	selectedIndex: number= -1;
	name: string= '';
	lastName: string= '';
	country: string= '';
	email: string= '';
	phone: string= '';
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
		this.messageLog += `<br>id no:${this.repository.getId(index)} ${this.repository.getFirstName(index)} was selected on <i>${new Date().toUTCString()}</i><br>`;
		this.id= this.repository.getId(index);
		this.updateName(index);
		this.updateLastName(index); 
		this.updateCountry(index);
		this.updateEmail(index);
		this.updatePhone(index);
		this.users = this.repository.users;
		this.openEditBox();
	}

	updateName(index:number): void{
		if(this.repository.getFirstName(index) != this.name){
			this.messageLog+= `- ${this.repository.getFirstName(index)} is changed to ${this.name}<br>`;
			this.repository.patchName(index, this.name);
		}
	}
	
	updateLastName(index:number): void{
		if(this.repository.getLastName(index) != this.lastName){
			this.messageLog+= `- ${this.repository.getLastName(index)} is changed to ${this.lastName}<br>`;
			this.repository.patchLastname(index, this.lastName);
		}
	}
	
	updateCountry(index:number): void{
		if(this.repository.getCountry(index) != this.country){
			this.messageLog+= `- ${this.repository.getCountry(index)} is changed to ${this.country}<br>`;
			this.repository.patchCounty(index, this.country);
		}
	}
	
	updateEmail(index:number): void{
		if(this.repository.getEmail(index) != this.email){
			this.messageLog+= `- ${this.repository.getEmail(index)} is changed to ${this.email}<br>`;
			this.repository.patchEmail(index, this.email);
		}
	}
	
	updatePhone(index:number): void{
		if(this.repository.getPhone(index) != this.phone){
			this.messageLog+= `- ${this.repository.getPhone(index)} is changed to ${this.phone}<br>`;
			this.repository.patchPhone(index, this.phone);
		}
	}
	
	deleteUser(index:number): void{
		this.messageLog+= `<br>id no:${this.repository.getId(index)} ${this.repository.getFirstName(index)}  was deleted on <i>${new Date().toUTCString()}</i><br>`;
		this.id= this.repository.getId(index);
		this.repository.deleteUser(index);
		this.users= this.repository.users;
		this.openDeleteBox();
	}

	openEditBox():void{
		this.editNotificationIsOpen= true;
		this.closeEventLog();
	}

	closeEditBox():void{
		this.editNotificationIsOpen= false;
	}

	openDeleteBox():void{
		this.deleteNotificationIsOpen= true;
		this.closeEventLog();
	}

	closeDeleteBox():void{
		this.deleteNotificationIsOpen= false;
	}

	openEventLog(){
		this.eventLogIsOpen= true;
	}

	closeEventLog(){
		this.eventLogIsOpen= false;
		// this.window.unfreezeWindow();
	}

	checkForEvents(){
		if(this.messageLog==''){
			return true;
		}
		return false;
	}

	closePopups(){
		this.closeEventLog();
		this.closeEditBox();
		this.closeDeleteBox();
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
