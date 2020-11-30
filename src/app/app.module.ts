import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatPaginatorIntl} from '@angular/material/paginator';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

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
import {LessonScheduleComponent} from './schedule/lesson/lesson-schedule.component';
import {DayLessonsComponent} from './schedule/day/day-lessons.component';
import {WeekScheduleComponent} from './schedule/week/week-schedule.component';
import {MonthScheduleComponent} from './schedule/month/month-schedule.component';
import {TermScheduleComponent} from './schedule/term/term-schedule.component';
import {DateLabelPipe} from './common/pipe/date-label.pipe';
import {WeekdayLabelPipe} from './common/pipe/weekday-label.pipe';
import {DayScheduleComponent} from './schedule/day/day-schedule.component';
import {SerialDayScheduleComponent} from './schedule/serial-day/serial-day-schedule.component';
import {DATE_FORMATS, PaginatorIntl} from './common/locale';
import {MonthPickerComponent} from './common/month-picker/month-picker.component';
import { ClassSelectComponent } from './common/class-select/class-select.component';
import {DeptMajorClassService} from './service/dept-major-class.service';
import {TeacherSelectComponent} from './common/teacher-select/teacher-select-component';
import {TeacherCourseService} from './service/teacher-course.service';
import { ClassroomSelectComponent } from './common/classroom-select/classroom-select.component';
import {ClassroomService} from './service/classroom.service';
import {TermWeekService} from './service/term-week.service';
import { TermWeekSelectComponent } from './common/term-week-select/term-week-select.component';

@NgModule({
  declarations: [
    AppComponent,
    TableMatComponent,
    MediaQueryStatusComponent,
    FhComponent,
    LessonScheduleComponent,
    DayLessonsComponent,
    WeekScheduleComponent,
    MonthScheduleComponent,
    TermScheduleComponent,
    DateLabelPipe,
    WeekdayLabelPipe,
    DayScheduleComponent,
    SerialDayScheduleComponent,
    MonthPickerComponent,
    ClassSelectComponent,
    TeacherSelectComponent,
    ClassroomSelectComponent,
    TermWeekSelectComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    AppMaterialModule
  ],
  providers: [
    ScheduleService,
    DeptMajorClassService,
    TeacherCourseService,
    ClassroomService,
    TermWeekService,
    {provide: MatPaginatorIntl, useValue: PaginatorIntl},
    {provide: MAT_DATE_LOCALE, useValue: 'zh-cn'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
