
import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from '../model/user.repository.service';
import { MessageService } from '../services/message.service';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-mailinglistdata',
  templateUrl: './mailinglistdata.component.html',
  styleUrls: ['./mailinglistdata.component.css' , '../app.component.css']
})
export class MailinglistdataComponent implements OnInit {

	users: any[]= [];
	id: number= -1;
	selectedIndex: number= -1;
	name: string= '';
	lastName: string= '';
	country: string= '';
	email: string= '';
	phone: string= '';
	scroll= 9;
	dataIsLoaded: boolean= false;
	
	constructor(private repository: UserRepositoryService, private messenger: MessageService,
		private window: WindowService) { }
	
	get(){
		this.repository.getUsers().subscribe( 
			(data)=> { 
				this.users= data; 
			});
	}

	editUsers(index:number): void{
		this.selectedIndex=index;
		this.name= this.users[index].firstName;
		this.lastName= this.users[index].lastName;
		this.country= this.users[index].country;
		this.email= this.users[index].email;
		this.phone= this.users[index].phone;
	}
	
	checkForEditMode(index:number): boolean{
		if(this.selectedIndex == index){
			return false;
		}
		return true;
	}

	updateData(index:number): void{
		this.selectedIndex= -1;
		this.id= this.users[index].id;
		this.messenger.setLogUpdate(this.users[index].firstName, '', true, '', 'selected', this.id);
		this.updateName(index);
		this.updateLastName(index); 
		this.updateCountry(index);
		this.updatePhone(index);
		this.updateEmail(index);
		this.get();
	}

	updateName(index:number): void{ 
		let name= this.users[index].firstName;
		if(name != this.name){
			this.repository.patchName(this.id, this.name).subscribe(
				users =>{ }, 
				err =>{ 
					this.messenger.setLogUpdate(name, '', false, err.message);
					this.messenger.setEditNotify(false, this.id);
				}, 
				() =>{
					this.messenger.setEditNotify(true, this.id);
					this.messenger.setLogUpdate(name, this.name, true);
				});	
		}
	}
	
	updateLastName(index:number): void{
		let lastName= this.users[index].lastName;
		if(lastName != this.lastName){
			this.repository.patchLastname(this.id, this.lastName).subscribe(
				users =>{ }, 
				err =>{ 
					this.messenger.setLogUpdate(lastName, '', false, err.message);
					this.messenger.setEditNotify(false, this.id);
				}, 
				() =>{
					this.messenger.setEditNotify(true, this.id);
					this.messenger.setLogUpdate(lastName, this.lastName, true);
				});
		}
	}
	
	updateCountry(index:number): void{
		let country= this.users[index].country;
		if(country != this.country){
			this.repository.patchCounty(this.id, this.country).subscribe(
				users=>{ }, 
				err =>{ 
					this.messenger.setLogUpdate(country, '', false, err.message);
					this.messenger.setEditNotify(false, this.id);
				}, 
				() =>{
					this.messenger.setEditNotify(true, this.id);
					this.messenger.setLogUpdate(country, this.country, true);
				});
		}
	}
	
	updateEmail(index:number): void{
		let email= this.users[index].email;
		if(email != this.email){
			this.repository.patchEmail(this.id, this.email).subscribe(
				users =>{ }, 
				err =>{ 
					this.messenger.setLogUpdate(email, '', false, err.message);
					this.messenger.setEditNotify(false, this.id);
				}, 
				() =>{
					this.messenger.setEditNotify(true, this.id);
					this.messenger.setLogUpdate(email, this.email, true);
				});
		}
	}
	
	updatePhone(index:number): void{
		let phone= this.users[index].phone
		if(phone != this.phone){
			this.repository.patchPhone(this.id, this.phone).subscribe(
				users =>{ }, 
				err =>{ 
					this.messenger.setLogUpdate(phone, '', false, err.message);
					this.messenger.setEditNotify(false, this.id);
				}, 
				() =>{
					this.messenger.setEditNotify(true, this.id);
					this.messenger.setLogUpdate(phone, this.phone, true);
				});
		}
	}
	
	deleteUser(id:number, index: number): void{
		let name= this.users[index].firstName;
		this.repository.deleteUser(id).subscribe(
			deleted =>{ }, 
			err =>{ 
				this.messenger.setLogUpdate(name, '', false, err.message, 'deleted', id);
				this.messenger.setDeleteNotify(true, id);
				this.messenger.deleteNotificationIsOpen= true;
			}, 
			() =>{
				this.messenger.setLogUpdate(name, '', true, '', 'deleted', id);
				this.messenger.setDeleteNotify(false, id);
				this.messenger.deleteNotificationIsOpen= true;
			 });
		this.get();
	}	

	getName(id: number){
		let index= this.users?.indexOf(id);
		return	this.users[index].firstName;
	}

	checkForData(): boolean{
		if(this.users.length <= 0 && this.dataIsLoaded){
			return false;
		} 
		return true;
	}
	
	loadData(){
		this.get();
		this.dataIsLoaded= true;		
	}

	ngOnInit(): void {
		this.window.scrollToTop();
		setTimeout(() => {this.loadData(); }, 4000);
	}

}
