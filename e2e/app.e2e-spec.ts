import { AppPage } from './app.po';

describe('social-networks-news-web2 App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a menu', () => {
    page.navigateTo();
    expect(page.getMenu()).toBeDefined();
  });
});
