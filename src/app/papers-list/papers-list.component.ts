import {Component} from '@angular/core';
import {ApiService, Paper} from '../api.service';

@Component({
  selector: 'app-papers-list',
  templateUrl: './papers-list.component.html',
  styleUrls: ['./papers-list.component.scss']
})
export class PapersListComponent {
  data: (Paper)[][];

  constructor(private apiService: ApiService) {
    this.getPapers();
  }

  getPapers() {
    this.apiService.getPapers()
      .subscribe(
        data => { this.data = this.chunk(data, 3); },
        err => console.error('API ERR: ', err),
        () => console.log('done loading Papers')
      );
  }

  private chunk(arr: Paper[], size: number): (Paper)[][] {
    const newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

}
