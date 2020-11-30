import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GeneralScheduleComponent} from './schedule-page/general/general-schedule.component';

const routes: Routes = [
  {path: '', component: GeneralScheduleComponent}
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
