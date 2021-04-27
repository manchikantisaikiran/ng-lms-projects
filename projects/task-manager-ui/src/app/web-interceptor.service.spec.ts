import { TestBed } from '@angular/core/testing';

import { WebInterceptorService } from './web-interceptor.service';

describe('WebInterceptorService', () => {
  let service: WebInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
