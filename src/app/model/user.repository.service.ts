
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
	
	users: any[]= [];
	countries: any[]= [];
	books:any[]= [];
	SERVER1= 'https://mo-json-api.herokuapp.com';
	SERVER2= 'http://localhost:3000';
	USERFILE=  'assets/data/recipients.json';
	COUNTRYFILE=  'assets/data/countrydata.json';
	BOOKSFILE=  'assets/data/books.json';
	USERSURL:string= `${this.SERVER1}/recipients`;
	COUNTRIESURL:string= `${this.SERVER1}/countries-codes/`;
	BOOKSURL:string= `${this.SERVER1}/books`;
	// USERSURL: string= this.USERFILE;
	// COUNTRIESURL:string= this.COUNTRYFILE;
	// BOOKSURL:string= this.BOOKSFILE; 
	
	constructor( private http:HttpClient) { 
		this.get(); 
		this.getCountries();
		this.getBooks();
	}

	getCountries(){
		this.http.get<any[]>(this.COUNTRIESURL, {responseType: 'json'}).subscribe(
			(data:any[])=> { this.countries= data; }
		)
	}

	getBooks(){
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
					// console.log('get',this.users);
				}
			);
	}
	
	addUser(id: number= -1, firstName: string= '', lastName: string= '', country: string= '', 	email: string= '', phone: string= '', comments: string= ''): void{
		let user= {"id": id,
			"firstName": firstName,
			"lastName": lastName,
			"country": country,
			"email": email,
			"phone": phone,
			"comments": comments
		}
		this.http.post<User[]>(this.USERSURL, user,	{responseType: 'json'}).subscribe();
			this.users.push(user);
			// this.get()
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
		this.http.put<User[]>(`${this.USERSURL}/${this.getId(index)}`, user, {responseType: 'json'}).subscribe()
		this.get();
	}

	patchName(index: number, firstName: string): void{
		this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`, {"firstName": firstName}, {responseType: 'json'}).subscribe(
			()=>{
				this.users[index].firstName= firstName
			}
		)
		// this.get()
	}

	patchLastname(index: number, lastName: string): void{
		this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`,  {"lastName": lastName}, {responseType: 'json'}).subscribe(
			update=>{
				this.users[index].lastName= lastName
			}
		);
		// this.get();
	}

	patchCounty(index: number, country: string): void{
		this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`, {"country": country}, {responseType: 'json'}).subscribe(
			update=>{
				this.users[index].country= country
			}
		)
		// this.get()
	}

	patchEmail(index: number, email: string):void{
		this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`, {"email": email}, {responseType: 'json'}).subscribe();
		this.users[index].email= email
		// this.get()
	}

	patchPhone(index: number, phone: string):void{
		this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`, {"phone": phone}, {responseType: 'json'}).subscribe(
			update=>{
				this.users[index].phone= phone
			}
		);
		// this.get()
	}

	deleteUser(index: number):void{
		this.http.delete<User[]>(`${this.USERSURL}/${this.getId(index)}`, {responseType: 'json'}).subscribe(
			deleted=>{
				this.users.splice(index, 1)	
			}
		);
	//	this.get()
	}
	
	getId(index: number):number{
		return this.users[index].id
	}

	getFirstName(index: number):string{
		return this.users[index].firstName
	}
	
 	getLastName(index: number):string{
		return this.users[index].lastName
	}
	
 	getCountry(index: number):string{
		return this.users[index].country
	}
	
 	getEmail(index: number):string{
		return this.users[index].email
	}
	
 	getPhone(index: number):string{
		return this.users[index].phone
	}
	
 	getComments(index: number):string{
		return this.users[index].comments
	}

}
