import { AutoCompleteMutliSelectComponent } from './Shared/Components/auto-complete-mutli-select/auto-complete-mutli-select.component';
import { BloggerService } from './Shared/blogger.service';
import { BloggingGuardGuard } from './Shared/Guard/blogging-guard.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { FilterQuestionsComponent } from './filter-questions/filter-questions.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    IssueViwerComponent,
    LoginsComponent,
    RegisterComponent,
    ViewPartIssueComponent,
    RegisterEmailValidatorDirective,
    AutoCompleteMutliSelectComponent,
    FilterQuestionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
      { path: 'ViewAll', component: FilterQuestionsComponent },
      { path: '**', component: HomeComponent }
    ]),
    NgxSpinnerModule
  ],
  providers: [BloggingGuardGuard, BloggerService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
