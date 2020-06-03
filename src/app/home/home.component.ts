import { Router } from '@angular/router';
import { BloggerService } from './../Shared/blogger.service';
import { Component, OnInit } from '@angular/core';
import { DParameter } from './../Shared/Models/common-model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  Data: any[];
  IsLoading = false;
  IsServerError = false;
  IsChildEL = false;
  Cparam: DParameter = new DParameter();
  Puser: any;
  constructor(private Ser: BloggerService, private Datef: DatePipe, private Route: Router) {
    this.IsLoading = true;
    this.FillData();
  }
  FillData() {
    this.Ser.getLatestQst().subscribe((x: any[]) => {
      this.Data = x;
      this.IsLoading = false;
    }, err => {
      this.IsLoading = false;
      this.IsServerError = true;
    });
  }
  MouseEvnt(e, data) {
    this.IsChildEL = true;
    this.Cparam.Id = data.auid.toString();
    this.Cparam.Name = data.auid.toString();
    this.Puser = null;
    this.Ser.GetPartUsrDet(this.Cparam).subscribe((x: any[]) => {
      this.Puser = x[0];
      this.IsChildEL = false;
    }, err => {
      this.IsServerError = true;
      this.IsChildEL = false;
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
  ViewSingleissue(data: any) {
    const id = data.qstId;
    this.Route.navigate(['/PartIss', id]);
  }
  ngOnInit() {
  }

}
