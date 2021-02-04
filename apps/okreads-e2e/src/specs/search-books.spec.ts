import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: Use the search feature', () => {
  it('Then: I should be able to search books by title', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('java');
    await form.submit();

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);
  });
  
  it('Then: I should be able move a book to reading list', async () => {
    await browser.wait(ExpectedConditions.presenceOf($('#wantToRead[ng-reflect-disabled=false]')));
    const disabledWantToRead = await $$("#wantToRead[ng-reflect-disabled=true]");

    await $('#wantToRead[ng-reflect-disabled=false]').click();

    expect((await $$("#wantToRead[disabled='true']")).length).toBe(disabledWantToRead.length+1);
  });

  it('Then: I should see search results as I am typing', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const input = await $('input[type="search"]');
    await input.sendKeys('java');

    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);
  });
});
