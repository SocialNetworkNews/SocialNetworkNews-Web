import {Injectable} from '@angular/core';

@Injectable()
export class Lightbox {
  public hide(el) {
    el.style.display = '';
  }

  public show(el) {
    el.style.display = 'block';
  }
}
