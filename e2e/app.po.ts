import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getMenu() {
    return element(by.css('app-navbar')).getText();
  }
}
