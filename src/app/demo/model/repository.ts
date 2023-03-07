
import { Injectable } from '@angular/core';
import { Recipient } from './recipient.model';
import { RestDataSource } from './rest.datasource';
import { MessageService } from 'src/app/services/message.service';
import { EventLogService } from '../../services/eventlog.service';

@Injectable({
  providedIn: 'root'
})
export class Repository {
	
	recipients: any[]= [];
	countries: any[]= [];
	books: any[]= [];
	
	constructor(private message: MessageService, private data: RestDataSource, private log: EventLogService) { 
		this.getRecipients();
		this.getBooks();
		this.getCountries();
	}

	getBooks(): void{
		this.data.getBooks().subscribe(
		   data => { this.books= data; }, 
		   err=> { this.message.setMessage('', 'Books not loaded', 'error'); });
	}

	getCountries(): void{
		this.data.getCountries().subscribe(
			data=> { this.countries= data; },
		    err=> { this.message.setMessage('', 'Countries not loaded', 'error'); });
	}

	getCountryCode(country: string): string{
		let result = this.countries.find(c=> c.country == country)
		return result.code
	}

	getRecipients(): void{
		this.data.getRecipients().subscribe( 
			data=> { this.recipients= data; },
	        err=> { this.message.setMessage('', 'Recipients not loaded', 'error'); })
	}

	getRecipient(id: number): Recipient{
		const recipient= this.recipients.find(r=> { return r.id== id });
		return recipient || new Recipient('', '', '', '', '', '')
	}

	getName(id: number): string{
		return this.getRecipient(id).firstName;
	}

	getLastname(id: number): string{
		return this.getRecipient(id).lastName; 
	}

	getCountry(id: number): string{
		return this.getRecipient(id).country;
	}	

	getEmail(id: number): string{
		return this.getRecipient(id).email;
	}

	getPhone(id: number): string{
		return this.getRecipient(id).phone;
	}

	addRecipient(recipient: Recipient): void{
		const name= recipient.lastName;
		this.data.addRecipient(recipient).subscribe(
			newRecipient=> { this.recipients.push(newRecipient) },
			err=> { 
				this.message.setMessage('', name+ 'was not created', 'error'); 
				this.log.setLogUpdate(name, '',  false, err.message, 'created');
			}, 
			() =>{ 
				this.log.setLogUpdate('', name, true, '', 'was created'); 
			});
	}

	putRecipient(id: number, recipient: Recipient): void{
		const name= recipient.lastName;
		const index= this.recipients.indexOf(recipient);
		this.data.putRecipient(id, recipient).subscribe(
			newRecipient=> { this.recipients.splice(index, 1, newRecipient) },
			error=> { 
				this.message.setMessage('', name+'was not updated', 'error'); 
				this.log.setLogUpdate(name, '', false, error.message, 'updated', id);
			 },
			()=> { 
				this.message.setMessage('', name+' was updated', 'success');
				this.log.setLogUpdate('', name, true, '', 'updated', id); }
		)
	}

	deleteRecipient(id: number): void{
		const index= this.recipients.indexOf(this.getRecipient(id));
		const name= this.getLastname(id);
		this.data.deleteRecipient(id).subscribe(
			deletedRecipient =>{ this.recipients.splice(index, 1); }, 
			err =>{ 
				this.message.setMessage('', name+' was not deleted', 'error');
				this.log.setLogUpdate(name, '', false, err.message, 'deleted', id);
			}, 
			() =>{ 
				this.message.setMessage('', name+' was deleted', 'success');
				this.log.setLogUpdate(name, '', true, '', 'deleted', id);
			 });
	}

	patchName(id: number, firstName: string): void{
		const oldName= this.getName(id);
		const recipient= this.getLastname(id);
		this.data.patchName(id, firstName).subscribe(
			recipient =>{ this.getRecipient(id).firstName= recipient.firstName }, 
			err =>{ 
				this.message.setMessage('', recipient+' name was not updated', 'error'); 
				this.log.setLogUpdate(oldName, '', false, err.message);
			}, 
			() =>{
				this.message.setMessage('', recipient+' name was updated', 'success'); 
				this.log.setLogUpdate(oldName, firstName, true);
			});

	}

	patchLastname(id: number, lastName: string): void{
		const oldName= this.getLastname(id);
		this.data.patchLastname(id, lastName).subscribe(
			recipient =>{ this.getRecipient(id).lastName= recipient.lastName }, 
			err =>{ 
				this.message.setMessage('', oldName+' last name was not updated', 'error');
				this.log.setLogUpdate(oldName, '', false, err.message);
			}, 
			() =>{
				this.message.setMessage('', oldName+' last name was updated', 'success'); 
				this.log.setLogUpdate( oldName, lastName, true);
			});
	}

	patchCounty(id: number, country: string): void{
		const recipient= this.getLastname(id);
		const oldCountry= this.getCountry(id);
		this.data.patchCounty(id, country).subscribe(
			recipient=>{ this.getRecipient(id).country= recipient.country }, 
			err =>{ 
				this.message.setMessage('', recipient+' country was not updated', 'error');
				this.log.setLogUpdate(oldCountry, '', false, err.message);
			}, 
			() =>{ 
				this.message.setMessage('', recipient+' country was updated', 'success'); 
				this.log.setLogUpdate( oldCountry, country, true);
			});
	}

	patchEmail(id: number, email: string): void{
		const recipient= this.getLastname(id);
		const oldEmail= this.getEmail(id);
		this.data.patchEmail(id, email).subscribe(
			recipient =>{ this.getRecipient(id).email= recipient.email }, 
			err =>{ 
				this.message.setMessage('', recipient+' email was not updated', 'error');
				this.log.setLogUpdate(oldEmail, '', false, err.message);
			}, 
			() =>{
				this.message.setMessage('', recipient+' email was updated', 'success'); 
				this.log.setLogUpdate(oldEmail, email, true);
			});

	}

	patchPhone(id: number, phone: string): void{
		const recipient= this.getLastname(id);
		const oldPhone= this.getPhone(id);
		this.data.patchPhone(id, phone).subscribe(
			recipient =>{ this.getRecipient(id).phone= recipient.phone }, 
			err =>{ 
				this.message.setMessage('', recipient+' phone was not updated', 'error');
				this.log.setLogUpdate(oldPhone, '', false, err.message);
			}, 
			() =>{
				this.message.setMessage('', recipient+' phone was updated', 'success'); 
				this.log.setLogUpdate(oldPhone, phone, true);
			});

	}

}
