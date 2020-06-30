import { AutoCompleteMutliSelectComponent } from './../Shared/Components/auto-complete-mutli-select/auto-complete-mutli-select.component';
import { Observable } from 'rxjs';
import { BloggerService } from './../Shared/blogger.service';
import { Component, OnInit, NgZone } from '@angular/core';
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
  SelecTags: any[] = [];
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '300',
      minHeight: '300',
      maxHeight: '300',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: 'Arial',
      defaultFontSize: '2',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
      ],
      [
        'insertImage',
        'insertVideo',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
};
  constructor(private Ser: BloggerService, private router: Router, private Zone: NgZone,
              private Autocomplete: AutoCompleteMutliSelectComponent) {
    this.GetTags();
  }

  GetTags() {
    this.Ser.GetLanTags().subscribe((x: any[]) => {
      this.Tags = x;
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
  GetOutput(optins: any[]) {
    this.Qst.TagsAr = optins.map((x: any) => {
      return x.id;
    });
  }

  ngOnInit() {
  }

}
