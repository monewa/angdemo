

import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SiteManagerService{

	activeSite: string= 'home';

    switchSite(openSite: string){
		this.activeSite= openSite;
	}

}