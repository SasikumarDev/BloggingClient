import { Router } from '@angular/router';
import { Users } from './../Shared/Models/common-model';
import { AppComponent } from './../app.component';
import { BloggerService } from './../Shared/blogger.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginsComponent implements OnInit {
  LoginUser: Users = new Users();
  ErrorMessage = '';
  constructor(private Ser: BloggerService, private AppCom: AppComponent, private Route: Router) { }
  LoginTest() {
    this.Ser.Login(this.LoginUser).subscribe((x: any) => {
      this.ErrorMessage = '';
      if (x.token !== '') {
        this.AppCom.IsAutheticated = true;
        window.localStorage.setItem('BlogGTKn', x.token);
        this.AppCom.CheckIsAuth();
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
