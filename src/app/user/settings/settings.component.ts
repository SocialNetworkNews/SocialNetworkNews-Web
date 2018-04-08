import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  authorUUID: string;

  constructor(private route: ActivatedRoute) {
    this.authorUUID = this.route.snapshot.params.paperUUID;
  }

  ngOnInit() {
  }

}
