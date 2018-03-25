import {Component, OnInit} from '@angular/core';
import {ApiService, Paper} from '../api.service';
import * as Raven from 'raven-js';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/throw';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

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

  hide(el) {
    el.style.display = '';
  }

  show(el): void {
    el.style.display = 'block';
  }

  ngOnInit() {
    this.getPapers();
  }

  getPapers() {
    this.apiService.getPapers()
      // TODO: Better variable naming
      .retryWhen(oerror => {
        return oerror
          .mergeMap((error: any) => {
            if (String(error.status).startsWith('50')) {
              return Observable.of(error.status).delay(1000);
            }
            return Observable.throw({error: 'Unknown error'});
          })
          .take(5)
          // TODO: Allow to link to a Status Page
          .concat(Observable.throw({error: 'Sorry, there was an error (after 5 retries). This probably means we can\'t reach our API Server :('}));
      })
      .subscribe(
        data => { this.data = data; console.log(JSON.stringify(data)); },
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
