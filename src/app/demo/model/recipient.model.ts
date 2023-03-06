
import { Injectable } from "@angular/core";
import { Repository } from "./repository";

export class Recipient{

	id: number= 0;
	firstName: string= '';
	lastName: string= '';
	country: string= '';
	email: string= '';
	phone: string= '';
	comments: string= '';
	
	constructor(firstName: string, lastName: string, country: string, email: string, phone: string,
		comments: string){ 
		this.firstName= firstName;
		this.lastName= lastName;
		this.country= country;
		this.email= email;
		this.phone= phone;
		this.comments= comments;
	}
}


@Injectable({
	providedIn: 'root'
})

export class RecipientModel{

	constructor(private repository: Repository) { 	}

	getRecipients(): Recipient[]{
		return this.repository.recipients;
	}

	getRecipient(id: number): Recipient{
		return this.repository.getRecipient(id);
	}

	getName(id: number): string{
		return this.repository.getName(id);
	}

	getLastname(id: number): string{
		return this.repository.getLastname(id);
	}

	getCountry(id: number): string{
		return this.repository.getCountry(id);
	}

	getEmail(id: number): string{
		return this.repository.getEmail(id);
	}

	getPhone(id: number): string{
		return this.repository.getPhone(id);
	}

	save(firstName: string, lastName: string, country: string, email: string, phone: string, comments: string){
		const recipient = 
		 	new Recipient(firstName, lastName, country, email, phone, comments);
		this.repository.addRecipient(recipient);
	}
	
	updateName(id: number, name: string): void{ 
		if( name != this.getName(id) ){
			this.repository.patchName(id, name);	
		}
	}

	updateLastname(id: number, lastname: string): void{ 
		if( lastname != this.getLastname(id) ){
			this.repository.patchLastname(id, lastname);	
		}
	}

	updateCountry(id: number, country: string): void{ 
		if( country != this.getCountry(id) ){
			this.repository.patchCounty(id, country);	
		}
	}

	updateEmail(id: number, email: string): void{ 
		if( email != this.getEmail(id) ){
			this.repository.patchEmail(id, email);	
		}
	}

	updatePhone(id: number, phone: string): void{ 
		if( phone != this.getPhone(id) ){
			this.repository.patchPhone(id, phone);	
		}
	}
	

}

