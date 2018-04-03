import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  authorUUID: string;

  constructor(private route: ActivatedRoute) {
    this.authorUUID = this.route.snapshot.params.paperUUID;
  }

  ngOnInit() {
  }

}
