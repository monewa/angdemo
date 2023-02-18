
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

  constructor(public site: SiteManagerService) { }

  selectMenu(menu: string, item: string): void{
    this.selectedMenu= menu;
    this.selectedItem= item;
  }

  ngAfterViewInit(){
  }

  schedule(){
    if (new Date()< new Date) {
    }
  }
  
  ngOnInit(): void {
  }
}
