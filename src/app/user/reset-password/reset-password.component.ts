import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../../meetup.service';
import {ActivatedRoute,Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public newPassword: any;
  public confirmPassword: any;
  public passwordValidationToken: any;

  constructor(private meetupService:MeetupService,
              private _route :ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.passwordValidationToken = this._route.snapshot.paramMap.get('validationToken');
    console.log(this.passwordValidationToken);
  }

  public goToLogin=()=>{
    this.router.navigate(['/login']);
  }

  public resetPassword = () =>{

    if(this.newPassword == this.confirmPassword){

      let data = {
        validationToken : this.passwordValidationToken,
        password : this.newPassword
        }

      this.meetupService.resetPasswordFunction(data).subscribe((response1)=>{
        if(response1.status ==200){
          this.toastr.success('Password reset successfully','Success')
          this.goToLogin();
        } else {
          this.toastr.error(response1.message,'Error')
          this.router.navigate(['/server-error']);
        }
      });  
    } else {
      console.log('password doesnt match')
    }


  }

}
