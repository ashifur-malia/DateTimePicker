import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { INgxMyDpOptions, IMyDateModel, IMyDate } from 'ngx-mydatepicker';
import { WeekDay } from '@angular/common';
import { DateType } from './up-anddown-date.directive';
import { ReactiveFormsModule } from '@angular/forms';

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
  ngxOptions: INgxMyDpOptions;

  get viewMonth(): string {
    let month = this.model.month+1;
    let result = this.addLeadingZero(month);
    return result;
  }

  set viewMonth(rhs: string) {
    let month = +rhs -1;
    this.model.month = month;
    console.log(month,'setting month');
  }

  get viewDay(): string{
    let day = this.model.day;
    let result = this.addLeadingZero(day);
    return result;
  }
  
  set viewDay(rhs: string) {
    let day = +rhs;
    this.model.day = day;
  }
  
  constructor() { }

  ngOnInit(): void {
    let today = new Date();
    this.model = { year: today.getFullYear(), month: today.getMonth(), day: today.getDate() };
    this.ngxOptions = { dateFormat: 'dd/MM/YYYY' };
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
    this.viewMonth = event.toString();
    this.valideDate();
  }
  PassedToDoValidateYear(event: number) {
    this.model.year = event;
    this.valideDate();
  }

  addLeadingZero(data: number): string {
    let receivedData = data.toString();
    if (receivedData.length < 2 ) {
      receivedData = '0' + receivedData;
      // console.log(receivedData,'inside method');
      return receivedData;
    }
    if (receivedData.length >= 2) {
      return receivedData;
    }
  }

}
