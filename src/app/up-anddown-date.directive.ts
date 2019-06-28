import { Directive, Input, ElementRef, HostListener, OnInit, Output,EventEmitter } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Directive({
  selector: '[appUpAnddownDate]',
  host: {
    '(focus)': 'onInputFocus($event)',
    '(keydown)': 'onKeydown($event)',
    '(input)': 'onInput($event.target.value)',
  }
})
  
export class UpAnddownDateDirective implements OnInit {

  private elementRef: HTMLInputElement;
  private focused: boolean = false;
  private inputValue: number = null;
  private keyPressed: boolean = false;
  private PressedLeftArrow: boolean = false;
  private PressedRightArrow: boolean = false;
  private PressedUpArrow: boolean = false;
  private PressedDownArrow: boolean = false;
  private dayControl: HTMLInputElement;
  private monthControl: HTMLInputElement;
  private yearControl: HTMLInputElement;
  private inputValid: boolean = false;
  private result: number = 0;
  @Input() dateType: DateType;
  @Output() outputValueChange = new EventEmitter<number>();
  

  ngOnInit(): void {
    this.dayControl = <HTMLInputElement>document.getElementById("dayControl");
    this.monthControl = <HTMLInputElement>document.getElementById("monthControl");
    this.yearControl =<HTMLInputElement> document.getElementById("yearControl");    
  }

  constructor(el: ElementRef) {
    this.elementRef = el.nativeElement;
  }

  onInputFocus() {
    this.elementRef.select();
    this.focused = true;
  }

  onInput(input: string) {
    if (input !== null) {
      this.inputValue = +input;
      this.inputValid = true;
    }
  }

  onKeydown(event: KeyboardEvent) {
    this.onInput(this.elementRef.value);
    if (this.focused && ( event.keyCode === LeftArrowKey || event.keyCode ===  RightArrowKey || event.keyCode ===  UpArrowKey || event.keyCode ===  DownArrowKey)) {
      this.navigationKey(event.keyCode);
      if (this.PressedLeftArrow || this.PressedRightArrow) {
        this.onRightOrLeftArrow();
      }
      if (this.focused && (this.PressedUpArrow || this.PressedDownArrow)) {
        switch (this.dateType) {
          case DateType.day:
            this.keyDownOnDay();
            break;
          case DateType.month:
            this.keyDownOnMonth();
            break;
          case DateType.year:
            this.keyDownOnYear();
            break;
        }
      }
    }    
  }

  navigationKey(keycode: number) {
    if (keycode === LeftArrowKey) {
      this.PressedLeftArrow = true;
      this.PressedRightArrow = false;
      this.PressedUpArrow = false;
      this.PressedDownArrow = false;
    }
    if (keycode === RightArrowKey) {
      this.PressedLeftArrow = false;
      this.PressedRightArrow = true;
      this.PressedUpArrow = false;
      this.PressedDownArrow = false;
    }
    if (keycode === UpArrowKey) {
      this.PressedLeftArrow = false;
      this.PressedRightArrow = false;
      this.PressedUpArrow = true;
      this.PressedDownArrow = false;
    }
    if (keycode === DownArrowKey) {
      this.PressedLeftArrow = false;
      this.PressedRightArrow = false;
      this.PressedUpArrow = false;
      this.PressedDownArrow = true;
    }
  }

  keyDownOnDay() { 
      if (this.PressedUpArrow) {
      this.result = this.inputValue + FirstDayOfMonth;      
      this.outputValueChange.emit(this.result);
    }
      if (this.PressedDownArrow) {
      this.result = this.inputValue - FirstDayOfMonth;
      this.outputValueChange.emit(this.result);
    }
  }

  keyDownOnMonth() {
      if (this.PressedUpArrow) {
      this.result = this.inputValue + 1;
      this.outputValueChange.emit(this.result);
    }
      if (this.PressedDownArrow) {
      this.result = this.inputValue - 1;
      this.outputValueChange.emit(this.result);
    }
  }

  keyDownOnYear() {
      if (this.PressedUpArrow) {
      this.result = this.inputValue + OneYear;
      this.outputValueChange.emit(this.result);
    }
      if (this.PressedDownArrow) {
      this.result = this.inputValue - OneYear;
      this.outputValueChange.emit(this.result);
    }
  }

  onRightOrLeftArrow() {
    if (this.dateType === DateType.day) {
      if (this.PressedRightArrow) {
        this.monthControl.focus();
        this.monthControl.select();
      }
    }
    if (this.dateType === DateType.month) {
      if (this.PressedLeftArrow) {
        this.dayControl.focus();
        this.dayControl.select();
      }
      if (this.PressedRightArrow) {
        this.yearControl.focus();
        this.yearControl.select();
      }      
    }
    if (this.dateType === DateType.year) {
      if (this.PressedLeftArrow) {
        this.monthControl.focus();
        this.monthControl.select();
      }
    }
  } 
}



export enum DateType{
  day=1,
  month=2,
  year=3
}

export const LeftArrowKey: number = 37;
export const RightArrowKey: number = 39;
export const UpArrowKey: number = 38;
export const DownArrowKey: number = 40;
export const TabKey: number = 9;
export const ShiftKey: number = 16;
export const MaxDaysInMonth: number = 31;
export const FirstDayOfMonth: number = 1;
export const FirstMonthOfYear: number = 0;
export const MaxMonthsInYear: number = 11;
export const OneYear: number = 1;


