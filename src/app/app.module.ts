import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {DriverStandingsComponent} from './driver-standings/driver-standings.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { DriverInfoComponent } from './driver-details/driver-info/driver-info.component';
import { DriverSeasonComponent } from './driver-details/driver-season/driver-season.component';
import {ServerService} from './server.service';

const appRoutes: Routes = [
  { path: '', component: DriverStandingsComponent, children:
    [
      { path: 'driver/:id', component: DriverDetailsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DriverStandingsComponent,
    DriverDetailsComponent,
    DriverInfoComponent,
    DriverSeasonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
