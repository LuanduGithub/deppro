import { TestBed } from '@angular/core/testing';

import { PosicionesService } from './posiciones.service';

describe('PosicionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosicionesService = TestBed.get(PosicionesService);
    expect(service).toBeTruthy();
  });
});
