import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MeetupService } from '../../meetup.service';
import {Router} from '@angular/router';
import { SocketService } from '../../socket.service';


@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})
export class CreateMeetingComponent implements OnInit {

  public meetingName:any;
  public meetingDescription : any;
  public meetingPlace :any;
  public meetingOrganiserName :any;
  public meetingOrganiserId :any;
  public meetingStartTime : Date;
  public meetingEndTime : Date;
  public meetingMember : any;
  public memberName:any;
  public memberId:any;
  public memberEmail:any;
  public authToken : any;
  public userId : any;
  public userName : any;
  public userName1: any;
  public allUsers :any;
  public userDetails : any;

  constructor(private cookieService:CookieService,
              private toastr: ToastrService,
              private meetupService: MeetupService,
              private router: Router,
              private socketService : SocketService) { }

  ngOnInit() {
    this.authToken = this.cookieService.get('authToken');
    this.userId = this.cookieService.get('receiverId');
    this.userName = this.cookieService.get('receiverName');
    this.meetingOrganiserName = this.userName;
    this.meetingOrganiserId = this.userId;
    this.userDetails = this.meetupService.getUserInformationLocalStorage();


    if(this.userDetails.isAdmin){
      this.getAllUsers();
    } else{
      this.router.navigate(['/dashboard'])
    }

    setInterval(()=>{
      console.log(this.userName1);
    },2000)
  }

  public goToAdminDashboard=()=>{
    this.router.navigate(['/admin-dashboard']);
  }

  public createMeeting=()=>{
    if(!this.meetingName){
      this.toastr.warning('Title cannot be empty','Warning');
    } else if(!this.meetingDescription){
      this.toastr.warning('Description cannot be empty','Warning');
    } else if(!this.meetingPlace){
      this.toastr.warning('Meeting place cannot be empty','Warning');
    } else if(!this.meetingOrganiserName){
      this.toastr.warning('Place cannot be empty','Warning');
    } else if(!this.meetingStartTime){
      this.toastr.warning('Start time cannot be empty',"warning");
    } else if(!this.meetingEndTime){
      this.toastr.warning('Endtime cannot be empty','Warning');
    } else if(!this.userName1){
      this.toastr.warning('Please select a member to meet','Warning');
    } else {
      let meetingData = {
        meetingName : this.meetingName,
        meetingDescription : this.meetingDescription,
        meetingPlace : this.meetingPlace,
        memberName : this.meetingMember.firstName + ' ' + this.meetingMember.lastName,
        memberEmail : this.meetingMember.email,
        memberUserId : this.meetingMember.userId,
        meetingStartTime : this.meetingStartTime,
        meetingEndTime : this.meetingEndTime,
        meetingOrganiserName : this.meetingOrganiserName,
        meetingOrganiserId : this.meetingOrganiserId
      }
      console.log(meetingData);
      this.meetupService.createMeeting(meetingData).subscribe((apiResponse)=>{
        if(apiResponse.status == 200){
          this.toastr.success('Meeting created successfully','Success');
          let data={
            userId : this.meetingMember.userId,
            message : `Hi ${this.meetingOrganiserName} has scheduled a meeting with you. Please check our email id`
          }
          this.sendUpdateToUser(data);
          setTimeout(()=>{
            this.goToAdminDashboard()
          },2000);
        } else {    
          this.toastr.error(apiResponse.message,"Error");
        }
      },(error)=>{
        if(error.status == 400){
          this.toastr.error('Meeting creation failed.','Error');
          this.router.navigate(['/server-error'])
        }
      })
    }
  }

  public selectedUser=(user)=>{
    console.log('member clicked')
    console.log(user)
    this.meetingMember = user;
    this.userName1 = user.firstName + ' ' + user.lastName;
  }

  public getAllUsers=()=>{
    if(this.authToken){
      this.meetupService.getAllUsers(this.authToken).subscribe((apiResponse)=>{
        if(apiResponse.status == 200){
          this.allUsers = apiResponse.data;
          console.log(apiResponse.data);
        }else if(apiResponse.status == 500){
          this.toastr.error(apiResponse.message,'Error');
          this.router.navigate(['/server-error'])
        } else {
          this.toastr.error(apiResponse.message,'Error');
        }
      },(error)=>{
        this.toastr.error(error,'Error');
        this.router.navigate(['/server-error'])
      })
    }
    else {
      this.toastr.error('Token is expired or didnt matched','Error');
      this.router.navigate(['/']);
    }
  }

  public sendUpdateToUser=(data)=>{
    this.socketService.notifyUpdate(data);
  }

  public validateDate(startDate:any, endDate:any):boolean {//method to validate the the start and end date of meeting .

    let start = new Date(startDate);
    let end = new Date(endDate);

    if(end < start){
      return true;
    }
    else{
      return false;
    }

  }//end validateDate

}
