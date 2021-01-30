import { TestBed, inject } from '@angular/core/testing';

import { CodeforcesService } from './codeforces.service';

describe('CodeforcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeforcesService]
    });
  });

  it('should be created', inject([CodeforcesService], (service: CodeforcesService) => {
    expect(service).toBeTruthy();
  }));
});
