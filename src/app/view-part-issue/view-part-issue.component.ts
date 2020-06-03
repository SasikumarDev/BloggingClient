import { Answer } from './../Shared/Models/common-model';
import { AppComponent } from './../app.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BloggerService } from './../Shared/blogger.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { DParameter } from '../Shared/Models/common-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-part-issue',
  templateUrl: './view-part-issue.component.html',
  styleUrls: ['./view-part-issue.component.css'],
  providers: [DatePipe]
})
export class ViewPartIssueComponent implements OnInit {
  Question: any;
  Answers: any[];
  ErrorMessage = '';
  IsLoading = false;
  IsServerError = false;
  Param: DParameter = new DParameter();
  Puser: any;
  IsChildEL = false;
  UserAns: Answer = new Answer();
  RouteID;
  constructor(private Ser: BloggerService, private Route: Router,
              public AppCom: AppComponent, private ActRoute: ActivatedRoute, private Datef: DatePipe, private Zone: NgZone) {
    this.RouteID = this.ActRoute.snapshot.paramMap.get('id');
    this.Param.Id = this.RouteID.toString();
    this.IsLoading = true;
    this.CheckIsAuth();
    this.GetQuestionAndAns();
  }
  GetQuestionAndAns() {
    this.Param = new DParameter();
    this.Param.Id = this.RouteID.toString();
    this.Ser.GetPartGetQuestionAndAns(this.Param).subscribe((x: any) => {
      if (x.message === '') {
        this.Question = x.question;
        this.Answers = x.answers;
       // console.log(this.Answers);
      } else {
        this.ErrorMessage = x.message;
      }
      this.IsLoading = false;
      this.IsServerError = false;
    }, err => {
      console.log(err);
      this.IsLoading = false;
      this.IsServerError = true;
    });
  }
  GenDate(data: Date) {
    const todate = new Date();
    const dydate = new Date(data);
    if (todate.getDate() + todate.getMonth() + todate.getFullYear() === dydate.getDate() + dydate.getMonth() + dydate.getFullYear()) {
      return 'Today';
    } else {
      return this.Datef.transform(dydate, 'dd-MMM-yyyy hh:mm a');
    }
  }
  MouseEvnt(e, data) {
    this.IsChildEL = true;
    this.Param.Id = data.toString();
    this.Puser = null;
    this.Ser.GetPartUsrDet(this.Param).subscribe((x: any[]) => {
      this.Puser = x[0];
      this.IsChildEL = false;
    }, err => {
      this.IsServerError = true;
      this.IsChildEL = false;
    });
  }
  SubmitAns() {
    // tslint:disable-next-line:radix
    this.UserAns.Qid = parseInt(this.RouteID.toString());
    this.IsLoading = true;
    this.Ser.SaveAns(this.UserAns).subscribe((x: any) => {
      this.UserAns = new Answer();
      if (x.message === '') {
        this.Question = x.question;
        this.Answers = x.answers;
      } else {
        this.ErrorMessage = x.message;
      }
      this.IsLoading = false;
      this.IsServerError = false;
    }, err => {
      console.log(err);
      this.IsLoading = false;
      this.IsServerError = true;
    });
  }
  SubmitLike(data) {
    this.Param = new DParameter();
    this.Param.Id = data.toString();
    this.Ser.LikeAndUnlike(this.Param).subscribe((x: any) => {
      if (x.message !== '') {
        this.GetQuestionAndAns();
      }
    }, err => {
      console.log(err);
    });
  }
  GetBtnclr(dat) {
    if (dat === true) {
      return 'indigo';
    } else {
      return '';
    }
  }
  CheckIsAuth(): void {
    this.AppCom.IsAuth.subscribe((x: boolean) => {
      this.Zone.run(() => {
        this.GetQuestionAndAns();
      });
    });
  }
  ngOnInit() {
  }

}
