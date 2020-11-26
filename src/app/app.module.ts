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
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {WeekScheduleComponent} from './week-schedule/week-schedule.component';
import {MediaQueryStatusComponent} from './common/media/media-query-status.component';
import {FhComponent} from './fh/fh.component';
import { MenuComponent } from './menu/menu.component';
import { StyleManagerService } from './service/style-manager.service';
import { ThemeService } from './service/theme.service';

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
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    HttpClientModule
  ],
  providers: [StyleManagerService, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
