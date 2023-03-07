
import { Component, Input, OnInit } from '@angular/core';
import { Repository } from '../model/repository';
import { EventLogService } from '../../services/eventlog.service';
import { WindowService } from '../../services/window.service';
import { Recipient, RecipientModel } from '../model/recipient.model';
import { MessageService } from 'src/app/services/message.service';
  
@Component({
  selector: 'app-mailinglistdata',
  templateUrl: './mailinglistdata.component.html',
  styleUrls: ['./mailinglistdata.component.css' , '../demo.component.css']
})
export class MailinglistdataComponent implements OnInit {

	selectedId: number= -1;
	inEditMode: boolean= false;
	scroll= 9;
	dataIsLoaded: boolean= false;
	confirmUpdateIsOpen= false;
	confirmDeleteIsOpen= false;
	name: string= '';
	lastName: string= '';
	country: string= '';
	email: string= '';
	phone: string= '';

	
	constructor(private repository: Repository, private model: RecipientModel, private log: EventLogService,
		private window: WindowService, private message: MessageService) { }

	get recipients(): Recipient[] {
		return this.repository.recipients
	}

	get recipient(): Recipient {
		return this.repository.getRecipient(this.selectedId)
	}

	get messageIsOpen(): boolean {
		return this.message.isOpen;
	}

	assignProperties(){
		const r= this.recipient;
		this.name= r.firstName;
		this.lastName= r.lastName;
		this.country= r.country;
		this.email= r.email;
		this.phone= r.phone;
	}

	edit(id:number): void{
		this.inEditMode= true;
		this.selectedId=id;
		this.assignProperties();
	}
	
	isInEditMode(id:number): boolean{
		if(this.inEditMode&& this.selectedId == id){
			return true;
		}
		return false;
	} 

	dataIsChanged(): boolean{
		const r= this.recipient;
		const nameIsChanged= this.name!= r.firstName;
		const surnameIsChanged= this.lastName!= r.lastName;
		const emailIsChanged= this.email!= r.email;
		const countryIsChanged= this.country!= r.country;
		const phoneIsChanged= this.phone!= r.phone;
		if (nameIsChanged || surnameIsChanged || emailIsChanged || countryIsChanged || phoneIsChanged) {
			return true;
		}
		return false;
	}

	openConfirmUpdate(): void{
		this.inEditMode= false;
		if ( !this.dataIsChanged() ) {
			return
		}
		this.confirmUpdateIsOpen= true;
	}

	openConfirmDelete(id:number): void{
		this.confirmDeleteIsOpen= true;
		this.selectedId= id;
	}

	confirmUpdate(isConfirmed: boolean){
		if (!isConfirmed) {
			return;
		}
		this.updateData();
	}

	confirmDelete(isConfirmed: boolean){
		if (!isConfirmed) {
			return;
		}
		this.delete(this.selectedId);
	}

	updateData(): void{
		this.log.setLogUpdate(this.recipient.lastName, '', true, '', 'selected', this.selectedId);
		this.model.updateName(this.selectedId, this.name);
		this.model.updateLastname(this.selectedId, this.lastName);
		this.model.updateCountry(this.selectedId, this.country);
		this.model.updateEmail(this.selectedId, this.email);
		this.model.updatePhone(this.selectedId, this.phone);
	}
	
	delete(id:number): void{
		this.repository.deleteRecipient(id);
	}	
	
	loadData(): void{
		this.dataIsLoaded= true;		
	}

	ngOnInit(): void {
		this.window.scrollToTop();
		setTimeout(() => {this.loadData(); }, 4000);
	}

}
