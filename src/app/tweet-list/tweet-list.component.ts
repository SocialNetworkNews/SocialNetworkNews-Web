import {Component, Input, OnInit} from '@angular/core';
import * as Raven from 'raven-js';
import {ApiService, TweetsEntity} from '../api.service';


@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {
  @Input() uuid;
  data: (TweetsEntity)[][];

  constructor(private apiService: ApiService) {
    Raven.captureBreadcrumb({
      message: 'Showing Paper',
      category: 'paper',
      data: {
        uuid: this.uuid
      }
    });
  }

  ngOnInit() {
    this.getYesterday();
  }

  getYesterday() {
    this.apiService.getYesterday(this.uuid)
      .subscribe(
        data => { this.data = this.chunk(data.tweets, 3); },
        err => Raven.captureException(new Error(JSON.stringify(err))),
        () => console.log('done loading Yesterday')
      );
  }

  private chunk(arr: (TweetsEntity)[], size: number): (TweetsEntity)[][] {
    const newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

}
