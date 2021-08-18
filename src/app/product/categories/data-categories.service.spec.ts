import { TestBed } from '@angular/core/testing';

import { DataCategoriesService } from './data-categories.service';

describe('DataCategoriesService', () => {
  let service: DataCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
