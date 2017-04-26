import { BtpnFinalPage } from './app.po';

describe('btpn-final App', () => {
  let page: BtpnFinalPage;

  beforeEach(() => {
    page = new BtpnFinalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
