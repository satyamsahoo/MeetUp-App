import {
  Component,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {ToastrService} from 'ngx-toastr'
import {
  isSameDay,
  isSameMonth
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarEventAction
} from 'angular-calendar';
import {CookieService} from 'ngx-cookie-service';
import { MeetupService } from '../../meetup.service';
import { SocketService } from '../../socket.service';
import {Router} from '@angular/router';

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
  selector: 'app-user-view-dashboard',
  templateUrl: './user-view-dashboard.component.html',
  styleUrls: ['./user-view-dashboard.component.css']
})
export class UserViewDashboardComponent implements OnInit {


  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  public authToken : any;
  public receiverName : any;
  public receiverId : any;
  public userInfo : any;
  public meetingList = [];
  public events : CalendarEvent[];
  public meetingListOfUser=[];
  public actions: CalendarEventAction[];

  ngOnInit() {
    this.authToken = this.cookieService.get('authToken');
    this.receiverName = this.cookieService.get('receiverName');
    this.receiverId = this.cookieService.get('receiverId');
    this.userInfo = this.meetupService.getUserInformationLocalStorage();
    if(this.userInfo.isAdmin != true){
      this.verifyUserConfirmation();
      this.getAlertFromAdmin();
      this.getAllMeetingsOfUser(this.receiverId);
    } else{
      this.route.navigate(['/dashboard'])
    }

    setInterval(()=>{
      this.meetingReminder();
    },10000);
    
  }

  constructor(private modal: NgbModal,
    private cookieService : CookieService,
    private meetupService : MeetupService,
    private socketService : SocketService ,
    private route:Router,
    private toastr : ToastrService) {}


  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

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

  
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  public verifyUserConfirmation :any =() =>{
    console.log('verifyUserConfirmation  called');
    
    this.socketService.verifyUser().subscribe(
      ()=>{
        this.socketService.setUser(this.authToken);
      }
    )
  }

  public getAllMeetingsOfUser=(userId)=>{
    console.log('getAllMeetingsOfUser clicked')
    this.meetupService.getAllMeetingsOfUser(userId,this.authToken).subscribe((data)=>{

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
      } else if(data.status == 400){
        this.toastr.error(data.message,'Error')
        this.route.navigate(['/server-error']);
      } else if(data.status == 404){
        this.toastr.error(data.message, "Error!");
        this.events = [];
      }
        else{
        this.toastr.error(data.message, "Error!");
        this.events = [];

      }
    })
  }

  public meetingReminder():any{
    let currentTime = new Date().getTime();
    for (let meetingEvent of this.meetingListOfUser) {

      if(isSameDay(meetingEvent.start,currentTime) && new Date(meetingEvent.start).getTime() -currentTime <= 60000){
        this.modalData = { action :'Reminder', event: meetingEvent };
        this.modal.open(this.modalContent, { size: 'lg' });
      }
    }
  }

  public getAlertFromAdmin : any=()=>{
    console.log('getting alert from admin');

    this.socketService.getAlertFromAdmin().subscribe(
      (data)=>{
        //this.getAllUserMeetings();
        this.toastr.info(data.message,'Update');
      }
    )
  }

  public authErrorFunction: any = () => {
      
    this.socketService.authError()
      .subscribe((data) => {
        this.toastr.error(data.message,'Error');
      });//end subscribe
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
          this.toastr.success('Logged Out','Success');
          this.route.navigate(['/login']);
        } else {
          this.route.navigate(['/serverError']);
        } 
      },
      (err) => {
        this.toastr.error(err,'Error');
        this.route.navigate(['/serverError']);
    });

}


}
