import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SuiModule} from 'ng2-semantic-ui';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FhComponent} from './fh/fh.component';
import {ScheduleService} from './service/schedule.service';
import {LessonScheduleComponent} from './schedule/lesson-schedule/lesson-schedule.component';
import {DayScheduleComponent} from './schedule/day-schedule/day-schedule.component';
import {WeekScheduleComponent} from './schedule/week-schedule/week-schedule.component';
import {MonthScheduleComponent} from './schedule/month-schedule/month-schedule.component';
import {TermScheduleComponent} from './schedule/term-schedule/term-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    FhComponent,
    LessonScheduleComponent,
    DayScheduleComponent,
    WeekScheduleComponent,
    MonthScheduleComponent,
    TermScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SuiModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
