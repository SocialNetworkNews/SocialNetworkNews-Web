import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'ngx-avatar';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {AppRoutingModule} from './app.routing';
import { PaperComponent } from './paper/paper.component';
import { PapersComponent } from './papers/papers.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { PapersListComponent } from './papers-list/papers-list.component';

import { ApiService } from './api.service';

import * as Raven from 'raven-js';
import {ToastrModule} from 'ngx-toastr';
import { CardComponent } from './card/card.component';
import {NgHttpLoaderModule} from 'ng-http-loader/ng-http-loader.module';
import { SpinnerComponent } from './spinner/spinner.component';
Raven
  .config('https://b760c9f9035c472998ada3a02dcc81d3@sentry.io/294520', {
    environment: 'development',
    debug: true,
    autoBreadcrumbs: true
  })
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any ): void {
    if (err instanceof Error) {
      Raven.captureException(err);
    } else {
      Raven.captureException(new Error(JSON.stringify(err)));
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PaperComponent,
    PapersComponent,
    TweetListComponent,
    PapersListComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'snn-app'}),
    // MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    AvatarModule,
    HttpClientModule,
    NgHttpLoaderModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    ApiService,
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SpinnerComponent,
  ],
})
export class AppModule { }
