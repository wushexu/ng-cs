import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ScheduleQueryComponent} from './schedule-page/query/schedule-query.component';
import {ScheduleStatisComponent} from './schedule-page/statis/schedule-statis.component';

const routes: Routes = [
  {path: 'query', component: ScheduleQueryComponent},
  {path: 'cl/:class-idc', component: ScheduleQueryComponent},
  {path: 'tc/:teacher-idc', component: ScheduleQueryComponent},
  {path: 'cr/:classroom-id', component: ScheduleQueryComponent},
  {path: 'statis', component: ScheduleStatisComponent}
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
