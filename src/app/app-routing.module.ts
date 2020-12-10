import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SinglePerspectiveQueryComponent} from './schedule-page/single-perspective-query/single-perspective-query.component';
import {ScheduleStatisComponent} from './schedule-page/statistic/schedule-statis.component';
import {CompleteQueryComponent} from './schedule-page/complete-query/complete-query.component';
import {DailySummaryStatisComponent} from './schedule-page/summary-statistic/daily-summary-statis.component';

const routes: Routes = [
  {path: 'query', component: SinglePerspectiveQueryComponent},
  {path: 'query-cl/:class-idc', component: SinglePerspectiveQueryComponent},
  {path: 'query-tc/:teacher-idc', component: SinglePerspectiveQueryComponent},
  {path: 'query-cr/:classroom-id', component: SinglePerspectiveQueryComponent},
  {path: 'query-g', component: CompleteQueryComponent},
  {path: 'statis-g', component: ScheduleStatisComponent},
  {path: 'statis', component: DailySummaryStatisComponent}
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
