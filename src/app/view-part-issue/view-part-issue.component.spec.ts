import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPartIssueComponent } from './view-part-issue.component';

describe('ViewPartIssueComponent', () => {
  let component: ViewPartIssueComponent;
  let fixture: ComponentFixture<ViewPartIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPartIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPartIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
