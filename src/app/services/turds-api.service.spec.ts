import { TestBed, inject } from '@angular/core/testing';

import { TurdsApiService } from './turds-api.service';

describe('TurdsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TurdsApiService]
    });
  });

  it('should be created', inject([TurdsApiService], (service: TurdsApiService) => {
    expect(service).toBeTruthy();
  }));
});
