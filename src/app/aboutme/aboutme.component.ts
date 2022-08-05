
import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css', '../app.component.css']
})
export class AboutmeComponent implements OnInit {

  constructor(private window:WindowService, private router:Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl("/aboutme")
    this.window.scrollToTop();

  }

}
