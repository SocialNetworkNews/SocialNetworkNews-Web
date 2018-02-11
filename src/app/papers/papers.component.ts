import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent {
  pageTitle = 'Find Papers';
  pageSubtitle = 'Get the full blast of different Newspapers';
  testData = [{title: 'Freifunk News', uuid: 0, logoURL: 'https://blog.freifunk.net/wp-content/uploads/2017/03/Freifunk.net_.svg_.png', description: ''}];
  chunkedData = PapersComponent.chunk(this.testData, 3);
  isBrowser: boolean;

  constructor( @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  static chunk(arr, size) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

}
