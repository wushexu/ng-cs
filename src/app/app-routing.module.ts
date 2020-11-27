import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TableMatComponent} from './week-schedule/table-mat.component';

const routes: Routes = [
  {path: 'ts', component: TableMatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
