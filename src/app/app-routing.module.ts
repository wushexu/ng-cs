import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WeekScheduleComponent} from './schedule/week/week-schedule.component';
import {MonthScheduleComponent} from './schedule/month/month-schedule.component';
import {TermScheduleComponent} from './schedule/term/term-schedule.component';
import {SerialDayScheduleComponent} from './schedule/serial-day/serial-day-schedule.component';
import {DayScheduleComponent} from './schedule/day/day-schedule.component';

const routes: Routes = [
  {path: 'day', component: DayScheduleComponent},
  {path: 'week', component: WeekScheduleComponent},
  {path: 'month', component: MonthScheduleComponent},
  {path: 'term', component: TermScheduleComponent},
  {path: 's', component: SerialDayScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true,
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
