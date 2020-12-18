import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SinglePerspectiveQueryComponent} from './schedule-page/single-perspective-query/single-perspective-query.component';
import {ScheduleStatisComponent} from './schedule-page/statistic/schedule-statis.component';
import {CompleteQueryComponent} from './schedule-page/complete-query/complete-query.component';
import {DailySummaryStatisComponent} from './schedule-page/summary-statistic/daily-summary-statis.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'query', component: SinglePerspectiveQueryComponent},
  {path: 'class/:class-idc', component: SinglePerspectiveQueryComponent, data: {perspective: 'class', perspectiveFixed: true}},
  {path: 'teacher/:teacher-idc', component: SinglePerspectiveQueryComponent, data: {perspective: 'teacher', perspectiveFixed: true}},
  {path: 'classroom/:classroom-id', component: SinglePerspectiveQueryComponent, data: {perspective: 'classroom', perspectiveFixed: true}},
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
