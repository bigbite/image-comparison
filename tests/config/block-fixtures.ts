import type { Page, Locator } from '@playwright/test';

export class BlockFixtures {
  constructor(public readonly page: Page) {
    //
  }

  /**
   * Adds an image to the first image slot in a block by selecting it from the media library.
   *
   * @param imageLabel - The aria-label of the image to select from the media library
   *
   * @usage - await blockFixtures.addImageToAvailableSlot('My Image');
   */
  async addImageToAvailableSlot(imageLabel: string) {
    await this.page
      .locator('iframe[name="editor-canvas"]')
      .contentFrame()
      .getByRole('button', { name: 'Select Image' })
      .first()
      .click();

    // Get the aria-checked attribute of the image
    const isImageSelected = await this.page.getByLabel(imageLabel).getAttribute('aria-checked');

    // If the image is not already selected, select it
    if (isImageSelected === 'false') {
      await this.page.getByLabel(imageLabel).click();
    }

    // Press the Select button to use the image
    await this.page.getByRole('button', { name: 'Select', exact: true }).click();
  }

  /**
   * Adds an image to the second image slot in a block by selecting it from the media library.
   *
   * @param imageLabel - The aria-label of the image to select from the media library
   *
   * @usage - await blockFixtures.addImageToSecondSlot('My Image');
   */
  async addImageToSecondSlot(imageLabel: string) {
    await this.page
      .locator('iframe[name="editor-canvas"]')
      .contentFrame()
      .getByRole('button', { name: 'Select Image' })
      .nth(1)
      .click();

    // Get the aria-checked attribute of the image
    const isImageSelected = await this.page.getByLabel(imageLabel).getAttribute('aria-checked');

    // If the image is not already selected, select it
    if (isImageSelected === 'false') {
      await this.page.getByLabel(imageLabel).click();
    }

    // Press the Select button to use the image
    await this.page.getByRole('button', { name: 'Select', exact: true }).click();
  }

  /**
   * Selects the empty caption and populates it with provided text
   *
   * @param caption - The text to be added as the caption
   *
   * @usage - await blockFixtures.addCaptionToBlock('Some caption text');
   */
  async addCaptionToBlock(caption: string) {
    await this.page
      .locator('iframe[name="editor-canvas"]')
      .contentFrame()
      .getByLabel('Please enter a caption')
      .click();
    await this.page.keyboard.type(caption);
  }

  /**
   * Saves the page and then clicks the snackbar to view the front end
   *
   * @usage - await blockFixtures.saveVisitPage();
   */
  async saveVisitPage() {
    // Save the page
    await this.page.getByRole('button', { name: 'Publish', exact: true }).click();
    await this.page
      .getByLabel('Editor publish')
      .getByRole('button', { name: 'Publish', exact: true })
      .click();

    // Visit the page
    await this.page.getByTestId('snackbar').getByRole('link', { name: 'View Post' }).click();
  }
}
