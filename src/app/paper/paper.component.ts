import {Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ApiService, Paper} from '../api.service';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaperComponent implements OnInit {
  uuid: string;
  isBrowser: boolean;
  data: Paper;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private route: ActivatedRoute, private apiService: ApiService) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.uuid = this.route.snapshot.params.paperUUID;
  }

  ngOnInit() { this.getPaper(this.uuid); }

  getPaper(uuid: string) {
    this.apiService.getPaper(uuid)
      .subscribe(
        data => { this.data = data; },
        err => console.error('API ERR: ', err),
        () => console.log('done loading Paper Data')
      );
  }

}
