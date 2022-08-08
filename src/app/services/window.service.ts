
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() { }

  scrollToTop(){
    window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		  });
  }

  scrollToBottom(){
    window.scroll({
			top: 900,
			left: 0,
			behavior: 'smooth'
		  });
  }

}
