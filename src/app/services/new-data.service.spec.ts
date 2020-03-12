import { TestBed } from '@angular/core/testing';

import { NewDataService } from './new-data.service';

describe('NewDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewDataService = TestBed.get(NewDataService);
    expect(service).toBeTruthy();
  });
});
