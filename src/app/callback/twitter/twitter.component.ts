import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/filter';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent implements OnInit {
  url: string;
  oauth_token: string;
  oauth_verifier: string;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, @Inject(DOCUMENT) private document, private http: HttpClient) {
    this.url = document.location.protocol + '//' + document.location.hostname + '/api';
  }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.order)
      .subscribe(params => {
        console.log(params);

        this.oauth_token = params.oauth_token;
        this.oauth_verifier = params.oauth_verifier;

        this.http.get(`${this.url}/login/twitter/callback?oauth_token=${this.oauth_token}&oauth_verifier=${this.oauth_verifier}`)
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
            data => {
              // TODO get accessToken Header
            },
            err => {
              this.toastr.error(err['error'], 'Error connecting API', {
                positionClass: 'toast-top-center',
                disableTimeOut: true
              });
              throw err;
            },
            () => console.log('done loading Yesterday')
          );
      });
  }

}
