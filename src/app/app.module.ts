import { BrowserModule } from '@angular/platform-browser';
import {APP_ID, ErrorHandler, Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Raven from 'raven-js';
import {ToastrModule} from 'ngx-toastr';
import {NgHttpLoaderModule} from 'ng-http-loader';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {AppRoutingModule} from './app.routing';
import { PaperComponent } from './paper/paper.component';
import { PapersComponent } from './papers/papers.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { PapersListComponent } from './papers-list/papers-list.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SettingsComponent } from './user/settings/settings.component';
import { TwitterComponent as CallbackTwitterComponent } from './callback/twitter/twitter.component';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { ApiService } from './api.service';

import {Lightbox} from './utils/lightbox';
import {LinkifyPipe} from './utils/linkifier';
import { NavbarComponent } from './navbar/navbar.component';
import {isPlatformBrowser} from '@angular/common';
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
    SpinnerComponent,
    LinkifyPipe,
    LoginComponent,
    CallbackTwitterComponent,
    ProfileComponent,
    SettingsComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'snn-app'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    ToastrModule.forRoot(),
    MatCardModule,
    MatButtonModule,
  ],
  providers: [
    ApiService,
    Lightbox,
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SpinnerComponent,
  ],
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
