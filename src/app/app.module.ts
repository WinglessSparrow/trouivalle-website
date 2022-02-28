import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    NgxsSelectSnapshotModule,
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: environment.IOC,
  bootstrap: [AppComponent],
})
export class AppModule {}
