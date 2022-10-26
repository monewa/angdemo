
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
	
	users: any[]= [];
	countries: any[]= [];
	books: any[]= [];
	editNotify: string= '';
	deleteNotify: string= '';
	logUpdate: string= '';
	deleteNotificationIsOpen: boolean= false;
    editNotificationIsOpen: boolean= false;
	readonly SERVER1= 'https://mo-json-api.herokuapp.com';
	readonly  USERSURL:string= `${this.SERVER1}/recipients`;
	readonly  COUNTRIESURL:string= `${this.SERVER1}/countries-codes`;
	readonly  BOOKSURL:string= `${this.SERVER1}/books`;
	
	constructor( private http:HttpClient) { 
		this.get(); 
		this.getCountries();
		this.getBooks();
	}

	getCountries(): void{
		this.http.get<any[]>(this.COUNTRIESURL, {responseType: 'json'}).subscribe(
			(data:any[])=> { this.countries= data; }
		)
	}

	getBooks(): void{
		this.http.get<any[]>(this.BOOKSURL, {responseType: 'json'}).subscribe(
			(data:any[])=> { this.books= data; }
		)
	}

	getFromServer(): Observable<User[]>{
		return this.http.get<User[]>(this.USERSURL, {responseType: 'json'})	
	}

	get(){
		this.getFromServer().subscribe( 
			(data: User[])=> { 
				this.users= data; 
			}
		);
	}
	
	addUser(id: number= -1, firstName: string= '', lastName: string= '', country: string= '', email: string= '', 
	phone: string= '', comments: string= ''): void{
		let user= {"id": id,
			"firstName": firstName,
			"lastName": lastName,
			"country": country,
			"email": email,
			"phone": phone,
			"comments": comments
		}
		this.http.post<User[]>(this.USERSURL, user,	{responseType: 'json'}).subscribe(
			add=>{ 
				this.logUpdate+= `<br>Recipient ${firstName} is created on <i>${this.getDate()}</i><br>`;
				this.users.push(user);
			},
			err=>{ 
				this.logUpdate+= `<br>Error: recipient ${firstName} is not created<br>`;
			});
	}

	putUser(index: number, firstName: string, lastName: string,	country: string, email: string, phone: string): void{
		let user= {"id": '',
			"firstName": firstName,
			"lastName": lastName,
			"country": country,
			"email": email,
			"phone": phone,
			"comments": this.getComments(index)
		}
		this.http.put<User[]>(`${this.USERSURL}/${this.getId(index)}`, user, {responseType: 'json'})
		.subscribe(
			add=>{ 
				this.logUpdate+= `<br>Recipient ${firstName} is created on <i>${this.getDate()}</i><br>`;
				this.users.push(user);
			},
			err=>{
				this.logUpdate+= `<br>Error: recipient ${firstName} is not created<br>`;
			});
	}

	setEditNotify(index: number, statusIsOk: boolean): void{
		if (statusIsOk) {
			this.editNotify= `id no:${this.getId(index)} was edited`;
		} 
		else {
			this.editNotify= `Error: id no:${this.getId(index)} was not edited`;
		}
		this.editNotificationIsOpen= true;
	}

	patch(index: number): void{
		this.logUpdate+= `<br>id no:${this.getId(index)} ${ this.getFirstName(index)} 
		was selected on <i>${this.getDate()}</i><br>`;
	}

	patchName(index: number, firstName: string): void{
		this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`, {"firstName": firstName}, 
		{responseType: 'json'}).subscribe(
			()=>{
				this.setEditNotify(index, true);
				this.logUpdate+= `- ${this.users[index].firstName} is changed to ${firstName}<br>`;
				this.users[index].firstName= firstName;
			}, 
			err =>{ 
				this.logUpdate+= `- error: ${this.users[index].firstName} is not changed<br>`;
				this.setEditNotify(index, false);
			});			
	}

	patchLastname(index: number, lastName: string): void{
		this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`,  {"lastName": lastName}, 
		{responseType: 'json'}).subscribe(
			update=>{
				this.setEditNotify(index, true);
				this.logUpdate+= `- ${this.users[index].lastName} is changed to ${lastName}<br>`;
				this.users[index].lastName= lastName;
			}, 
			err =>{ 
				this.logUpdate+= `- error: ${this.users[index].lastName} is not changed<br>`;
				this.setEditNotify(index, false);
			});
	}

	patchCounty(index: number, country: string): void{
		this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`, {"country": country}, 
		{responseType: 'json'}).subscribe(
			update=>{
				this.setEditNotify(index, true);
				this.logUpdate+= `- ${this.users[index].country} is changed to ${country}<br>`;
				this.users[index].country= country;
			}, 
			err =>{ 
				this.logUpdate+= `- error: ${this.users[index].country} is not changed<br>`;
				this.setEditNotify(index, false);
			});
	}

	patchEmail(index: number, email: string): void{
		this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`, {"email": email}, 
		{responseType: 'json'}).subscribe(
			update=>{
				this.setEditNotify(index, true);
				this.logUpdate+= `- ${this.users[index].email} is changed to ${email}<br>`;
				this.users[index].email= email;
			}, 
			err =>{ 
				this.logUpdate+= `- error: ${this.users[index].email} is not changed<br>`;
				this.setEditNotify(index, false);
			});
	}

	patchPhone(index: number, phone: string): void{
		this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`, {"phone": phone}, 
		{responseType: 'json'}).subscribe(
			update=>{
				this.setEditNotify(index, true);
				this.logUpdate+= `- ${this.users[index].phone} is changed to ${phone}<br>`;
				this.users[index].phone= phone;
			}, 
			err =>{ 
				this.logUpdate+= `- error: ${this.users[index].phone} is not changed<br>`;
				this.setEditNotify(index, false);
			});
		// this.get()
	}

	deleteUser(index: number): void{
		this.http.delete<User[]>(`${this.USERSURL}/${this.getId(index)}`, 
		{responseType: 'json'}).subscribe(
			deleted =>{
				this.deleteNotify= `id no:${this.getId(index)} was deleted`;
				this.logUpdate+=`<p>id no:${this.getId(index)} ${this.users[index].firstName} was 
				deleted on <i>${this.getDate()}</i></p>`
				this.deleteNotificationIsOpen= true;
				this.users.splice(index, 1); 
			}, 
			err =>{ 
				this.logUpdate+= `<p>Error: id no:${this.getId(index)} was not deleted</p>`
				this.deleteNotify= `Error: id no:${this.getId(index)} was not deleted`;
				this.deleteNotificationIsOpen= true;
			 });
	}


	adjustSeconds(seconds: number) {
		if (seconds<= 9) {
		  return '0'+seconds
		} 
		else {
		  return seconds;
		}
	  }
	
	getDate(): string{
		return `${new Date().toDateString()} ${new Date().getHours()}:${new Date().getMinutes()}:${this.adjustSeconds(new Date().getSeconds())}`;
	  }
	
	getId(index: number): number{
		return this.users[index].id
	}

	getFirstName(index: number): string{
		return this.users[index].firstName
	}
	
 	getLastName(index: number): string{
		return this.users[index].lastName
	}
	
 	getCountry(index: number): string{
		return this.users[index].country
	}
	
 	getEmail(index: number): string{
		return this.users[index].email
	}
	
 	getPhone(index: number): string{
		return this.users[index].phone
	}
	
 	getComments(index: number): string{
		return this.users[index].comments
	}

}
