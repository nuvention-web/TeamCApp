import { MeanContactlistAngular2Page } from './app.po';

describe('jugomed App', function() {
  let page: MeanContactlistAngular2Page;

  beforeEach(() => {
    page = new MeanContactlistAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
