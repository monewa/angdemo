
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
	
	users:any[]= [];
	countries:any[]= [];
	// users:any[]= this.getStaticUserData();
	//USERSURL:string= 'https://monewa.github.io/json-server/maildata.json';
	USERSURL:string= 'assets/data/users.json';
	// USERSURL:string= 'http://localhost:3500/users/';
	// COUNTRIESURL:string= 'http://localhost:3500/countries-codes/';
	COUNTRIESURL:string= 'assets/data/countrydata.json';
	
	
	constructor( private http:HttpClient) { 
		this.get(); 
		this.getCountries();
	}
	
	getCountries(){
		this.http.get<any[]>(this.COUNTRIESURL, {responseType: 'json'}).subscribe(
			(data:any[])=> { this.countries= data; }
		)
	}

	getFromServer():Observable<User[]>{
		return this.http.get<User[]>(this.USERSURL, {responseType: 'json'})
			
	}

	get(){
		this.getFromServer().subscribe( 
				(data:User[])=> { 
					this.users= data; 
					// console.log('get',this.users);
				}
			);
	}
	
	addUser(id:number= -1, firstName:string= '', lastName:string= '', country:string= '', 	email:string= '', phone:string= '', comments:string= ''):void{
		let user= {"id": id,
			"firstName": firstName,
			"lastName": lastName,
			"country": country,
			"email": email,
			"phone": phone,
			"comments": comments
		}
		// this.http.post<User[]>(this.USERSURL, user,	{responseType: 'json'}).subscribe();
			this.users.push(user);
			// this.get()
	}

	putUser(index:number, firstName:string, lastName:string,	country:string, email:string, phone:string):void{
		let user= {"id": '',
			"firstName": firstName,
			"lastName": lastName,
			"country": country,
			"email": email,
			"phone": phone,
			"comments": this.getComments(index)
		}
		this.http.put<User[]>(`${this.USERSURL}/${this.getId(index)}`, user, {responseType: 'json'}).subscribe()
		this.get()
	}

	patchName(index:number, firstName:string):void{
		// this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`, {"firstName": firstName}, {responseType: 'json'}).subscribe()
		this.users[index].firstName= firstName
		this.get()
	}

	patchLastname(index:number, lastName:string):void{
		// this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`,  {"lastName": lastName}, {responseType: 'json'}).subscribe();
		this.users[index].lastName= lastName
		this.get()
	}

	patchCounty(index:number, country:string):void{
		// this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`, {"country": country}, {responseType: 'json'}).subscribe()
		this.users[index].country= country
		this.get()
	}

	patchEmail(index:number, email:string):void{
		// this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`, {"email": email}, {responseType: 'json'}).subscribe();
		this.users[index].email= email
		this.get()
	}

	patchPhone(index:number, phone:string):void{
		// this.http.patch<User[]>(`${this.USERSURL}/${this.getId(index)}`, {"phone": phone}, {responseType: 'json'}).subscribe();
		this.users[index].phone= phone
		this.get()
	}

	deleteUser(index:number):void{
		// this.http.delete<User[]>(`${this.USERSURL}/${this.getId(index)}`, {responseType: 'json'}).subscribe();
		this.users.splice(index, 1)	
	//	this.get()
	}
	
	getId(index:number):number{
		return this.users[index].id
	}

	getFirstName(index:number):string{
		return this.users[index].firstName
	}
	
 	getLastName(index:number):string{
		return this.users[index].lastName
	}
	
 	getCountry(index:number):string{
		return this.users[index].country
	}
	
 	getEmail(index:number):string{
		return this.users[index].email
	}
	
 	getPhone(index:number):string{
		return this.users[index].phone
	}
	
 	getComments(index:number):string{
		return this.users[index].comments
	}

	getStaticUserData(){
	return [{"id":2,"firstName":"Thoho","lastName":"Yandou","country":"RSA","email":"thoho@gmail.com","phone":"+2783 4338670","comments":"like it"},{"id":3,"firstName":"Mary","lastName":"Ann","country":"UK","email":"mary@gmail.com","phone":"+5672 1450697","comments":"love it"},{"id":4,"firstName":"Jane","lastName":"Doring","country":"Australia","email":"jane@gmail.com","phone":"+5674 1434697","comments":"can't wait"},{"id":5,"firstName":"Franco","lastName":"Leon","country":"France","email":"franco@yahoo.com","phone":"+3472 1646334","comments":""},{"id":6,"firstName":"Mario","lastName":"Gotti","country":"Italy","email":"mario@gmail.com","phone":"+3378 8646864","comments":"like it"},{"id":7,"firstName":"Karima","lastName":"Singh","country":"India","email":"karima@gmail.com","phone":"+8370 0664063","comments":"excellent"},{"id":8,"firstName":"Xiao","lastName":"Wang","country":"China","email":"jing@weibo.com","phone":"+6785 0649651","comments":"good read"},{"id":9,"firstName":"Mebo","lastName":"Kamkwamba","country":"Malawi","email":"mebo@yahoo.com","phone":"+9795 4564961","comments":"good work"},{"id":10,"firstName":"Kudjo","lastName":"Omoso","country":"Nigeria","email":"kudjo@yahoo.com","phone":"+9575 4949610","comments":"love this author"}]
	}


}
