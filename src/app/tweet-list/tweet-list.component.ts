import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {
  @Input() uuid;
  data;

  constructor(private apiService: ApiService) {}

  ngOnInit() { this.getYesterday(); }

  getYesterday() {
    this.apiService.getYesterday(this.uuid)
      .subscribe(
        data => { this.data = this.chunk(data['tweets'], 3); },
        err => console.error('API ERR: ', err),
        () => console.log('done loading Yesterday')
      );
  }

  private chunk(arr, size) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

}
