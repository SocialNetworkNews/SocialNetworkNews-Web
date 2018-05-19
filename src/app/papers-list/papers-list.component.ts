import {throwError as observableThrowError, of} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {ApiService, Paper} from '../api.service';
import * as Raven from 'raven-js';
import {ToastrService} from 'ngx-toastr';
import {concat, delay, mergeMap, retryWhen, take} from 'rxjs/operators';

@Component({
  selector: 'app-papers-list',
  templateUrl: './papers-list.component.html',
  styleUrls: ['./papers-list.component.scss']
})
export class PapersListComponent implements OnInit {
  data: (Paper)[];

  constructor(private apiService: ApiService, private toastr: ToastrService) {
    Raven.captureBreadcrumb({
      message: 'Listing Papers',
      category: 'papers-list'
    });
  }

  ngOnInit() {
    this.getPapers();
  }

  getPapers() {
    this.apiService.getPapers()
      // TODO: Better variable naming
      .pipe(
        retryWhen(oerror => {
          return oerror
            .pipe(
              mergeMap((error: any) => {
                if (String(error.status).startsWith('50')) {
                  return of(error.status)
                    .pipe(
                      delay(1000)
                    );
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
        data => this.data = data,
        err => {
          this.toastr.error(err['error'], 'Error connecting API', {
            positionClass: 'toast-top-center',
            disableTimeOut: true
          });
          throw err;
        },
        () => console.log('done loading Papers')
      );
  }

}
