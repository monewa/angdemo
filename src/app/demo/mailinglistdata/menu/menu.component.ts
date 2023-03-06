
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventLogService } from '../../../services/eventlog.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../../demo.component.css']
})
export class MenuComponent implements OnInit {

  eventLogIsOpen: boolean= false

  constructor(protected messenger: EventLogService) { }

  openEventLog(): void{
    this.eventLogIsOpen= true;
  }
  
  ngOnInit(): void {
  }

}
