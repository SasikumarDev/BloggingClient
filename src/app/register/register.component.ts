import { Router } from '@angular/router';
import { Users } from './../Shared/Models/common-model';
import { AppComponent } from './../app.component';
import { BloggerService } from './../Shared/blogger.service';
import { Component, OnInit } from '@angular/core';
import { SignalRNotificationServiceService } from '../Shared/Notification/signal-rnotification-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RUser: Users = new Users();
  ErrorMessage = '';
  constructor(private Ser: BloggerService, private AppCom: AppComponent,
              private Route: Router, private Notification: SignalRNotificationServiceService) { }
  Submit() {
    this.RUser.Dob = new Date();
    this.Ser.Register(this.RUser).subscribe((x: any) => {
      this.ErrorMessage = '';
      if (x.token !== '') {
        this.AppCom.IsAutheticated = true;
        window.localStorage.setItem('BlogGTKn', x.token);
        this.AppCom.CheckIsAuth();
        this.Notification.createConnection();
        this.Notification.registerOnServerEvents();
        this.Notification.startConnection();
        this.Route.navigateByUrl('/Home');
      } else {
        this.ErrorMessage = x.message;
      }
    }, err => {
      console.log(err);
    });
  }
  ngOnInit() {
  }

}
