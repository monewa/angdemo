
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

	private editNotify: string= '';
	private deleteNotify: string= '';
	private logUpdate: string= '';
	deleteNotificationIsOpen: boolean= false;
  	editNotificationIsOpen: boolean= false;

	constructor() { }

	setEditNotify(statusIsOk: boolean, id: number): void{
		if (this.editNotificationIsOpen) {
			return;			
		} 
		if (statusIsOk) {
			this.editNotify=`id no:${id} was edited`;
		} 
		else {
			this.editNotify= `Error: id no:${id} was not edited`;
		}
		this.editNotificationIsOpen= true;
	}

	getEditNotify(): string{
		return	this.editNotify;
	}

	setDeleteNotify(statusIsOk: boolean, id: number): void{
		if (this.editNotificationIsOpen) {
			return;			
		} 
		if (statusIsOk) {
			this.deleteNotify=`id no:${id} was deleted`;
		} 
		else {
			this.deleteNotify= `Error: id no:${id} was not deleted`;
		}
		this.deleteNotificationIsOpen= true;
	}

	getDeleteNotify(): string{
		return	this.deleteNotify;
	}

	setLogUpdate(oldValue: string, newValue: string, statusIsOk: boolean, 
		errorMessage: string= '', logType: string= 'updated', id: number= -1 ): void{
		if (logType== 'updated') {
			if (statusIsOk) {
				this.logUpdate+= `- ${oldValue} is changed to ${newValue}<br>`
			} 
			else {
				this.logUpdate+= `- error: ${oldValue} is not changed <i>(${errorMessage})</i><br>`
			}
		}
		if (logType== 'deleted') {
				if (statusIsOk) {
					this.logUpdate+= `<p>id no:${id} ${oldValue} was deleted on <i>${this.getDate()}</i></p>`
				} 
				else {
					this.logUpdate+= `<p>Error: id no:${id} ${oldValue} was not deleted <i>(${errorMessage})</i> on ${this.getDate()}</p>)`
				}
		}
		if (logType== 'selected') {
				this.logUpdate+=
				 `<br>id no:${id} ${oldValue} was selected on <i>${this.getDate()}</i><br>`
				
		}
		if (logType== 'created') {
				if (statusIsOk) {
					this.logUpdate+= `<br>Recipient ${newValue} is created on <i>${this.getDate()}</i><br>`
				} 
				else {
					this.logUpdate+= `<br>Error: recipient ${newValue} is not created (${errorMessage}) on ${this.getDate()}<br>`
				}
		}
		if (logType== 'created-id') {
				if (statusIsOk) {
				} 
				else {
					this.logUpdate+= `<br>Id error (${id}) on ${this.getDate()}<br>`
				}
		}
	}

	getLog(): string{
		return this.logUpdate;
	}

  	adjustSeconds(seconds: number): any {
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

}
