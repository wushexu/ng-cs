import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WeekScheduleComponent} from './week-schedule/week-schedule.component';

const routes: Routes = [
  {path: 'ws', component: WeekScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
