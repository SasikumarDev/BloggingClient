import { SignalRNotificationServiceService } from './Shared/Notification/signal-rnotification-service.service';
import { Router } from '@angular/router';
import { BloggerService } from './Shared/blogger.service';
import { Component, EventEmitter, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  NavTitle = 'BloG';
  IsAutheticated = false;
  LogedUserDt: any;
  IsAuth: EventEmitter<boolean> = new EventEmitter();
  NotiFications: any[] = [];
  NoofNoyi;
  constructor(private Ser: BloggerService, private Route: Router, private Notification: SignalRNotificationServiceService,
    private Zone: NgZone) {
    this.CheckIsAuth();
    this.ReceivedNotifivation();
  }
  CheckIsAuth() {
    const token = window.localStorage.getItem('BlogGTKn');
    if (token !== null) {
      this.Ser.Verifyuser(token).subscribe((x: any[]) => {
        this.LogedUserDt = x[0];
        this.IsAutheticated = true;
        this.IsAuth.emit(this.IsAutheticated);
      }, err => {
        console.log(err);
        this.IsAutheticated = false;
        this.IsAuth.emit(this.IsAutheticated);
      });
    } else {
      this.IsAutheticated = false;
      this.IsAuth.emit(this.IsAutheticated);
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
}
