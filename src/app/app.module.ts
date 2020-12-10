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
import {FlatTableScheduleComponent} from './schedule/flat-table/flat-table-schedule.component';
import {MediaQueryStatusComponent} from './common/media/media-query-status.component';
import {ScheduleService} from './service/schedule.service';
import {LessonScheduleComponent} from './schedule/lesson/lesson-schedule.component';
import {DayLessonsComponent} from './schedule/day/day-lessons.component';
import {WeekScheduleComponent} from './schedule/week/week-schedule.component';
import {MonthScheduleComponent} from './schedule/month/month-schedule.component';
import {TermScheduleComponent} from './schedule/term/term-schedule.component';
import {DateLabelPipe} from './common/pipe/date-label.pipe';
import {WeekdayLabelPipe} from './common/pipe/weekday-label.pipe';
import {DayScheduleComponent} from './schedule/day/day-schedule.component';
import {DayScheduleSerialComponent} from './schedule/day-serial/day-schedule-serial.component';
import {DATE_FORMATS, PaginatorIntl} from './config';
import {MonthPickerComponent} from './common/month-picker/month-picker.component';
import {ClassSelectComponent} from './common/class-select/class-select.component';
import {ClassService} from './service/class.service';
import {TeacherSelectComponent} from './common/teacher-select/teacher-select-component';
import {TeacherService} from './service/teacher.service';
import {ClassroomSelectComponent} from './common/classroom-select/classroom-select.component';
import {ClassroomService} from './service/classroom.service';
import {TermWeekService} from './service/term-week.service';
import {TermWeekSelectComponent} from './common/term-week-select/term-week-select.component';
import {SinglePerspectiveQueryComponent} from './schedule-page/single-perspective-query/single-perspective-query.component';
import {TermSelectComponent} from './common/term-select/term-select.component';
import {DatePickerComponent} from './common/date-picker/date-picker.component';
import {PerspectiveMenuComponent} from './common/perspective-menu/perspective-menu.component';
import {TimeScopeMenuComponent} from './common/time-scope-menu/time-scope-menu.component';
import {DateMdPipe} from './common/pipe/date-md.pipe';
import {MonthScheduleChartComponent} from './schedule/month-chart/month-schedule-chart.component';
import {TermScheduleChartComponent} from './schedule/term-chart/term-schedule-chart.component';
import {ScheduleStatisComponent} from './schedule-page/statistic/schedule-statis.component';
import {MainMenuComponent} from './common/menu/main-menu.component';
import {CompleteQueryComponent} from './schedule-page/complete-query/complete-query.component';
import {DeptMajorSelectComponent} from './common/dept-major-select/dept-major-select.component';
import {DeptSelectComponent} from './common/dept-select/dept-select.component';
import {ClassYearSelectComponent} from './common/class-year-select/class-year-select.component';
import {ScheduleDateLabelPipe} from './common/pipe/schedule-date-label.pipe';
import {CourseSelectComponent} from './common/course-select/course-select.component';
import {CourseCateSelectComponent} from './common/course-cate-select/course-cate-select.component';
import {LessonSelectComponent} from './common/lesson-select/lesson-select.component';
import {CourseService} from './service/course.service';
import {DeptMajorService} from './service/dept-major.service';
import {StatisticTableComponent} from './schedule/statistic-table/statistic-table.component';
import {MonthStatisChartComponent} from './schedule/month-statis-chart/month-statis-chart.component';
import {TermStatisChartComponent} from './schedule/term-statis-chart/term-statis-chart.component';
import { DailySummaryStatisComponent } from './schedule-page/summary-statistic/daily-summary-statis.component';
import { SummaryCardComponent } from './common/summary-card/summary-card.component';
import {SummaryStatisticService} from './service/summary-statistic.service';
import {StatisticTableDialogComponent} from './schedule/statistic-table/statistic-table-dialog.component';

@NgModule({
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
  declarations: [
    AppComponent,
    FlatTableScheduleComponent,
    MediaQueryStatusComponent,
    LessonScheduleComponent,
    DayLessonsComponent,
    WeekScheduleComponent,
    MonthScheduleComponent,
    TermScheduleComponent,
    DateMdPipe,
    DateLabelPipe,
    WeekdayLabelPipe,
    ScheduleDateLabelPipe,
    DayScheduleComponent,
    DayScheduleSerialComponent,
    MonthPickerComponent,
    ClassSelectComponent,
    TeacherSelectComponent,
    ClassroomSelectComponent,
    TermWeekSelectComponent,
    TermSelectComponent,
    SinglePerspectiveQueryComponent,
    DatePickerComponent,
    PerspectiveMenuComponent,
    TimeScopeMenuComponent,
    MonthScheduleChartComponent,
    TermScheduleChartComponent,
    ScheduleStatisComponent,
    MainMenuComponent,
    CompleteQueryComponent,
    DeptMajorSelectComponent,
    DeptSelectComponent,
    ClassYearSelectComponent,
    FlatTableScheduleComponent,
    CourseSelectComponent,
    CourseCateSelectComponent,
    LessonSelectComponent,
    StatisticTableComponent,
    MonthStatisChartComponent,
    TermStatisChartComponent,
    DailySummaryStatisComponent,
    SummaryCardComponent,
    StatisticTableDialogComponent
  ],
  entryComponents: [StatisticTableDialogComponent],
  providers: [
    ScheduleService,
    SummaryStatisticService,
    DeptMajorService,
    ClassService,
    TeacherService,
    CourseService,
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
