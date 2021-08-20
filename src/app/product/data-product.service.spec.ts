import { TestBed } from '@angular/core/testing';

import { DataProductService } from './data-product.service';

describe('DataProductService', () => {
  let service: DataProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
