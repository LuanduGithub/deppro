import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanchasComponent } from './canchas.component';

describe('CanchasComponent', () => {
  let component: CanchasComponent;
  let fixture: ComponentFixture<CanchasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanchasComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanchasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
