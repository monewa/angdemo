
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EventLogService {

	oldValue: string= '';
	newValue: string= '';
	errorMessage: string= '';
	id: number= 0;
	statusIsOk: boolean= false;
	events: string[]= [];

	constructor() { }

	setLogUpdate(oldValue: string, newValue: string, statusIsOk: boolean, errorMessage: string= '',
		logType: string= 'updated', id: number= -1 ): void{
		this.oldValue= oldValue;
		this.newValue= newValue;
		this.statusIsOk= statusIsOk; 
		this.errorMessage= errorMessage;
		this.id= id;
		this.setLogType(logType);
	}

	save(event: string): void{
		this.events.push(event);
	}

	setUpdateLog(): void{
		let event
		if (this.statusIsOk) {
			event= `- ${this.oldValue} was changed to ${this.newValue}<br>`
		} 
		else {
			event= `- error: ${this.oldValue} was not changed <br> <i>(${this.errorMessage})</i><br>`
		}
		this.save(event);
	}
	 
	setDeleteLog(): void{
		let event
	  	if (this.statusIsOk) {
			event= `<br><p>id no:${this.id} ${this.oldValue} was deleted on <i>${this.getDate()}</i></p>`
	  	} 
	  	else {
			event= `<br><p>Error: id no:${this.id} ${this.oldValue} was not deleted <br> on ${this.getDate()} <br> <i>(${this.errorMessage})</i></p>`
	  	}
		this.save(event);
	}
	
	setCreatedLog(): void{
		let event
		if (this.statusIsOk) {
		  event= `<br><p>Recipient ${this.newValue} was created on <i>${this.getDate()}</i></p>`
		} 
		else {
		  event= `<br><p>Error: recipient ${this.newValue} was not created <br> on ${this.getDate()} <br> (${this.errorMessage})</p>`
		}
		this.save(event);
	}

	setSelectedLog(): void{
		let event= `<br>id no:${this.id} ${this.oldValue} was selected on <i>${this.getDate()}</i><br>`
		this.save(event);
	}
	
	setLogType(logType: string= 'updated'): void{
	  if (logType== 'updated') {
		this.setUpdateLog();
	  }
	  if (logType== 'deleted') {
		this.setDeleteLog();
	  }
	  if (logType== 'selected') {
		  this.setSelectedLog();
	  }
	  if (logType== 'created') {
			this.setCreatedLog()
		}
	}
	
	getDate(): string{
		let date= new Date()+'';
		date= date.substring(0, 25);
		return date;
	}

}








