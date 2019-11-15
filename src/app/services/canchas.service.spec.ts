import { TestBed } from '@angular/core/testing';

import { CanchasService } from './canchas.service';

describe('CanchasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanchasService = TestBed.get(CanchasService);
    expect(service).toBeTruthy();
  });
});
