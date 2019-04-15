import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminViewDashboardComponent } from './admin-view-dashboard/admin-view-dashboard.component';
import { UserViewDashboardComponent } from './user-view-dashboard/user-view-dashboard.component';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {  NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { ServerErrorComponent } from '../server-error/server-error.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'dashboard',component:UserViewDashboardComponent,pathMatch:'full'},
      {path:'admin-dashboard',component:AdminViewDashboardComponent,pathMatch:'full'},
      {path:'server-error',component:ServerErrorComponent},
      {path:'page-not-found',component:PageNotFoundComponent}
    ]),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide : DateAdapter,
      useFactory : adapterFactory,
      
    }),
    NgbModalModule.forRoot()
  ],
  declarations: [AdminViewDashboardComponent, UserViewDashboardComponent]
})
export class DashboardModule { }
