import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaperComponent {
  paperTitle = 'Test Paper';
  paperSubtitle = 'Something to test';
  testData = [{title: 'Simon Wüllhorst', 'userLink': 'https://twitter.com/des_cilla', text: 'Yaay, neue LTE-Antennen sind da. Es gibt bald endlich wieder schnelles Internet auf dem Dorf. :) #Freifunk', imageURL: 'https://pbs.twimg.com/media/DVmb2UCWsAA8oTD.jpg', createdAt: '09.02.2018', replies: 0, favs: 2, retweets: 1}, {title: 'Jason Scott', retweet: true, 'userLink': 'https://twitter.com/textfiles', imageURL: 'https://pbs.twimg.com/media/DVZ5gw0U0AA_mOu.jpg', createdAt: '07.02.2018', replies: 75, favs: 8003, retweets: 2813}, {title: 'Christian Dresel', 'userLink': 'https://twitter.com/DreselChristian', text: 'Soviel Richtfunk (blaue Linien)... soooo geiiiilllll :) @freifunk @FreifunkFranken #freifunk', imageURL: 'https://pbs.twimg.com/media/DViJcIRX0AAk1TT.jpg:large', createdAt: '08.02.2018', replies: 1, favs: 3, retweets: 0}];
  chunkedData = PaperComponent.chunk(this.testData, 3);

  constructor() { }

  static chunk(arr, size) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }
}
