import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ScrollbarModule } from './utils/scrollbar';
import {GalleryConfig, GalleryModule} from 'ng-gallery';
import { AvatarModule } from 'ngx-avatar';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {AppRoutingModule} from './app.routing';
import { PaperComponent } from './paper/paper.component';
import { PapersComponent } from './papers/papers.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { PapersListComponent } from './papers-list/papers-list.component';

import { ApiService } from './api.service';
import {ServiceWorkerModule} from '@angular/service-worker';

import * as Raven from 'raven-js';
Raven
  .config('https://b760c9f9035c472998ada3a02dcc81d3@sentry.io/294520', {
    environment: 'development',
    debug: true,
  })
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any ): void {
    Raven.captureException(err);
  }
}

export const config: GalleryConfig = {
  'gestures': true,
  'thumbnails': null,
  'navigation': null,
  'imageSize': 'contain',
  'style': {
    'width': '57rem',
    'height': '32rem',
    'padding-top': '2rem'
  },
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PaperComponent,
    PapersComponent,
    TweetListComponent,
    PapersListComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'snn-app'}),
    ServiceWorkerModule.register('/ngsw-worker.js'),
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    ScrollbarModule,
    BrowserAnimationsModule,
    GalleryModule.forRoot(config),
    AvatarModule,
    HttpClientModule,
  ],
  providers: [
    ApiService,
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
