

import { Injectable } from '@angular/core';
import { Recipient } from './recipient.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class RestDataSource {

    	// readonly SERVER1= 'https://mo-json-api.herokuapp.com';
	// readonly SERVER2= 'http://localhost:3000';
	// readonly  RECIPIENTSURL:string= `${this.SERVER1}/recipients`;
	// readonly  COUNTRIESURL:string= `${this.SERVER1}/countries-codes`;
	// readonly  BOOKSURL:string= `${this.SERVER1}/books`;
	readonly RECIPIENTFILE=  'assets/data/recipients.json';
	readonly COUNTRYFILE=  'assets/data/countrydata.json';
	readonly BOOKSFILE=  'assets/data/books.json';
	readonly RECIPIENTSURL: string= this.RECIPIENTFILE;
	readonly COUNTRIESURL:string= this.COUNTRYFILE;
	readonly BOOKSURL:string= this.BOOKSFILE; 

    constructor( private http:HttpClient) {  }

    getCountries(): Observable<any[]>{
		return	this.http.get<any[]>(this.COUNTRIESURL, {responseType: 'json'})
	}

	getBooks(): Observable<any[]>{		
		return	this.http.get<any[]>(this.BOOKSURL, {responseType: 'json'})
	}

	getRecipients(): Observable<Recipient[]>{
		return this.http.get<Recipient[]>(this.RECIPIENTSURL, {responseType: 'json'})	
	}

    addRecipient(recipient: Recipient): Observable<Recipient>{
		return	this.http.post<Recipient>(this.RECIPIENTSURL, recipient,	{responseType: 'json'})
	}

	putRecipient(id: number, recipient: Recipient): Observable<Recipient>{
		return this.http.put<Recipient>(`${this.RECIPIENTSURL}/${id}`, recipient, {responseType: 'json'})
	}

	patchName(id: number, firstName: string): Observable<Recipient>{
		return this.http.patch<Recipient>(`${this.RECIPIENTSURL}/${id}`, {"firstName": firstName}, 
		{responseType: 'json'})	;	
	}

	patchLastname(id: number, lastName: string): Observable<Recipient>{
		return	this.http.patch<Recipient>(`${this.RECIPIENTSURL}/${id}`,  {"lastName": lastName}, 
		{responseType: 'json'})
	}

	patchCounty(id: number, country: string): Observable<Recipient>{
		return	this.http.patch<Recipient>(`${this.RECIPIENTSURL}/${id}`, {"country": country}, 
		{responseType: 'json'})
	}

	patchEmail(id: number, email: string): Observable<Recipient>{
		return	this.http.patch<Recipient>(`${this.RECIPIENTSURL}/${id}`, {"email": email}, 
		{responseType: 'json'})
	}

	patchPhone(id: number, phone: string): Observable<Recipient>{
		return	this.http.patch<Recipient>(`${this.RECIPIENTSURL}/${id}`, {"phone": phone}, 
		{responseType: 'json'})
	}

	deleteRecipient(id: number): Observable<Recipient>{
		return this.http.delete<Recipient>(`${this.RECIPIENTSURL}/${id}`, {responseType: 'json'})
	}


  }