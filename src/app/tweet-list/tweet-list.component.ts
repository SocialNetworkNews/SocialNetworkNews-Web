import {Component, Input} from '@angular/core';
import {ApiService, TweetsEntity} from '../api.service';


@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent {
  @Input() uuid;
  data: (TweetsEntity)[][];

  constructor(private apiService: ApiService) {
    this.getYesterday();
  }

  getYesterday() {
    this.apiService.getYesterday(this.uuid)
      .subscribe(
        data => { this.data = this.chunk(data.tweets, 3); },
        err => console.error('API ERR: ', err),
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
