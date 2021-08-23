import { TestBed } from '@angular/core/testing';

import { DataCartService } from './data-cart.service';

describe('DataCartService', () => {
  let service: DataCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
