import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
  data: Paper;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
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
