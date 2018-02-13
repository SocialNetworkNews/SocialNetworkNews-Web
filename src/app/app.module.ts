import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
