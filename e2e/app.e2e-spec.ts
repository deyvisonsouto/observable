import { AngularreactivePage } from './app.po';

describe('angularreactive App', () => {
  let page: AngularreactivePage;

  beforeEach(() => {
    page = new AngularreactivePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
