import { SignalRNotificationServiceService } from './Shared/Notification/signal-rnotification-service.service';
import { Router } from '@angular/router';
import { BloggerService } from './Shared/blogger.service';
import { Component, EventEmitter, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent {
  NavTitle = 'BloG';
  IsAutheticated = false;
  LogedUserDt: any;
  IsAuth: EventEmitter<boolean> = new EventEmitter();
  NotiFications: any[] = [];
  NoofNoyi;
  IsPageLoading = false;
  LoadingText;
  constructor(private Ser: BloggerService, private Route: Router, private Notification: SignalRNotificationServiceService,
              private Zone: NgZone, private Datef: DatePipe) {
    this.CheckIsAuth();
    this.ReceivedNotifivation();
  }
  CheckIsAuth() {
    this.IsPageLoading = true;
    this.LoadingText = 'Checking User Authentication';
    const token = window.localStorage.getItem('BlogGTKn');
    if (token !== null) {
      this.Ser.Verifyuser(token).subscribe((x: any[]) => {
        this.LogedUserDt = x[0];
        this.IsAutheticated = true;
        this.IsAuth.emit(this.IsAutheticated);
        this.getnotification();
        this.LoadingText = 'Authentication Completed...';
        this.IsPageLoading = false;
      }, err => {
        console.log(err);
        this.IsAutheticated = false;
        this.IsAuth.emit(this.IsAutheticated);
        this.LoadingText = 'Authentication Failed...';
        this.IsPageLoading = false;
      });
    } else {
      this.IsAutheticated = false;
      this.IsAuth.emit(this.IsAutheticated);
      this.LoadingText = 'Authentication Failed...';
      this.IsPageLoading = false;
    }
  }
  LogOut() {
    window.localStorage.removeItem('BlogGTKn');
    this.IsAutheticated = false;
    this.IsAuth.emit(this.IsAutheticated);
    this.LogedUserDt = null;
  }
  private ReceivedNotifivation(): void {
    this.Notification.messageReceived.subscribe((x: any) => {
      this.Zone.run(() => {
        this.NotiFications.push(x);
        this.NoofNoyi = this.NotiFications.length;
      });
    }, err => {
      console.log(err);
    });
  }
  setcountzero() {
    this.NoofNoyi = 0;
  }
  getnotification() {
    if (this.IsAutheticated === true) {
      this.Ser.GetNotification().subscribe((x: any[]) => {
        this.NotiFications = x;
        this.NoofNoyi = this.NotiFications.length;
      }, err => {
        console.log(err);
      });
    }
  }
  GenDate(data: Date) {
    const todate = new Date();
    const dydate = new Date(data);
    return this.Datef.transform(dydate, 'dd-MMM-yyyy hh:mm a');
  }
}
