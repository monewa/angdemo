
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuccessPopupService {

    private firstName: string= '';
    private lastName: string= '';
    private country: string= '';
    private email: string= '';
    private phone: string= '';

    constructor() { }

    setDetails(firstName :string, lastName :string, country :string, email :string, phone :string ):void{
      this.firstName= firstName;
      this.lastName = lastName;
      this.country = country;
      this.email = email;
      this.phone = phone;
    }

    getName(): string{
      return this.firstName;
    }

    getLastName(): string{
      return this.lastName;
    }
    
    getCountry(): string{
      return this.country;
    }

    getEmail(): string{
      return this.email;
    }

    getPhone(): string{
      return this.phone;
    }



}
