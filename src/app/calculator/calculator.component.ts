import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css', '../app.component.css']
})
export class CalculatorComponent implements OnInit {

	step:string= 'enter first number';
	answer:number= 0;
	screenValue:string= '';
	toScreenValue= ''
	toAnswerScreenValue= ''
	
	previousSymbol:string= '';
	periodIsPressed:boolean= false;
	endOfcalculation:boolean= true;
	acceptedOperators:string[]= ['+', '-', '*', '/', '='];
	acceptedFunctions:string[]= ['Delete', 'Backspace'];

  constructor() { }

	restrictValues(num:string):boolean{
		if(num== '0' && this.screenValue== '0'){
			return true;
		}
		if(this.screenValue.length >= 16){
			return true; 
		}	
		if(num=='.' && this.periodIsPressed){
			return true;
		}
		if(num=='.'){
			this.periodIsPressed=true;
		}
		return false
	}
	
	setValue(num:string):void{
		if(this.restrictValues(num)){
			return;
		}
		if(this.endOfcalculation){
			this.endOfcalculation= false;
		}
		this.screenValue+=num;
		if(this.screenValue=='.'){
			this.screenValue='0.';
		}
		this.setMainScreen();
	}
	
	validateKeyboardInput(key:string):void{
		let val= parseFloat(key)
		if( isFinite(val) || key== '.'){
				this.setValue(key);
		} 	
		this.acceptedOperators.forEach(
			(o:string)=> {
				if(o==key){
					this.calculate(key);
				}
			})
		this.acceptedFunctions.forEach(
			(f:string)=> {
				if(f==key){
					this.runFunction(key);
				}
			})
	}
	
	setKeyInput():void{
		document.onkeyup= (keyEvent:KeyboardEvent)=> {
			let key= keyEvent.key;
			this.validateKeyboardInput(key);
		}
	}
		
	clearScreenForNextNum():void{
		this.clearEntry();
		this.setAnswerScreen();
	}
	
	runOperation():void{
		let value:number= parseFloat(this.screenValue);
		if(this.previousSymbol== '+'){
			this.answer+= value;
		}
		if(this.previousSymbol== '-'){
			this.answer-= value;
		}
		if(this.previousSymbol== '*'){
			this.answer*= value;
		}
		if(this.previousSymbol== '/'){
			if(this.answer== 0 && value== 0){
				this.answer= Infinity;
				return;
			}
			this.answer/= value;
		}	
		this.answer= parseFloat(this.answer.toPrecision(8));		
	}
	
	restrictCalculation(operation:string):boolean{
		if(this.endOfcalculation){
			return true;
		}
		if(operation== '=' &&this.step== 'enter first number'){
			return true;
		}
		if(this.screenValue== ''){
			if(operation== '='){
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
	
	calculate(operation:string):void{
		if(this.restrictCalculation(operation)){
			return;
		}	
		if(this.step== 'enter first number'){ 
			this.answer= parseFloat(this.screenValue);
			this.previousSymbol= operation;
			this.step= 'enter next number';
			this.clearScreenForNextNum(); 
			return;
		}
		if(operation== '='){
			this.runOperation();
			this.runEquals();
			return;
		}
		if(this.step== 'enter next number'){ 
			this.runOperation();
			if(!isFinite(this.answer)){
				this.runEquals();
				return;
			}
			this.previousSymbol= operation;
			this.clearScreenForNextNum(); 
		}
	} 

	runEquals():void{
		if(this.step== 'enter next number'){
			let finalAnswer:number= this.answer;
			this.clearAll();
			this.setMainScreen(finalAnswer);
		}
	}
		
	runFunction(functions:string){
		if(functions=='Delete'){
			this.clearAll();
		} 
		if(functions=='Backspace'){
			this.clearEntry();
		} 
	}
	
	clearEntry():void{
		this.periodIsPressed=false;
		this.screenValue='';
		this.setMainScreen();
	}

	clearAll():void{
		this.step= 'enter first number';
		this.previousSymbol= '';
		this.answer= 0;
		this.endOfcalculation= true;
		this.clearEntry();
		this.setAnswerScreen(' ');
	}
	
	setMainScreen(value:number|string= this.screenValue):void|number{
		this.toScreenValue= value+'';
	}
	
	setAnswerScreen(value:string|number= this.answer):string{
		this.toAnswerScreenValue=  `${value} ${this.previousSymbol}`
		return  `${value} ${this.previousSymbol}`;
	}

  ngOnInit(): void {
  }
  
}
