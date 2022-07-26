
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
	// JSONURL:string= 'assets/maildata.json';
	JSONURL:string= 'http://localhost:3500/users/';
	output:string= '';
	
	constructor( private http:HttpClient) { 
		this.getFromServer(); 
		this.addUser(new User(5, 'ret'));
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
	//	const httpHeader = new HttpRequest('JSONP', this.JSONURL);
		this.http.post(this.JSONURL, this.getJSONData())
		.subscribe(
			data => 
				console.log('added:', user)
			);
	//	. pipe(map((response: Response) => {return response;}));
	}
  	
	deleteUser(index:number):void{
		this.http.delete(`${this.JSONURL}/${this.users[index].id}`)
		.subscribe(
			data => 
				console.error('deleted:', this.users[index].firstName)
			);
		this.users.splice(index, 1);
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
		this.users[index].email= email;
	}
		
	setPhone(index:number, phone:string):void{
		this.users[index].phone= phone;
	}
	
	countryList:string[] = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China", "Central African Republic", "Colombia", "Comoros", "Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Cyprus","Czech Republic", "Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Greenland","Grenada","Guam","Guatemala","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico", "Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique", "Myanmar", "Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea ","Norway","Oman","Pakistan","Palestine","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Romania","Russia","Rwanda","Samoa","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia", "Solomon Islands","Somalia","South Africa","South Korea"," South Sudan","Spain","Sri Lanka","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
	  
}
