import {Component, Input, OnInit} from '@angular/core';
import * as Raven from 'raven-js';
import {ApiService, Paper, TweetsEntity} from '../api.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/throw';
import {ToastrService} from 'ngx-toastr';
import {Lightbox} from '../utils/lightbox';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {
  @Input() uuid;
  data: (TweetsEntity)[];
  paperData: Paper;

  constructor(private apiService: ApiService, private toastr: ToastrService, private lightbox: Lightbox) {
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
    this.getPaper();
  }
  getPaper() {
    this.apiService.getPaper(this.uuid)
      // TODO: Better variable naming
      .retryWhen(oerror => {
        return oerror
          .mergeMap((error: any) => {
            if (String(error.status).startsWith('50')) {
              return Observable.of(error.status).delay(1000);
            } else if (error.status === 404) {
              return Observable.throw({error: 'Sorry, there was an error. The Server just doesn\'t find the requested paper :('});
            }
            return Observable.throw({error: 'Unknown error'});
          })
          .take(5)
          // TODO: Allow to link to a Status Page
          .concat(Observable.throw({error: 'Sorry, there was an error (after 5 retries). This probably means we can\'t reach our API Server :('}));
      })
      .subscribe(
        data => { this.paperData = data; },
        err => {
          this.toastr.error(err['error'], 'Error connecting API', {
            positionClass: 'toast-top-center',
            disableTimeOut: true
          });
          throw err;
        },
        () => console.log('done loading Paper Data')
      );
  }

  getYesterday() {
    this.apiService.getYesterday(this.uuid)
      // TODO: Better variable naming
      .retryWhen(oerror => {
        return oerror
          .mergeMap((error: any) => {
            if (String(error.status).startsWith('50')) {
              return Observable.of(error.status).delay(1000);
            } else if (error.status === 404) {
              return Observable.throw({error: 'Sorry, there was an error. The Server just doesn\'t find any data for the requested time :('});
            }
            return Observable.throw({error: 'Unknown error'});
          })
          .take(5)
          // TODO: Allow to link to a Status Page
          .concat(Observable.throw({error: 'Sorry, there was an error (after 5 retries). This probably means we can\'t reach our API Server :('}));
      })
      .subscribe(
        data => { this.data = this.sort(data.tweets); },
        err => {
          this.toastr.error(err['error'], 'Error connecting API', {
            positionClass: 'toast-top-center',
            disableTimeOut: true
          });
          throw err;
        },
        () => console.log('done loading Yesterday')
      );
  }

  private sort(arr: (TweetsEntity)[]): (TweetsEntity)[] {
    const compare = (a, b): number  => {
      if ((a.image_urls && a.image_urls[0]) && !(b.image_urls && b.image_urls[0])) {
        return -1;
      }
      if (!(a.image_urls && a.image_urls[0]) && (b.image_urls && b.image_urls[0])) {
        return 1;
      }
      return 0;
    };

    arr.sort(compare);
    return arr;
  }

  private chunk(arr: (TweetsEntity)[], size: number): (TweetsEntity)[][] {
    // Todo sort with a point system
    const compare = (a, b): number  => {
      if ((a.image_urls && a.image_urls[0]) && !(b.image_urls && b.image_urls[0])) {
        return -1;
      }
      if (!(a.image_urls && a.image_urls[0]) && (b.image_urls && b.image_urls[0])) {
        return 1;
      }
      return 0;
    };

    arr.sort(compare);
    const newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }
}
