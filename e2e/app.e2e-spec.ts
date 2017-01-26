import { Ng2TetrisPage } from './app.po';

describe('ng2-tetris App', function() {
  let page: Ng2TetrisPage;

  beforeEach(() => {
    page = new Ng2TetrisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
