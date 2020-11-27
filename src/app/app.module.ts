import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

import {LayoutModule} from '@angular/cdk/layout';
import {AppMaterialModule} from './app-material.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {TableMatComponent} from './week-schedule/table-mat.component';
import {MediaQueryStatusComponent} from './common/media/media-query-status.component';
import {FhComponent} from './fh/fh.component';
import {ThemeSwitchComponent} from './menu/theme-switch.component';
import {StyleManagerService} from './service/style/style-manager.service';
import {ThemeService} from './service/style/theme.service';
import {ScheduleService} from './service/schedule.service';
import { LessionScheduleComponent } from './schedule/lession-schedule/lession-schedule.component';
import { DayScheduleComponent } from './schedule/day-schedule/day-schedule.component';
import { WeekScheduleComponent } from './schedule/week-schedule/week-schedule.component';
import { MonthScheduleComponent } from './schedule/month-schedule/month-schedule.component';
import { TermScheduleComponent } from './schedule/term-schedule/term-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TableMatComponent,
    MediaQueryStatusComponent,
    FhComponent,
    ThemeSwitchComponent,
    LessionScheduleComponent,
    DayScheduleComponent,
    WeekScheduleComponent,
    MonthScheduleComponent,
    TermScheduleComponent
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
  providers: [StyleManagerService, ThemeService, ScheduleService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
