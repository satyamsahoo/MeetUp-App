import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ToastrService} from 'ngx-toastr'
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { SocketService } from '../../socket.service';
import { MeetupService } from '../../meetup.service';
import * as $ from 'jquery';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-admin-view-dashboard',
  templateUrl: './admin-view-dashboard.component.html',
  styleUrls: ['./admin-view-dashboard.component.css']
})
export class AdminViewDashboardComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  public userList=[];
  public meetingListOfUser=[];
  public authToken;
  public receiverName;
  public receiverId;
  public userInfo;
  public events: CalendarEvent[] = [];
  public currentSelectedUser;

  ngOnInit() {
    this.authToken = this.cookieService.get('authToken');
    this.receiverName = this.cookieService.get('receiverName');
    this.receiverId = this.cookieService.get('receiverId');
    this.userInfo = this.meetupService.getUserInformationLocalStorage();
    console.log(this.receiverName);
    this.getAllUsers();

  }

  constructor(private modal: NgbModal,
              private socketService : SocketService,
              private router : Router,
              private meetupService : MeetupService,
              private cookieService : CookieService,
              private toastr : ToastrService) {

                
  }

  

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }   
    }
  ];

  refresh: Subject<any> = new Subject();


  activeDayIsOpen: boolean = false;

  

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart,
    event.end = newEnd
    this.handleEvent('Dropped or Resized',event)
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  public createNewMeeting=()=>{
    this.router.navigate(['/create-meeting']);
  }

  public getAllUsers=()=>{
    this.meetupService.getAllUsers(this.authToken).subscribe((data)=>{
      if(data.status == 200){
        this.userList = data.data;
        console.log(this.userList)
      } else if(data.status == 500){
        this.toastr.error(data.message,'Error');
        this.router.navigate(['/server-error'])
      } else {
        this.toastr.warning('No users present to set meeting with');
      }
    })
  }

  public getAllMeetingsOfUser=(user)=>{
    this.currentSelectedUser = user;
    console.log('getAllMeetingsOfUser clicked')
    this.meetupService.getAllMeetingsOfUser(user.userId,this.authToken).subscribe((data)=>{

      if(data.status ==200){
        this.meetingListOfUser = data.data;
        console.log(this.meetingListOfUser);

        for(let meetingEvent of this.meetingListOfUser){
            meetingEvent.title = meetingEvent.meetingName,
            meetingEvent.start = new Date(meetingEvent.meetingStartTime),
            meetingEvent.end = new Date(meetingEvent.meetingEndTime),
            meetingEvent.color = colors.green,
            meetingEvent.action = this.actions,
            meetingEvent.remindMe = true
          
        }

        this.events = this.meetingListOfUser;
        console.log(this.events)
        this.refresh.next();
        this.toastr.info("Calendar Updated", `Meetings Found!`);
      } else if(data.status == 404){
        this.toastr.warning(data.message);
      } else{
        this.toastr.error(data.message, "Error!");
        this.events = [];
      }
    })
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  public updateMeeting=(meeting)=>{
    console.log('Update meeting called');
    this.router.navigate([`/update-meeting/${meeting.meetingId}`])
  }

  public deleteMeeting=(meeting)=>{
    console.log('Delete meeting called');
    console.log(meeting);
    this.meetupService.deleteMeeting(this.authToken,meeting.meetingId).subscribe((apiResponse)=>{
      if(apiResponse.status == 200){
        console.log(apiResponse.message);
        this.toastr.success('Meeting deleted Successfully','Deleted');
        let dataForNotify = {
          message: `Hi, ${this.receiverName} has canceled the meeting - ${meeting.meetingTopic}. Please Check your Calendar/Email`,
          userId: meeting.participantId
        }
        this.getAllMeetingsOfUser(meeting.memeberId);

        this.notifyUpdatesToUser(dataForNotify);
        
      } else {
        console.log('error occured while deleting.');
        this.toastr.error(apiResponse.message,'Error');
      }
    })
  }

  public notifyUpdatesToUser: any = (data) => {
    this.socketService.notifyUpdate(data);

  }

  public logoutFunction = () => {
    console.log('Logout function called')
    this.meetupService.logout(this.receiverId).subscribe(
      (apiResponse) => {
        if (apiResponse.status == 200) {
          localStorage.clear();
          this.cookieService.delete('authToken');
          this.cookieService.delete('receiverId');
          this.cookieService.delete('receiverName');
          this.socketService.disconnectedSocket();
          this.socketService.exitSocket();
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/serverError']);
        } 
      },
      (err) => {
        this.toastr.error(err,'Error');
        this.router.navigate(['/serverError']);
    });
}

}