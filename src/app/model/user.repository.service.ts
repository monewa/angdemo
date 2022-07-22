
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
	
	users:User[]= [];
	JSONURL:string= '../../assets/maildata.json';
	output:string= '';
	
	constructor( private http:HttpClient) { 
		this.getFromServer(); 
		this.addUser(new User(5, 'ret'));
		console.error('deleted:', this.users);
	}
	
	getFromServer(){
		this.http.get<User[]>(this.JSONURL, {responseType: 'json'}).
			subscribe( 
				(data:User[])=> { 
					this.users= data;
				}
			);
	}
	
	getJSONData():string{
		return JSON.stringify(this.users, null, 3);
	}
	// , {headers:httpHeader}
	addUser(user:any):void{
		this.users.push(user);
		const httpHeader = new HttpRequest('JSONP', this.JSONURL);
		this.http.post(this.JSONURL, this.getJSONData())
		// .
		// pipe(map((response: Response) => {return response;}));
	}
  	
	deleteUser(index:number):void{
		this.http.delete(`${this.JSONURL}/${this.users[index].id}`).subscribe(
			data => 
				console.error('deleted:', this.users[index].firstName)
			);
		this.users.splice(index, 1);
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
	  	
 	setFirstname(index:number, name:string):void{
		this.users[index].firstName= name;
	}
	  	
 	setLastname(index:number, name:string):void{
		this.users[index].lastName= name;
	}
	  	
 	setCountry(index:number, country:string):void{
		this.users[index].country= country;
	}
	
	setEmail(index:number, email:string):void{
		this.users[index].country= email;
	}
		
	setPhone(index:number, phone:string):void{
		this.users[index].country= phone;
	}
	  
}
