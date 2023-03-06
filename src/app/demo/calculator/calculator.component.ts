
import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { Calculator } from '../model/calculator.model';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css', '../demo.component.css']
})
export class CalculatorComponent implements OnInit {


  constructor(private window: WindowService, private model: Calculator) { }

  get mainScreenValue(): string{
    return this.model.toScreenValue
  }

  get otherScreenValue(): string{
    return this.model.toAnswerScreenValue
  }
	
  setValue(num: string): void{
	this.model.setValue(num);
  }
	
  setKeyInput(): void{
	this.model.setKeyInput(document);
  }
  
  calculate(operation: string): void{
	this.model.calculate(operation);
  } 
  
  clearEntry(): void{
	this.model.clearEntry();
  }  

  clearAll(): void{
	this.model.clearAll();
  }  

  ngOnInit(): void {
  	this.window.scrollToTop();
  }
  
}
