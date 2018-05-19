
import {throwError as observableThrowError, of} from 'rxjs';
import {Component, Input, OnInit} from '@angular/core';
import * as Raven from 'raven-js';
import {ApiService, Paper, TweetsEntity} from '../api.service';
import {ToastrService} from 'ngx-toastr';
import {Meta, Title} from '@angular/platform-browser';
import {Lightbox} from '../utils/lightbox';
import {concat, delay, mergeMap, retryWhen, take} from 'rxjs/operators';



@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit {
  @Input() uuid;
  data: (TweetsEntity)[];
  paperData: Paper;

  constructor(private apiService: ApiService, private toastr: ToastrService, private lightbox: Lightbox, private metaService: Meta, private titleService: Title) {
    Raven.captureBreadcrumb({
      message: 'Showing Paper',
      category: 'paper',
      data: {
        uuid: this.uuid
      }
    });
  }

  ngOnInit() {
    // Get API
    this.getYesterday();
    this.getPaper();
  }
  getPaper() {
    this.apiService.getPaper(this.uuid)
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
                } else if (error.status === 404) {
                  return observableThrowError({error: 'Sorry, there was an error. The Server just doesn\'t find the requested paper :('});
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
          this.paperData = data;
          // Set Meta Tags
          this.metaService.addTags([
            { name: 'og:title', content: this.paperData.name },
            { name: 'og:description', content: this.paperData.description },
            { name: 'og:image', content: this.paperData.paper_image },
            { name: 'description', content: this.paperData.description },
            // TODO Disabled until Author API Implemented
            // { name: 'author', content: this.paperData.author.username },
          ]);
          this.titleService.setTitle( this.paperData.name );
        },
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
      .pipe(
        retryWhen(oerror => {
          return oerror
            .pipe(
              mergeMap((error: any) => {
                if (String(error.status).startsWith('50')) {
                  return of(error.status)
                    .pipe(delay(1000));
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
}
