import {Component, Input, OnInit} from '@angular/core';
import * as Raven from 'raven-js';
import {ApiService, TweetsEntity} from '../api.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/throw';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {
  @Input() uuid;
  data: (TweetsEntity)[];

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
        data => { this.data = data.tweets; },
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

}
