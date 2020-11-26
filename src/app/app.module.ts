import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {WeekScheduleComponent} from './week-schedule/week-schedule.component';
import { MediaQueryStatusComponent } from './common/media/media-query-status.component';
import {FhComponent} from './fh/fh.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WeekScheduleComponent,
    MediaQueryStatusComponent,
    FhComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
