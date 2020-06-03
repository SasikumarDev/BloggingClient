import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueViwerComponent } from './issue-viwer.component';

describe('IssueViwerComponent', () => {
  let component: IssueViwerComponent;
  let fixture: ComponentFixture<IssueViwerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueViwerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueViwerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
