/// <reference path="../../node_modules/bugsnag-js/types/global.d.ts" />
import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ScrollbarModule } from './utils/scrollbar';
import {GalleryConfig, GalleryModule} from 'ng-gallery';
import { AvatarModule } from 'ngx-avatar';
// import BugsnagErrorHandler from './app.error_handler';
// import bugsnag from 'bugsnag-js';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {AppRoutingModule} from './app.routing';
import { PaperComponent } from './paper/paper.component';
import { PapersComponent } from './papers/papers.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { PapersListComponent } from './papers-list/papers-list.component';

import { ApiService } from './api.service';
import {environment} from '../environments/environment';
import {ServiceWorkerModule} from '@angular/service-worker';

// configure Bugsnag ASAP, before any other imports
/*const bugsnagClient = bugsnag({
  apiKey: '3113c2b141e7146cce7d4da6707578ff',
  appVersion: '0.0.1',
  autoCaptureSessions: true,
  releaseStage: 'development',
  notifyReleaseStages: [ 'development', 'production'],
});*/

// create a factory which will return the bugsnag error handler
/*export function errorHandlerFactory() {
  return new BugsnagErrorHandler(bugsnagClient);
}*/

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
    // { provide: ErrorHandler, useFactory: errorHandlerFactory },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
