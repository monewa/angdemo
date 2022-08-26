
import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css', '../app.component.css']
})
export class CalculatorComponent implements OnInit {

	step: string= 'enter first number';
	answer: number= 0;
	screenValue: string= '';
	toScreenValue= ''
	toAnswerScreenValue= ''
	
	previousSymbol: string= '';
	endOfcalculation: boolean= true;
	acceptedOperators: string[]= ['+', '-', '*', '/', '='];
	acceptedFunctions: string[]= ['Delete', 'Backspace'];

  constructor(private window: WindowService) { }

	restrictValues(num: string): boolean{
		if(this.screenValue.length >= 16){
			return true; 
		}	
		if(this.restrictPeriod(num)){
			return true;
		}
		return false
	}

	restrictPeriod(num: string): boolean{
		if(num == '.'){
			let pos= this.screenValue.indexOf('.');
			if(pos >= 0){
				return true
			}
		}
		return false
	}

	setConditions(num: string){
		if(this.screenValue == '.'){
			this.screenValue = '0.';
		}
		if(this.screenValue == '0'+ num){
			this.screenValue = num;
			if(num == '.'){
				this.screenValue = '0.'
			}
		}
	}
	
	setValue(num: string): void{
		if(this.restrictValues(num)){
			return;
		}
		if(this.endOfcalculation){
			this.endOfcalculation= false;
		}
		this.screenValue+= num;
		this.setConditions(num);
		this.setMainScreen();
	}
	
	validateKeyboardInput(key: string): void{
		let val= parseFloat(key)
		if(isFinite(val) || key == '.'){
				this.setValue(key);
		} 	
		this.acceptedOperators.forEach(
			(o: string)=> {
				if(o == key){
					this.calculate(key);
				}
			})
		this.acceptedFunctions.forEach(
			(f:string)=> {
				if(f == key){
					this.runFunction(key);
				}
			})
	}
	
	setKeyInput(): void{
		document.onkeyup= (keyEvent: KeyboardEvent)=> {
			let key= keyEvent.key;
			this.validateKeyboardInput(key);
		}
	}
		
	clearScreenForNextNum(): void{
		this.clearEntry();
		this.setAnswerScreen();
	}
	
	runOperation(): void{
		let value: number= parseFloat(this.screenValue);
		if(this.previousSymbol == '+'){
			this.answer+= value;
		}
		if(this.previousSymbol == '-'){
			this.answer-= value;
		}
		if(this.previousSymbol == '*'){
			this.answer*= value;
		}
		if(this.previousSymbol == '/'){
			if(this.answer == 0 && value == 0){
				this.answer= Infinity;
				return;
			}
			this.answer/= value;
		}	
		this.answer= parseFloat(this.answer.toPrecision(8));		
	}
	
	restrictCalculation(operation: string): boolean{
		if(this.endOfcalculation){
			return true;
		}
		if(operation == '=' &&this.step == 'enter first number'){
			return true;
		}
		if(this.screenValue == ''){
			if(operation == '='){
				this.runEquals();
				return true;
			}  
			else{ 
				this.previousSymbol= operation;
				this.setAnswerScreen();
				return true;
			}
		}
		return false
	}
	
	calculate(operation: string): void{
		if(this.restrictCalculation(operation)){
			return;
		}	
		if(this.step == 'enter first number'){ 
			this.answer= parseFloat(this.screenValue);
			this.previousSymbol= operation;
			this.step= 'enter next number';
			this.clearScreenForNextNum(); 
			return;
		}
		if(operation == '='){
			this.runOperation();
			this.runEquals();
			return;
		}
		if(this.step == 'enter next number'){ 
			this.runOperation();
			if(!isFinite(this.answer)){
				this.runEquals();
				return;
			}
			this.previousSymbol= operation;
			this.clearScreenForNextNum(); 
		}
	} 

	runEquals(): void{
		if(this.step == 'enter next number'){
			let finalAnswer: number= this.answer;
			this.clearAll();
			this.setMainScreen(finalAnswer);
		}
	}
		
	runFunction(functions: string){
		if(functions == 'Delete'){
			this.clearAll();
		} 
		if(functions == 'Backspace'){
			this.clearEntry();
		} 
	}
	
	clearEntry(): void{
		this.screenValue= '';
		this.setMainScreen();
	}

	clearAll(): void{
		this.step= 'enter first number';
		this.previousSymbol= '';
		this.answer= 0;
		this.endOfcalculation= true;
		this.clearEntry();
		this.setAnswerScreen(' ');
	}
	
	setMainScreen(value:number | string= this.screenValue):void | number{
		this.toScreenValue= value+ '';
	}
	
	setAnswerScreen(value:string | number= this.answer):string{
		this.toAnswerScreenValue=  `${value} ${this.previousSymbol}`
		return  `${value} ${this.previousSymbol}`;
	}

  	ngOnInit(): void {
		this.window.scrollToTop();
  }
  
}
