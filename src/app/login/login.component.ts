import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {

  constructor() { }

  login() {
    // TODO implement "/api/login/twitter"
    console.log('TODO');
  }

}
