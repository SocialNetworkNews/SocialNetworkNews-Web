import { Component } from '@angular/core';
import {AbstractLoader} from 'ng-http-loader/components/abstract.loader.component';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent extends AbstractLoader {
}
