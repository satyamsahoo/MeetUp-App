import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {

  constructor(private _http:HttpClient,
              private cookieService:CookieService) { }

  private baseUrl = 'http://localhost:3001/api/v1';

  public setUserInformationLocalStorage=(data)=>{
    localStorage.setItem('userInfo',JSON.stringify(data))
  }

  public getUserInformationLocalStorage=()=>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public loginFunction(data):Observable<any> {
    const httpParams = new HttpParams()
    .set('email',data.email)
    .set('password',data.password)

    return this._http.post(`${this.baseUrl}/users/login`,httpParams);
  }

  public signUpFunction(data):Observable<any>{
    const httpParaams = new HttpParams()
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('email',data.email)
    .set('userName',data.userName)
    .set('isAdmin',data.isAdmin)
    .set('countryCode',data.countryCode)
    .set('mobileNumber',data.mobileNumber)
    .set('password',data.password)

    return this._http.post(`${this.baseUrl}/users/signup`,httpParaams);
  }

  public forgotPasswordFunction(email):Observable<any>{
    console.log('forgotPasswordFunction')
    console.log(email)
    const httpParams = new HttpParams()
      .set('email',email)
      return this._http.post(`${this.baseUrl}/users/forgot`,httpParams);
  }

  public resetPasswordFunction(data):Observable<any>{
    const httpParams = new HttpParams()
      .set('validationToken',data.validationToken)
      .set('password',data.password)

      return this._http.post(`${this.baseUrl}/users/reset`,httpParams);
  }

  public getCountryName():Observable<any>{
    return this._http.get('./../assets/countryName.json');
  }

  public getCountryMobileNumber():Observable<any>{
    return this._http.get('./../assets/countryCode.json');
  }

  public getAllMeetingsOfUser(userId,authToken):Observable<any>{
    return this._http.get(`${this.baseUrl}/meetings/all/meetings/${userId}?authToken=${authToken}`);
  }

  public getMeetingById(meetingId,authToken):Observable<any>{
    return this._http.get(`${this.baseUrl}/meetings/${meetingId}/view?authToken=${authToken}`);
  }

  public getAllUsers(authToken):Observable<any>{
    return this._http.get(`${this.baseUrl}/meetings/all-users?authToken=${authToken}`);
  }

  public deleteMeeting(authToken,meetingId):Observable<any>{
    return this._http.get(`${this.baseUrl}/meetings/${meetingId}/delete?authToken=${authToken}`);
  }

  public createMeeting(data):Observable<any>{
    let httpParams = new HttpParams()
      .set('meetingName',data.meetingName)
      .set('meetingDescription',data.meetingDescription)
      .set('meetingPlace',data.meetingPlace)
      .set('meetingStartTime',data.meetingStartTime)
      .set('meetingEndTime',data.meetingEndTime)
      .set('meetingOrganiserName',data.meetingOrganiserName)
      .set('meetingOrganiserId',data.meetingOrganiserId)
      .set('memberName',data.memberName)
      .set('memberId',data.memberUserId)
      .set('memberEmail',data.memberEmail)
    return this._http.post(`${this.baseUrl}/meetings/create`,httpParams);
  }

  public updateMeetingByMeetingId(data,meetingId):Observable<any>{
    let httpParams = new HttpParams()
      .set('meetingName',data.meetingName)
      .set('meetingDescription',data.meetingDescription)
      .set('meetingPlace',data.meetingPlace)
      .set('meetingStartTime',data.meetingStartTime)
      .set('meetingEndTime',data.meetingEndTime)
    
    return this._http.put(`${this.baseUrl}/meetings/${meetingId}/update`,httpParams);  
  }

  public logout(userId):Observable<any>{
    return this._http.get(`${this.baseUrl}/users/${userId}/logout`);
  }



}
