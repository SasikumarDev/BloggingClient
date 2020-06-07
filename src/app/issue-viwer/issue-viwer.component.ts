import { BloggerService } from './../Shared/blogger.service';
import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Questions } from '../Shared/Models/common-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-viwer',
  templateUrl: './issue-viwer.component.html',
  styleUrls: ['./issue-viwer.component.css']
})
export class IssueViwerComponent implements OnInit {
  Qst: Questions = new Questions();
  Tags: any[];
  constructor(private Ser: BloggerService, private router: Router) {
    this.GetTags();
   }

  GetTags() {
    this.Ser.GetLanTags().subscribe((x: any[] ) => {
      this.Tags = x;
      console.log(x);
    }, err => {
      console.log(err);
    });
  }

  SubmitQst() {
    this.Qst.Tags = this.Qst.TagsAr.toString();
    this.Ser.SubmitQst(this.Qst).subscribe((x: any[]) => {
      this.router.navigateByUrl('/Home');
    });
  }

  ngOnInit() {
  }

}
