
export class User{

	id: number= 0;
	firstName: string= '';
	lastName: string= '';
	country: string= '';
	email: string= '';
	phone: string= '';
	comments: string= '';
	
	constructor(id: number= -1, firstName: string= '', lastName: string= '', country: string= '', 
	email: string= '', phone: string= '', comments: string= ''){ 
		this.id= id;
		this.firstName= firstName;
		this.lastName= lastName;
		this.country= country;
		this.email= email;
		this.phone= phone;
		this.comments= comments;
	}
}