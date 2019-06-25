import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingPage } from './grading.page';

describe('GradingPage', () => {
  let component: GradingPage;
  let fixture: ComponentFixture<GradingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
