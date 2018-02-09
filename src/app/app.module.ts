import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ScrollbarModule } from './utils/scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {GalleryConfig, GalleryModule} from 'ng-gallery';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import {AppRoutingModule} from './app.routing';
import { PaperComponent } from './paper/paper.component';
import { PapersComponent } from './papers/papers.component';


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
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    ScrollbarModule,
    BrowserAnimationsModule,
    GalleryModule.forRoot(config),
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
