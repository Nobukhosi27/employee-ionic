import { TestBed } from '@angular/core/testing';

import { MockDatabaseService } from './mock-database.service';

describe('MockDatabaseService', () => {
  let service: MockDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
