import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterQuestionsComponent } from './filter-questions.component';

describe('FilterQuestionsComponent', () => {
  let component: FilterQuestionsComponent;
  let fixture: ComponentFixture<FilterQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
