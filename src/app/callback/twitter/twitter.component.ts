import {throwError as observableThrowError, of} from 'rxjs';
import {delay, mergeMap, retryWhen, take, concat} from 'rxjs/operators';
import {Component, Inject, OnInit, Optional} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {HttpClient} from '@angular/common/http';
import {APP_BASE_HREF, DOCUMENT} from '@angular/common';
import {ApiService} from '../../api.service';
@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent implements OnInit {
  url: string;
  oauth_token: string;
  oauth_verifier: string;

  constructor(private apiService: ApiService, private toastr: ToastrService, private route: ActivatedRoute, @Inject(DOCUMENT) private document, private http: HttpClient, private router: Router) {
    this.url = document.location.protocol + '//' + document.location.hostname + '/api';
    this.apiService.inCallback = true;
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);

        this.oauth_token = params.oauth_token;
        this.oauth_verifier = params.oauth_verifier;

        this.http.get(`${this.url}/login/twitter/callback?oauth_token=${this.oauth_token}&oauth_verifier=${this.oauth_verifier}`, { observe: 'response' })
          .pipe(
            // TODO: Better variable naming
            retryWhen(oerror => {
              return oerror
                .pipe(
                  mergeMap((error: any) => {
                    if (String(error.status).startsWith('50')) {
                      return of(error.status)
                        .pipe(
                          delay(1000)
                        );
                    } else if (error.status === 404) {
                      return observableThrowError({error: 'Sorry, there was an error. The Server just doesn\'t find any data for the requested time :('});
                    }
                    return observableThrowError({error: 'Unknown error'});
                  }),
                  take(5),
                  // TODO: Allow to link to a Status Page
                  concat(observableThrowError({error: 'Sorry, there was an error (after 5 retries). This probably means we can\'t reach our API Server :('}))
                );
            })
          )
          .subscribe(
          data => {
            this.apiService.userUUID = data.headers.get('UUID');

            // TODO redirect to the Profile instead of home page
            this.apiService.inCallback = false;
            this.router.navigate(['/']);
          },
          err => {
            this.toastr.error(err['error'], 'Error connecting API', {
              positionClass: 'toast-top-center',
              disableTimeOut: true
            });
            throw err;
          },
          () => console.log('done making callback')
        );
      });
  }

}
