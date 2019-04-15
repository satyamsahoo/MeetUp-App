import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MeetupService } from '../../meetup.service';
import {Router} from '@angular/router';
import { SocketService } from '../../socket.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-meeting',
  templateUrl: './update-meeting.component.html',
  styleUrls: ['./update-meeting.component.css']
})
export class UpdateMeetingComponent implements OnInit {

  public meetingTitle:any;
  public meetingDescription : any;
  public meetingPlace :any;
  public meetingOrganiserName :any;
  public meetingOrganiserId :any;
  public meetingStartTime : Date;
  public meetingEndTime : Date;
  public meetingMembers : any=[];
  public memberName:any;
  public memberId:any;
  public memberEmail:any;
  public authToken : any;
  public userId : any;
  public userName : any;
  public allUsers :any;
  public userDetails : any;
  public meetingId : any;
  public meetingData : any;

  constructor(private cookieService:CookieService,
              private toastr: ToastrService,
              private meetupService: MeetupService,
              private router: Router,
              private socketService : SocketService,
              private _route:ActivatedRoute) { }

  ngOnInit() {
    this.authToken = this.cookieService.get('authToken');
    this.userId = this.cookieService.get('receiverId');
    this.userName = this.cookieService.get('receiverName');
    this.meetingOrganiserName = this.userName;
    this.meetingOrganiserId = this.userId;
    this.userDetails = this.meetupService.getUserInformationLocalStorage();
    this.meetingId = this._route.snapshot.paramMap.get('meetingId');
    this.getMeetingById();
  }

  public getMeetingById=()=>{
    console.log('getMeetingById called');
    this.meetupService.getMeetingById(this.meetingId,this.authToken).subscribe((apiResponse)=>{
      if(apiResponse.status==200){
        this.meetingData = apiResponse.data;
        this.meetingTitle = this.meetingData.meetingName;
        this.meetingDescription = this.meetingData.meetingDescription;
        this.meetingPlace = this.meetingData.meetingPlace;
        this.meetingStartTime = this.meetingData.meetingStartTime;
        this.meetingEndTime = this.meetingData.meetingEndTime;
        this.memberName = this.meetingData.memberName;
        this.meetingOrganiserName = this.meetingData.meetingOrganiserName;
        this.memberId = this.meetingData.memberId;
        this.memberName = this.meetingData.memberName;
        this.meetingOrganiserId = this.meetingData.meetingOrganiserId;
        console.log(this.meetingData);

      } else if(apiResponse.status == 400){
        this.toastr.error(apiResponse.messagem,'Error');
        this.router.navigate(['/server-error'])
      } else if(apiResponse.status ==404){
        this.toastr.error(apiResponse.messagem,'Error');
        this.router.navigate(['/page-not-found'])
      } else{
        this.router.navigate(['/page-not-found'])
      }
    })
  }

  public updateMeeting=()=>{
    console.log('updateMeeting called');
    if(!this.meetingTitle){
      this.toastr.warning('Title cannot be empty','Warning');
    } else if(!this.meetingDescription){
      this.toastr.warning('Description cannot be empty','Warning');
    } else if(!this.meetingPlace){
      this.toastr.warning('Meeting place cannot be empty','Warning');
    } else if(!this.meetingStartTime){
      this.toastr.warning('Start time cannot be empty',"warning");
    } else if(!this.meetingEndTime){
      this.toastr.warning('Endtime cannot be empty','Warning');
    } else {
      let meetingData = {
        meetingName : this.meetingTitle,
        meetingDescription : this.meetingDescription,
        meetingPlace : this.meetingPlace,
        meetingStartTime : this.meetingStartTime,
        meetingEndTime : this.meetingEndTime
        
      }
      console.log(meetingData)
      this.meetupService.updateMeetingByMeetingId(meetingData,this.meetingId).subscribe((apiResponse)=>{
        if(apiResponse.status == 200){
          this.toastr.success('Meeting updated successfully',"Success");
          this.router.navigate(['/admin-dashboard']);
        }else if(apiResponse.status == 400){
          this.toastr.error(apiResponse.messagem,'Error');
          this.router.navigate(['/server-error'])
        } else if(apiResponse.status ==404){
          this.toastr.error(apiResponse.messagem,'Error');
          this.router.navigate(['/page-not-found'])
        } else{
          this.toastr.error(apiResponse.message,'Error');
        }
      })
  }

}

  

}
