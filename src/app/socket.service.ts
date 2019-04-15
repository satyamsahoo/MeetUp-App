import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;
  baseUrl = "http://localhost:3000/dashboard/api";

  constructor() {
    this.socket = io();
   }

  //listen to verifyuser authentication. 
  public verifyUser=()=>{
    return Observable.create((observer)=>{
      this.socket.on('verify-user',(data)=>{
        observer.next(data);
      })
    })
  }
  //emmit authToken to register user online
  public setUser=(authToken)=>{
    this.socket.emit('set-user',authToken);
  }

  //listen to get all userMeetings
  public getUserMeetings =() =>{
    return Observable.create((observer)=>{
      this.socket.on("get-all-user-meeting",(data)=>{
        observer.next(data);
      });
    });
  }
  //emit to update user of change in meeting.
  public notifyUpdate=(data)=>{
    this.socket.emit('notify-update',data);
  }

  //listen authentication fail error
  public authError = () => {
    return Observable.create((observer) => {
      this.socket.on('auth-error', (data) => {
        observer.next(data);
      });
    });
  }

  //emit receiver id to get alert from admin
  public getAlertFromAdmin=()=>{
    return Observable.create((observer)=>{
      this.socket.on('receiver-id',(data)=>{
        observer.next(data);
      })
    })
  }

  public exitSocket=()=>{
    this.socket.disconnect();
  }

  public disconnectedSocket=()=>{
    this.socket.emit('disconnet',"");
  }



}
