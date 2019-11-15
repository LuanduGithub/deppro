import { TestBed } from '@angular/core/testing';

import { DesignacionesService } from './designaciones.service';

describe('DesignacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesignacionesService = TestBed.get(DesignacionesService);
    expect(service).toBeTruthy();
  });
});
