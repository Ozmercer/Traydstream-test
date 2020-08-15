import { TestBed } from '@angular/core/testing';

import { TraydStreamService } from './trayd-stream.service';

describe('TraydStreamService', () => {
  let service: TraydStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraydStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
