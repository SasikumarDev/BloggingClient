import { BloggerService } from './../../blogger.service';
import { Component, OnInit, Input, Output, EventEmitter, HostListener, Injectable } from '@angular/core';
import { ButtonsModule, WavesModule, DropdownModule } from 'angular-bootstrap-md';

export interface AutocompleConfig {
  EmptyResultString: string;
  DataSource: any[];
  ResultData: any[];
  ModelString: string;
  MaxAllodedToSelect: number;
  DisableExsistOption: boolean;
}
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-auto-complete-mutli-select',
  templateUrl: './auto-complete-mutli-select.component.html',
  styleUrls: ['./auto-complete-mutli-select.component.css']
})
export class AutoCompleteMutliSelectComponent implements OnInit {
  DataSource: any[];
 @Output() ResultData = new EventEmitter<any[]>();
  OutPutData: any[] = [];
  OnKeyPress: EventEmitter<any>;
  TextBoxEditor: string;
  txtautocompelte = document.getElementById('txtautocompelte');
  IsLoading = false;
  EmptyResult = 'No Records Found';
  ShowNoRec = false;
  MaxAllowed = 2;
  DisableCheckedoption = true;
  Config: AutocompleConfig;
  constructor(private Ser: BloggerService) {
  }
  @HostListener('onclick')
  FocusControl() {
    this.DataSource = [];
    this.txtautocompelte = document.getElementById('txtautocompelte');
    this.txtautocompelte.focus();
    this.txtautocompelte.style.border = '0';
  }
  @HostListener('keyup')
  GetData(event) {
    const values = this.TextBoxEditor;
    if (values !== '') {
      this.IsLoading = true;
      this.DataSource = [];
      this.Ser.SearchTags(values).subscribe((a: any[]) => {
        this.DataSource = a;
        if (this.DataSource.length === 0) {
          this.ShowNoRec = true;
        }
        this.IsLoading = false;
        this.ShowNoRec = false;
      }, err => {
        this.ShowNoRec = true;
        console.log(err);
      });
    } else if (values === '') {
      this.OutPutData.splice(-0);
      this.ResultData.emit(this.OutPutData);
    }
  }
  @HostListener('onclick')
  Saveclicked(selct: any) {
    let index = -1; 
    if (this.OutPutData.length > 0) {
      index = this.OutPutData.findIndex(x => x.id === selct.id);
    }
    if (index === -1) {
      this.OutPutData.push(selct);
      this.ResultData.emit(this.OutPutData);
      this.TextBoxEditor = '';
    } else {
      this.TextBoxEditor = '';
    }
  }
  DisableOption(option: any) {
    if (this.DisableCheckedoption) {
      const index = this.OutPutData.findIndex(x => x.id === option.id);
      if (index === -1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  ngOnInit() {
  }

}
