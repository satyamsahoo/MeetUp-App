import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ServerErrorComponent } from '../server-error/server-error.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild([
      {path:'signup',component:SignupComponent,pathMatch:'full'},
      {path:'forgotpassword',component:ForgotPasswordComponent,pathMatch:'full'},
      {path:'resetpassword/:validationToken',component:ResetPasswordComponent},
      {path:'page-not-found',component:PageNotFoundComponent},
      {path:'server-error',component:ServerErrorComponent}
    ])
  ],
  declarations: [LoginComponent, SignupComponent, ResetPasswordComponent, ForgotPasswordComponent]
})
export class UserModule { }
