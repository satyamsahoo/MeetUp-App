import { Component, OnInit } from '@angular/core';
import { MeetupService } from '../../meetup.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName : any;
  public lastName : any;
  public email : any;
  public countryCode : any;
  public mobileNumber : any;
  public password : any;
  public countries =[];
  public countryCodes =[];
  public countryName;
  public userName: any;
  public isAdmin : boolean=false;

  constructor(private meetupService : MeetupService, 
              private router:Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getCountryCode();
  }

  public goToLogin=() =>{
    this.router.navigate(['/']);
  }

  public signUpFunction = () =>{
    console.log('signUpFunction called.')
    if(!this.firstName){
      this.toastr.warning('First Name is required',"Warning");
    }
    else if(!this.lastName){
      this.toastr.warning('Last Name is required',"Warning");
    }
    else if(!this.email){
      this.toastr.warning('Email is required',"Warning");
    }
    else if(!this.userName){
      this.toastr.warning('UserName is required',"Warning");
    }
    else if(!this.countryCode){
      this.toastr.warning('Country Code is required',"Warning");
    }
    else if(!this.mobileNumber){
      this.toastr.warning('Mobile Number is required',"Warning");
    }
    else if(!this.password){
      this.toastr.warning('password is required',"Warning");
    }
    else {
      let userData = {
        firstName : this.firstName,
        lastName : this.lastName,
        email : this.email,
        userName : this.userName,
        isAdmin : this.isAdmin,
        countryCode : this.countryCode,
        mobileNumber : this.mobileNumber,
        password : this.password
      }
      console.log(userData);
    this.meetupService.signUpFunction(userData).subscribe((data)=>{
      if(data.status == 200){
        this.toastr.success('Signed Up Successfully.','Welcome to MeetUp!!')
        console.log('Signup Successfull.')
        setTimeout(()=>{
          this.goToLogin();
        },2000);
      } else {
        this.toastr.error(data.message,"Error");
        console.log(data.message);
        
      }
    })
   }

    
  }

  public checkUserNameValidity=(userName)=>{
    if(this.isAdmin){
      if(userName.substr(userName.length - 6)=== '-admin'){
        return false;
      }else {
        return true;
      }
    }
  }

  public getCountryCode=()=>{
    this.meetupService.getCountryName().subscribe((data)=>{
      for(let i in data){
        let countryDetail = {
          countryCode : i,
          countryName : data[i]
        }
        this.countries.push(countryDetail);
      }
      console.log(this.countries) 
    })
  }

  public getCountryMobileCode=(countryCode)=>{
    console.log('On select called');
    console.log(countryCode)
    this.meetupService.getCountryMobileNumber().subscribe((data)=>{
      for(let i in data){
        if(i==countryCode){
          this.countryCode = data[i];
          console.log(this.countryCode);
          return true;
        }
      }
    })

  }


}
