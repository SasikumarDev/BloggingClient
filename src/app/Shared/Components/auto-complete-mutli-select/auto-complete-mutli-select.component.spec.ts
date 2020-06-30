import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteMutliSelectComponent } from './auto-complete-mutli-select.component';

describe('AutoCompleteMutliSelectComponent', () => {
  let component: AutoCompleteMutliSelectComponent;
  let fixture: ComponentFixture<AutoCompleteMutliSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteMutliSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteMutliSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
