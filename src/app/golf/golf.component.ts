
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SiteManagerService } from '../services/site-manager.service';

@Component({
  selector: 'app-golf-home',
  templateUrl: './golf.component.html',
  styleUrls: ['./golf.component.css' ]
}) 

export class GolfComponent implements AfterViewInit {

  selectedMenu: string= 'Home';
  selectedItem: string= 'Home';
  // selectedItem: string= 'players-data';
  // selectedItem: string= 'tournament-form';
  


  constructor(public site: SiteManagerService) { }

  selectMenu(menu: string, item: string): void{
    this.selectedMenu= menu;
    this.selectedItem= item;
  }

  ngAfterViewInit(){
  }


  
  ngOnInit(): void {
  }
}
