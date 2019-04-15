import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../../meetup.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private meetupService : MeetupService,
              private toastr: ToastrService,
              private router:Router) { }

  public email : String;

  ngOnInit() {
  }

  public forgotPasswordFunction=()=>{
    if(!this.email){
      this.toastr.warning('Email is required',"Warning");
    } else{
      let email = this.email
      console.log(email)
      this.meetupService.forgotPasswordFunction(email).subscribe((data)=>{
        if(data.status == 200){
          console.log('Email sent Successful');
          this.toastr.success('Please check your email to reset password.','Email sent');
        } else {
          console.log(data.message);
          this.toastr.error(data.message,'Error');
          this.router.navigate(['/server-error']);
          
        }
      })
    }
  }

}
