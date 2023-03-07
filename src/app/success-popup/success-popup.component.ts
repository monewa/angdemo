
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css', '../demo/demo.component.css']
})
export class SuccessPopupComponent implements OnInit {
  
  
  @Input() title: string= '';
  @Input() details: any[]= [];
  @Input() link: string= '';
  @Output('close') isClosed: EventEmitter<boolean>= new EventEmitter();
  
  constructor(private router: Router) { }

  close(){
    this.isClosed.emit(false);
    if (this.link != '') {
      this.router.navigateByUrl(this.link);
    }
  }

 ngOnInit(): void {    }

}
