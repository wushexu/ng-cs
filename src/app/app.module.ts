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
import {WeekScheduleComponent} from './week-schedule/week-schedule.component';
import {MediaQueryStatusComponent} from './common/media/media-query-status.component';
import {FhComponent} from './fh/fh.component';
import {MenuComponent} from './menu/menu.component';
import {StyleManagerService} from './service/style-manager.service';
import {ThemeService} from './service/theme.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WeekScheduleComponent,
    MediaQueryStatusComponent,
    FhComponent,
    MenuComponent
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
  providers: [StyleManagerService, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
