import { BloggerService } from './Shared/blogger.service';
import { BloggingGuardGuard } from './Shared/Guard/blogging-guard.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IssueViwerComponent } from './issue-viwer/issue-viwer.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LoginsComponent } from './logins/logins.component';
import { RegisterComponent } from './register/register.component';
import { ViewPartIssueComponent } from './view-part-issue/view-part-issue.component';
import { RegisterEmailValidatorDirective } from './Shared/Validators/register-email-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    IssueViwerComponent,
    LoginsComponent,
    RegisterComponent,
    ViewPartIssueComponent,
    RegisterEmailValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'Home', component: HomeComponent },
      { path: 'Dashboard', component: DashboardComponent, canActivate: [BloggingGuardGuard] },
      { path: 'Issue', component: IssueViwerComponent, canActivate: [BloggingGuardGuard] },
      { path: 'PartIss/:id', component: ViewPartIssueComponent },
      { path: 'Logins', component: LoginsComponent },
      { path: 'Register', component: RegisterComponent },
      { path: '**', component: HomeComponent }
    ])
  ],
  providers: [BloggingGuardGuard, BloggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
