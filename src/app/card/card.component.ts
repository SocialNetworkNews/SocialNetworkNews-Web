import {Component, Input} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title;
  @Input() image;
  @Input() link;
  @Input() text;
  @Input() retweet?;
  @Input() retweets?;
  @Input() favs?;
  @Input() created_at?;

  currentUrl: string;

  constructor(private router: Router) {
    router.events.subscribe((value) => {
      if (value instanceof NavigationEnd ) {
        this.currentUrl = value.url;
      }
    });
  }

  hide(el) {
    el.style.display = '';
  }

  goTo(el): void {
    el.style.display = 'block';
  }
}
