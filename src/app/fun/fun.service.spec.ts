import { TestBed } from '@angular/core/testing';

import { FunService } from './fun.service';

describe('FunService', () => {
  let service: FunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
