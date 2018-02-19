import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {Observable} from 'rxjs/Observable';

export interface Tweet {
  tweets?: (TweetsEntity)[];
}
export interface TweetsEntity {
  username: string;
  user_id: string;
  display_name: string;
  userprofile_link: string;
  text: string;
  image_urls?: (string)[];
  created_at: string;
  favorites: string;
  retweets: string;
  retweet: boolean;
}

export interface Paper {
  name?: string;
  uuid?: string;
  description?: string;
  paper_image?: string;
  author?: Author;
}

export interface Author {
  uuid?: string;
  username?: string;
  profile_image_url?: string;
  twitter_profile?: string;
  google_profile?: string;
  github_profile?: string;
}

@Injectable()
export class ApiService {
  private url;
  constructor(@Inject(DOCUMENT) private document, private http: HttpClient) {
    this.url = document.location.protocol + '//' + document.location.hostname + '/api';
  }

  // Uses http.get() to load data from a single API endpoint
  getYesterday(uuid: string): Observable<Tweet> {
    return this.http.get<Tweet>(`${this.url}/paper/${uuid}/yesterday`);
  }

  getPapers(): Observable<Paper[]> {
    return this.http.get<Paper[]>(`${this.url}/papers`);
  }
}
