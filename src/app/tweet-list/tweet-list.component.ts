import {Component, Input, OnInit} from '@angular/core';
import * as Raven from 'raven-js';
import {ApiService, TweetsEntity} from '../api.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/observable/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {
  @Input() uuid;
  data: (TweetsEntity)[][];

  constructor(private apiService: ApiService, private toastr: ToastrService) {
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
      // TODO: Better variable naming
      .retryWhen(oerror => {
        return oerror
          .mergeMap((error: any) => {
            if (error.status.startsWith('50')) {
              return Observable.of(error.status).delay(1000);
            }
            return Observable.throw({error: 'No retry'});
          })
          .take(5)
          .concat(Observable.throw({error: 'Sorry, there was an error (after 5 retries)'}));
      })
      .subscribe(
        data => { this.data = this.chunk(data.tweets, 3); },
        err => {
          this.toastr.error(err, 'Error connecting API', {
            positionClass: 'toast-top-center'
          });
          throw err;
        },
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
