import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosicionesPage } from './posiciones.page';

describe('PosicionesPage', () => {
  let component: PosicionesPage;
  let fixture: ComponentFixture<PosicionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosicionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
