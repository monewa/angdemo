
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

	profileCreated:boolean= false;
	
	constructor() { }

	cancelMessage():void{
		this.profileCreated= false;
	}
	
	showSuccessMessage():void{
		this.profileCreated= true;
	}

}
