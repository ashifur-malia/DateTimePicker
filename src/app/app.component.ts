import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { INgxMyDpOptions, IMyDateModel, IMyDate } from 'ngx-mydatepicker';
import { WeekDay } from '@angular/common';
import { DateType } from './up-anddown-date.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'ngxCalender';
  dateInput = document.getElementById('dateInput');
  selectedDate: any;
  day: number;
  month: number;
  year: number;
  isDateValid: boolean = false;
  model: IMyDate;
  DateType = DateType;

  get viewMonth(): number {
    return this.model.month + 1;
  }

  set viewMonth(rhs: number) {
    this.model.month = rhs - 1;
  }
  
  constructor() { }

  ngOnInit(): void {
    let today = new Date();
    this.model =  { year: today.getFullYear(), month: today.getMonth(), day: today.getDate() };
  }

  onDateChanged(selectedDate: IMyDateModel): void {
    if (selectedDate.date.day === null || selectedDate.date.month === null || selectedDate.date.year ===null) {
      this.isDateValid = false;
    }
    this.model.day = selectedDate.date.day;
    this.model.month = selectedDate.date.month;
    this.model.year = selectedDate.date.year;
    this.valideDate();
  }

  onValidDate(valid: boolean) {
    valid ? this.isDateValid = true : this.isDateValid = false;    
  } 
  
  valideDate() {
    
    if (this.model.day !== null && this.model.month !== null && this.model.year !== null) {
    let validDate = new Date(this.model.year, this.model.month, this.model.day);
      this.model.day = validDate.getDate();
      this.model.month = validDate.getMonth();
    this.model.year = validDate.getFullYear();
    this.isDateValid = true;  
    }    
  }

  PassedToDoValidateDay(event: number) {
    this.model.day = event;
    this.valideDate();
  }
  PassedToDoValidateMonth(event: number) {
    this.viewMonth = event;
    this.valideDate();
  }
  PassedToDoValidateYear(event: number) {
    this.model.year = event;
    this.valideDate();
  }

}
