import {Component} from '@angular/core';
import {ApiService, Paper} from '../api.service';
import * as Raven from 'raven-js';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/retryWhen';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-papers-list',
  templateUrl: './papers-list.component.html',
  styleUrls: ['./papers-list.component.scss']
})
export class PapersListComponent {
  data: (Paper)[][];

  constructor(private apiService: ApiService, private toastr: ToastrService) {
    Raven.captureBreadcrumb({
      message: 'Listing Papers',
      category: 'papers-list'
    });
    this.getPapers();
  }

  getPapers() {
    this.apiService.getPapers()
      // TODO: Better variable naming
      .retryWhen(oerror => {
        return oerror
          .flatMap((error: any) => {
            if (error.status.startsWith('50')) {
              return Observable.of(error.status).delay(1000);
            }
            return Observable.throw({error: 'No retry'});
          })
          .take(5)
          .concat(Observable.throw({error: 'Sorry, there was an error (after 5 retries)'}));
      })
      .subscribe(
        data => { this.data = this.chunk(data, 3); },
        err => {
          this.toastr.error(err, 'Error connecting API', {
            positionClass: 'toast-top-center'
          });
          throw err;
        },
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
