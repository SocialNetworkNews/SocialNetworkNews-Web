import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [
        // no more boilerplate code w/ custom providers needed :-)
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
