import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DOCUMENT} from '@angular/common';

@Injectable()
export class ApiService {
  private url;
  constructor(@Inject(DOCUMENT) private document, private http: HttpClient) {
    this.url = document.location.protocol + '//' + document.location.hostname + ':8000';
  }

  // Uses http.get() to load data from a single API endpoint
  getYesterday(uuid: string) {
    return this.http.get(`${this.url}/paper/${uuid}/yesterday`);
  }
}
