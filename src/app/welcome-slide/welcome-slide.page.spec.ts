import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSlidePage } from './welcome-slide.page';

describe('WelcomeSlidePage', () => {
  let component: WelcomeSlidePage;
  let fixture: ComponentFixture<WelcomeSlidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeSlidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeSlidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
