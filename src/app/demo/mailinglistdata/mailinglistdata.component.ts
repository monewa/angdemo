
import { Component, OnInit } from '@angular/core';
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
	scroll= 9;
	dataIsLoaded: boolean= false;
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
	
	editUsers(id:number): void{
		this.selectedId=id;
		this.name= this.recipient.firstName;
		this.lastName= this.recipient.lastName;
		this.country= this.recipient.country;
		this.email= this.recipient.email;
		this.phone= this.recipient.phone;
	}
	
	inEditMode(id:number): boolean{
		if(this.selectedId == id){
			return true;
		}
		return false;
	} 

	updateData(): void{
		this.log.setLogUpdate(this.recipient.lastName, '', true, '', 'selected', this.selectedId);
		this.model.updateName(this.selectedId, this.name);
		this.model.updateLastname(this.selectedId, this.lastName);
		this.model.updateCountry(this.selectedId, this.country);
		this.model.updateEmail(this.selectedId, this.email);
		this.model.updatePhone(this.selectedId, this.phone);
		this.selectedId= -1;
	}
	
	deleteUser(id:number): void{
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
