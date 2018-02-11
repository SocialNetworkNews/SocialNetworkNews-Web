import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-papers-list',
  templateUrl: './papers-list.component.html',
  styleUrls: ['./papers-list.component.scss']
})
export class PapersListComponent {
  @Input() data;

}
