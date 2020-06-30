import { AutoCompleteMutliSelectComponent } from './../Shared/Components/auto-complete-mutli-select/auto-complete-mutli-select.component';
import { Filters } from './../Shared/Models/common-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-questions',
  templateUrl: './filter-questions.component.html',
  styleUrls: ['./filter-questions.component.css']
})
export class FilterQuestionsComponent implements OnInit {
  Types = [
    { TValue: 0, TText: 'Answered'},
    { TValue: 1, TText: 'UnAnswered'}
  ];
  Filters: Filters = new Filters();
  MultiSelectstring: string;
  Datasourcce: any[] = [];
  constructor(private Complete: AutoCompleteMutliSelectComponent) { }
  SearchFilter() {
    console.log(this.Filters);
  }
  ngOnInit() {
  }

}
