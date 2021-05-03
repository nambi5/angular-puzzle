import { $, $$, browser, by, element, ExpectedConditions } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
  it('Then: Remove first item from reading list', async () => {
    if (await $$('[data-testing="remove-list-item"]').isPresent()) {
      const bookList = await $$('[data-testing="remove-list-item"]');

      bookList[0].click();

      expect(bookList.length - 1).toBe(
        (await $$('[data-testing="remove-list-item"]')).length
      );
    }
  });
  it('Then: Undo Removed item from reading list', async () => {
    const bookList = await $$('[data-testing="remove-list-item"]');
    const undoButton = await $('simple-snack-bar button');

    bookList[0].click();
    undoButton.click();
    browser.sleep(1000);
    expect(bookList.length).toBe(
      (await $$('[data-testing="remove-list-item"]')).length 
      );
  });
});
