
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
	// readonly SERVER1= 'https://mo-json-api.herokuapp.com';
	// readonly SERVER2= 'http://localhost:3000';
	// readonly  USERSURL:string= `${this.SERVER1}/recipients`;
	// readonly  COUNTRIESURL:string= `${this.SERVER1}/countries-codes`;
	// readonly  BOOKSURL:string= `${this.SERVER1}/books`;
	readonly USERFILE=  'assets/data/recipients.json';
	readonly COUNTRYFILE=  'assets/data/countrydata.json';
	readonly BOOKSFILE=  'assets/data/books.json';
	readonly USERSURL: string= this.USERFILE;
	readonly COUNTRIESURL:string= this.COUNTRYFILE;
	readonly BOOKSURL:string= this.BOOKSFILE; 
	
	constructor( private http:HttpClient) { 
		this.getUsers();
	}

	getCountries(): Observable<any[]>{
		return	this.http.get<any[]>(this.COUNTRIESURL, {responseType: 'json'})
	}

	getBooks(): Observable<any[]>{		
		return	this.http.get<any[]>(this.BOOKSURL, {responseType: 'json'})
	}

	getUsers(): Observable<User[]>{
		return this.http.get<User[]>(this.USERSURL, {responseType: 'json'})	
	}
	
	addUser(id: number, firstName: string= '', lastName: string= '', country: string= '', 
	email: string= '', phone: string= '', comments: string= ''): Observable<User[]>{
		let user= {"id": id,
			"firstName": firstName,
			"lastName": lastName,
			"country": country,
			"email": email,
			"phone": phone,
			"comments": comments
		}
		return	this.http.post<User[]>(this.USERSURL, user,	{responseType: 'json'})
	}

	putUser(id: number, firstName: string, lastName: string,	country: string, email: string,
		phone: string): void{
		let user= {"id": '',
			"firstName": firstName,
			"lastName": lastName,
			"country": country,
			"email": email,
			"phone": phone,
			// "comments": this.getComments(index)
		}
		this.http.put<User[]>(`${this.USERSURL}/${id}`, user, {responseType: 'json'})
	}

	patchName(id: number, firstName: string): Observable<User[]>{
		return this.http.patch<User[]>(`${this.USERSURL}/${id}`, {"firstName": firstName}, 
		{responseType: 'json'})	;	
	}

	patchLastname(id: number, lastName: string): Observable<User[]>{
		return	this.http.patch<User[]>(`${this.USERSURL}/${id}`,  {"lastName": lastName}, 
		{responseType: 'json'})
	}

	patchCounty(id: number, country: string): Observable<User[]>{
		return	this.http.patch<User[]>(`${this.USERSURL}/${id}`, {"country": country}, 
		{responseType: 'json'})
	}

	patchEmail(id: number, email: string): Observable<User[]>{
		return	this.http.patch<User[]>(`${this.USERSURL}/${id}`, {"email": email}, 
		{responseType: 'json'})
	}

	patchPhone(id: number, phone: string): Observable<User[]>{
		return	this.http.patch<User[]>(`${this.USERSURL}/${id}`, {"phone": phone}, 
		{responseType: 'json'})
	}

	deleteUser(id: number): Observable<User[]>{
		return this.http.delete<User[]>(`${this.USERSURL}/${id}`, {responseType: 'json'})
	}
	
 	getComments(index: number): string{
		return this.users[index].comments
	}

}
