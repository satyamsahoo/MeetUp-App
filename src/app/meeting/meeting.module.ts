import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { UpdateMeetingComponent } from './update-meeting/update-meeting.component';
import {RouterModule} from '@angular/router';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {FormsModule} from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ServerErrorComponent } from '../server-error/server-error.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'create-meeting',component:CreateMeetingComponent,pathMatch:'full'},
      {path :'update-meeting/:meetingId',component:UpdateMeetingComponent,pathMatch:'full'},
      {path:'server-error',component:ServerErrorComponent},
      {path:'page-not-found',component:PageNotFoundComponent}
    ]),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    FilterPipeModule
  ],
  declarations: [CreateMeetingComponent, UpdateMeetingComponent],
  
})
export class MeetingModule { }
