import { Questions, DParameter, Users, Answer } from './Models/common-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {
  BaseURL = 'https://localhost:5001/Blog/';
  AccountURL = 'https://localhost:5001/Account/';
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.localStorage.getItem('BlogGTKn')
  });
  constructor(private Http: HttpClient) { }
  GetNotification() {
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('BlogGTKn')
    });
    return this.Http.get(this.BaseURL + 'GetNotification', { headers: this.reqHeader });
  }
  SubmitQst(Data: Questions) {
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('BlogGTKn')
    });
    return this.Http.post(this.BaseURL + 'AddQst', Data, { headers: this.reqHeader });
  }

  getLatestQst() {
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('BlogGTKn')
    });
    return this.Http.get(this.BaseURL + 'GetQuetions', { headers: this.reqHeader });
  }
  GetPartUsrDet(data: DParameter) {
    return this.Http.post(this.BaseURL + 'GetParticularusr', data);
  }
  Login(Data: Users) {
    return this.Http.post(this.AccountURL + 'Login', Data);
  }
  Verifyuser(data: string) {
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('BlogGTKn')
    });
    return this.Http.get(this.BaseURL + 'CurrentUser', { headers: this.reqHeader });
  }
  ValidateUser() {
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('BlogGTKn')
    });
    return this.Http.get(this.BaseURL + 'ValidateUser', { headers: this.reqHeader });
  }
  Register(Data: Users) {
    return this.Http.post(this.AccountURL + 'Register', Data);
  }
  GetPartGetQuestionAndAns(data: DParameter) {
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('BlogGTKn')
    });
    return this.Http.post(this.BaseURL + 'GetPartQstAndAns', data, { headers: this.reqHeader });
  }
  SaveAns(Data: Answer) {
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('BlogGTKn')
    });
    return this.Http.post(this.BaseURL + 'SaveAns', Data, { headers: this.reqHeader });
  }
  LikeAndUnlike(data: DParameter) {
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('BlogGTKn')
    });
    return this.Http.post(this.BaseURL + 'LikeAns', data, { headers: this.reqHeader });
  }
  CheckEmilIDonRegister(data: string) {
    const DpParam: DParameter = new DParameter();
    DpParam.Id = data;
    return this.Http.post(this.AccountURL + 'CheckUserAvailable', DpParam);
  }
  GetLanTags() {
    return this.Http.get(this.BaseURL + 'GetTags');
  }
  SearchTags(data: string) {
    const DpParam: DParameter = new DParameter();
    DpParam.Name = data;
    return this.Http.post(this.BaseURL + 'SearchTags', DpParam); // , {reportProgress: true}
  }
}
