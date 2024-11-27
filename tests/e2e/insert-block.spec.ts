import { test, expect } from '@wordpress/e2e-test-utils-playwright';
import AxeBuilder from '@axe-core/playwright';
import path from 'path';

//
test.describe('Image Comparison block', () => {
  // Create a new post before each test
  test.beforeEach(async ({ page, admin }) => {
    // Create a new post
    await admin.createNewPost();

    // Add a title to the post
    await page.keyboard.type('Test Image Comparison Block');
  });

  test('should be added to a page, populated, and rendered', async ({ editor, page }) => {
    await test.step('add the block to the page', async () => {
      await editor.insertBlock({ name: 'bigbite/image-comparison' });

      // expect block to be visible on the page
      const imageComparisonBlock = page
        .locator('iframe[name="editor-canvas"]')
        .contentFrame()
        .locator('.wp-block-bigbite-image-comparison');

      // Assert the block is visible
      await expect(imageComparisonBlock).toBeVisible();
    });

    await test.step('add an image into slot 1', async () => {
      await page
        .locator('iframe[name="editor-canvas"]')
        .contentFrame()
        .getByRole('button', { name: 'Select Image' })
        .first()
        .click();

      await page.getByLabel('before').click();
      await page.getByRole('button', { name: 'Select', exact: true }).click();

      // Ensure the first image is added to the block
      const firstComparisonImage = page
        .locator('iframe[name="editor-canvas"]')
        .contentFrame()
        .getByLabel('Block: Image Comparison Item')
        .first();
      await expect(firstComparisonImage).toBeVisible();
    });

    await test.step('add an image into slot 2', async () => {
      await page
        .locator('iframe[name="editor-canvas"]')
        .contentFrame()
        .getByRole('button', { name: 'Select Image' })
        .first()
        .click();

      await page.getByLabel('after').click();
      await page.getByRole('button', { name: 'Select', exact: true }).click();

      // Ensure the second image is added to the block
      const secondComparisonImage = page
        .locator('iframe[name="editor-canvas"]')
        .contentFrame()
        .getByLabel('Block: Image Comparison Item')
        .nth(1);
      await expect(secondComparisonImage).toBeVisible();
    });

    await test.step('Add a caption', async () => {
      await page
        .locator('iframe[name="editor-canvas"]')
        .contentFrame()
        .getByLabel('Please enter a caption')
        .click();
      await page.keyboard.type('This is a caption');
      await expect(
        page.locator('iframe[name="editor-canvas"]').contentFrame().locator('figcaption'),
      ).toHaveText('This is a caption');
    });

    await test.step('Save and visit the page', async () => {
      // Save the page
      await page.getByRole('button', { name: 'Publish', exact: true }).click();
      await page
        .getByLabel('Editor publish')
        .getByRole('button', { name: 'Publish', exact: true })
        .click();
      // Visit the page
      await page.getByTestId('snackbar').getByRole('link', { name: 'View Post' }).click();
      // Make sure the heading is correct
      await expect(page.title()).resolves.toMatch('Test Image Comparison Block');
    });

    // Define the image comparison container
    const imageComparisonContainer = page.locator('.wp-block-bigbite-image-comparison__container');

    await test.step('Check image one is visible', async () => {
      await expect(imageComparisonContainer.locator('img').first()).toBeVisible();
    });

    await test.step('Check image two is visible', async () => {
      await expect(imageComparisonContainer.locator('img').nth(1)).toBeVisible();
    });

    await test.step('Check caption is visible', async () => {
      await expect(page.getByText('This is a caption')).toBeVisible();
    });

    await test.step('Check block for potential accessibility issues', async () => {
      // Scan the block for accessibility issues
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include('.wp-block-bigbite-image-comparison__container')
        .analyze();

      // Expect the scan to have no issues
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
