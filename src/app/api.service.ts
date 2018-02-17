import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DOCUMENT} from '@angular/common';

export interface Tweet {
  tweets?: (TweetsEntity)[] | null;
}
export interface TweetsEntity {
  username: string;
  user_id: string;
  display_name: string;
  userprofile_link: string;
  text: string;
  image_urls?: (string)[] | null;
  created_at: string;
  favorites: string;
  retweets: string;
  retweet: boolean;
}


@Injectable()
export class ApiService {
  private url;
  constructor(@Inject(DOCUMENT) private document, private http: HttpClient) {
    this.url = document.location.protocol + '//' + document.location.hostname + ':8000';
  }

  // Uses http.get() to load data from a single API endpoint
  getYesterday(uuid: string) {
    return this.http.get<Tweet>(`${this.url}/paper/${uuid}/yesterday`);
  }
}
