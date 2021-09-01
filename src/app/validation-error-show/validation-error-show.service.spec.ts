/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValidationErrorShowService } from './validation-error-show.service';

describe('Service: ValidationErrorShow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationErrorShowService]
    });
  });

  it('should ...', inject([ValidationErrorShowService], (service: ValidationErrorShowService) => {
    expect(service).toBeTruthy();
  }));
});
