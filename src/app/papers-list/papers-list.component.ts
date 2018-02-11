import {Component, Input} from '@angular/core';
import {TweetListComponent} from '../tweet-list/tweet-list.component';

@Component({
  selector: 'app-papers-list',
  templateUrl: './papers-list.component.html',
  styleUrls: ['./papers-list.component.scss']
})
export class PapersListComponent {
  @Input() papersData: object[];
  chunkedData = TweetListComponent.chunk(this.papersData, 3);
  constructor() { }

  static chunk(arr, size) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

}
