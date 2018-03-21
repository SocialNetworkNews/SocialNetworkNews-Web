import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUrl: string;
  constructor(router: Router) {
    router.events.subscribe((value) => {
      if (value instanceof NavigationEnd ) {
        this.currentUrl = value.url;
      }
    });
  }

  checkCurrent(path = '/'): string {
    const active =  (this.currentUrl === path) ? null : 'active';
    console.log('Route: ' + path + ' Current: ' + this.currentUrl +  ' Active?: ' + active);
    return active;
  }

}
