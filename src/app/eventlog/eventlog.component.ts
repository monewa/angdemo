
import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { EventLogService } from '../services/eventlog.service';

@Component({
  selector: 'app-eventlog',
  templateUrl: './eventlog.component.html',
  styleUrls: ['./eventlog.component.css']
})
export class EventlogComponent implements OnInit {


  @Output('close') IsOpen: EventEmitter<boolean>= new EventEmitter()

  constructor(private log: EventLogService) { }

  get events(): string[] {
    return this.log.events;
  }

  close(): void{
    this.IsOpen.emit(false);
  }

  ngOnInit(): void {
  }

}
