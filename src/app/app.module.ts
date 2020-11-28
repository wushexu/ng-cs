import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

import {LayoutModule} from '@angular/cdk/layout';
import {AppMaterialModule} from './app-material.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TableMatComponent} from './week-schedule/table-mat.component';
import {MediaQueryStatusComponent} from './common/media/media-query-status.component';
import {FhComponent} from './fh/fh.component';
import {ScheduleService} from './service/schedule.service';
import { LessonScheduleComponent } from './schedule/lesson-schedule/lesson-schedule.component';
import { DayScheduleComponent } from './schedule/day-schedule/day-schedule.component';
import { WeekScheduleComponent } from './schedule/week-schedule/week-schedule.component';
import { MonthScheduleComponent } from './schedule/month-schedule/month-schedule.component';
import { TermScheduleComponent } from './schedule/term-schedule/term-schedule.component';
import {DateLabelPipe} from './common/pipe/date-label.pipe';
import {WeekdayLabelPipe} from './common/pipe/weekday-label.pipe';
import {DayScheduleTableComponent} from './schedule/day-schedule-table/day-schedule-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TableMatComponent,
    MediaQueryStatusComponent,
    FhComponent,
    LessonScheduleComponent,
    DayScheduleComponent,
    WeekScheduleComponent,
    MonthScheduleComponent,
    TermScheduleComponent,
    DateLabelPipe,
    WeekdayLabelPipe,
    DayScheduleTableComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    AppMaterialModule
  ],
  providers: [ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
