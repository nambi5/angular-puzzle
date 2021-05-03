import { $, $$, browser, ElementFinder, ExpectedConditions } from 'protractor';

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

  it('Then: I should be able to mark my reading finished in list', async () => {
    
    if(await $$('#markAsRead').isPresent()){
      const allBooksToBeFinished = await $$('#markAsRead');

      await allBooksToBeFinished[0].click();
      expect(allBooksToBeFinished.length-1).toBe((await $$('#markAsRead')).length)
    }

  });
});
