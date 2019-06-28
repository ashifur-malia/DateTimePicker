import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { UpAnddownDateDirective } from './up-anddown-date.directive';

@NgModule({
  declarations: [
    AppComponent,
    UpAnddownDateDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TextMaskModule,
    NgxMyDatePickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
