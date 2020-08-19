import { BloggerService } from './../Shared/blogger.service';
import { AutoCompleteMutliSelectComponent } from './../Shared/Components/auto-complete-mutli-select/auto-complete-mutli-select.component';
import { Filters, Questions } from './../Shared/Models/common-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-questions',
  templateUrl: './filter-questions.component.html',
  styleUrls: ['./filter-questions.component.css']
})
export class FilterQuestionsComponent implements OnInit {
  Types = [
    { TValue: 0, TText: 'All'},
    { TValue: 1, TText: 'Answered'},
    { TValue: 2, TText: 'UnAnswered'}
  ];
  Filters: Filters = new Filters();
  MultiSelectstring: string;
  Datasourcce: any[] = [];
  Qst: Questions = new Questions();
  constructor(private Complete: AutoCompleteMutliSelectComponent, private Ser: BloggerService) { }
  SearchFilter() {
    this.Filters.Tags = this.Qst.TagsAr.toString();
    console.log(this.Filters);
  }
  GetOutput(optins: any[]) {
    this.Qst.TagsAr = optins.map((x: any) => {
      return x.id;
    });
  }
  ngOnInit() {
  }

}
