import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WeekScheduleComponent} from './schedule/week/week-schedule.component';
import {MonthScheduleComponent} from './schedule/month/month-schedule.component';
import {TermScheduleComponent} from './schedule/term/term-schedule.component';

const routes: Routes = [
  {path: 'class/week', component: WeekScheduleComponent, data: {perspective: 'class'}},
  {path: 'teacher/week', component: WeekScheduleComponent, data: {perspective: 'teacher'}},
  {path: 'room/week', component: WeekScheduleComponent, data: {perspective: 'room'}},
  {path: 'class/month', component: MonthScheduleComponent, data: {perspective: 'class'}},
  {path: 'teacher/month', component: MonthScheduleComponent, data: {perspective: 'teacher'}},
  {path: 'room/month', component: MonthScheduleComponent, data: {perspective: 'room'}},
  {path: 'class/term', component: TermScheduleComponent, data: {perspective: 'class'}},
  {path: 'teacher/term', component: TermScheduleComponent, data: {perspective: 'teacher'}},
  {path: 'room/term', component: TermScheduleComponent, data: {perspective: 'room'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true,
    // useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
