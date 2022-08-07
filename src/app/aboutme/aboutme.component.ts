
import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';


@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css', '../app.component.css']
})
export class AboutmeComponent implements OnInit {

  constructor(private window:WindowService) { }

  ngOnInit(): void {
    this.window.scrollToTop();

  }

}
