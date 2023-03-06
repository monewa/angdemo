
import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { Converter } from '../model/converter.model';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css', '../demo.component.css']
})
export class ConverterComponent implements OnInit {
	
	constructor(private model: Converter, private window: WindowService) { }

	
	get mainScreenVal(): string{
		return this.model.toDisplayValue;
	}	

	get smallScreenVal(): string{
		return this.model.setAnswerDisplay();
	}

	get placeholder(): string{
		return this.model.setDisplayPlaceholder();
	}

	getNumberInput(num: string): void{
		this.model.getNumberInput(num);
	}
	
	getKeyValues(): void{
		this.model.getKeyValues()
	}
	
	run(unit: string): void{
		this.model.run(unit);
	}
	
	clearDisplay(): void{
		this.model.clearDisplay();
	}
	
	clearAll(): void{
		this.model.clearAll();
	}

	ngOnInit(): void {
		this.window.scrollToTop();
	}

}
