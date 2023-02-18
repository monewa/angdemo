
import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css', '../demo.component.css']
})
export class ConverterComponent implements OnInit {

	displayValue: string= '';
	toDisplayValue: string= '';
	answerDisplayMessage: string= '';
	unit1: string= '';
	unit2: string= '';
	unitType: string= '';
	steps: string= 'select first unit';
	result: number= 0;
	validValues: string[]= ['Delete', 'Backspace', '=', 'c', 'm', 'f', 'l'];
	
	constructor(private window: WindowService) { }

	restrictNumberInput(num: string): boolean{
		if(this.displayValue.length >= 15){
			return true;
		}
		if(this.restrictPeriod(num)){
			return true;
		}
		if(this.steps != 'type a value'){
			return true;
		}
		if(this.restrictNegative(num)){
			return true;
		}
		return false;
	}

	restrictPeriod(num: string): boolean{
		if(num == '.'){
			let pos= this.displayValue.indexOf('.');
			if(pos >= 0){
				return true
			}
		}
		return false
	}
	
	restrictNegative(num: string): boolean{
		if(num == '-'){
			let pos= this.displayValue.indexOf('-');
			if(pos >= 0){
				return true
			}
			else{
				this.displayValue= '-'+this.displayValue
				this.setDisplay();
				return true;
			}
		}
		return false
	}

	setConditions(num: string){
		if(this.displayValue == '.'){
			this.displayValue= '0.';
		}
		if(this.displayValue== '0'+ num){
			this.displayValue = num;
			if(num == '.'){
				this.displayValue = '0.'
			}
		}
		if(this.displayValue== '-0'+ num){
			this.displayValue = num;
			if(num == '.'){
				this.displayValue = '-0.'
			}
		}
	}

	getNumberInput(num: string): void{
		if(this.restrictNumberInput(num)){
			return;
		}
		this.displayValue+= num;
		this.setConditions(num);
		this.setDisplay();
	}
	
	getValues(val: string): void{
		if(val == 'Delete'){
			this.clearAll();
		}
		if(val == 'Backspace'){
			this.clearDisplay();
		}
		if(val == '='){
			this.run('convert');
		}
		if(val == 'c'){
			this.run('cm');
		}
		if(val == 'm'){
			this.run('m');
		}
		if(val == 'f'){
			this.run('℉');
		}
		if(val == 'l'){
			this.run('℃');
		}
	}
	
	filterKeyValues(key: string): void{
		let val= parseFloat(key)
		if(isFinite(val) || key == '.' || key == '-'){
			this.getNumberInput(key);
		} 	
		this.validValues.forEach(
		(v:string)=> {
			if(v == key){
				this.getValues(key);
			}
		})		
	}
	
	getKeyValues(): void{
		document.onkeyup= (keyEvent: KeyboardEvent)=> {
			let key= keyEvent.key;
			this.filterKeyValues(key);
		}
	}
	
	restrictUnits(): boolean{
		if(this.unit2 == 'cm' || this.unit2 == 'm'){
			if(this.unitType == 'temperature'){
				return true;
			}
		}
		if(this.unit2 == '℉' || this.unit2 == '℃'){
			if(this.unitType == 'length'){
				return true;
			}
		} 
		if(this.unit1 == this.unit2){
			return true;
		}
		return false;
	}
	
	restrictRun(unit: string): boolean{
		if(unit == 'convert'){
			if(this.displayValue == '' || this.steps != 'type a value'){
				return true;
			}
		}
		return false;
	}
	
	updateUnitType(): void{
		if(this.unit1 == 'cm' || this.unit1=='m'){
			this.unitType= 'length';
		}
		if(this.unit1 == '℃' || this.unit1=='℉'){
			this.unitType= 'temperature';
		}
	}
	
	run(unit: string): void{
		if(this.restrictRun(unit)){
			return;
		}
		if(this.steps == 'select first unit'){
			this.unit1= unit;
			this.updateUnitType();
			this.steps= 'select 2nd unit';
			this.answerDisplayMessage= this.unit1+ ' selected';
			this.clearDisplayForNextStep();
			return;
		}
		if(this.steps == 'select 2nd unit'){
			this.unit2= unit;
			if(this.restrictUnits()){
				return;
			}
			this.steps= 'type a value';
			this.answerDisplayMessage= 'convert '+this.unit1 + ' to '+ this.unit2;
			this.clearDisplayForNextStep();
			return;
		}
	    if(unit == 'convert'){
			this.convert();
		}
	}
	
	doConversion(): void{
		let num= parseFloat(this.displayValue);
		if(this.unit1 == 'cm' && this.unit2 == 'm'){
			this.result= num/100;
		}
		if(this.unit1 == 'm' && this.unit2 == 'cm'){
			this.result= num*100;
		}
		
		if(this.unit1 == '℉' && this.unit2 == '℃'){
			this.result= (num*0.55556)-17.778;
		}
		if(this.unit1 == '℃' && this.unit2 == '℉'){
			this.result= 32+ (num * 1.8);
		}
		this.result= parseFloat(this.result.toPrecision(4));
	}
	
	convert(): void{
		this.doConversion();
		let result= this.result+this.unit2;
		this.clearDisplay();
		this.setDisplay(result);
	}
	
	clearDisplayForNextStep(): void{
		this.setAnswerDisplay();
		this.clearDisplay();
		this.setDisplayPlaceholder();
	}
	
	clearDisplay(): void{
		this.displayValue= '';
		this.setDisplay();
	}
	
	clearAll(): void{
		this.steps= 'select first unit';
		this.unit1= '';
		this.unit2= '';
		this.result= 0;
		this.displayValue= '';
		this.answerDisplayMessage= '';
		this.setAnswerDisplay();
		this.setDisplay();
		this.setDisplayPlaceholder();
	}
	
	setAnswerDisplay(value: number | string= this.answerDisplayMessage): string{
		return value+ '';
	}

	setDisplay(value: number | string= this.displayValue): string{
		this.toDisplayValue= value+'';
		return value+'';
	}
	
	setDisplayPlaceholder(value: number | string= this.steps): string{
		return value+'';
	}

	ngOnInit(): void {
		this.window.scrollToTop();
	}

}
