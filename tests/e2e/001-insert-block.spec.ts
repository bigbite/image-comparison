import { test as base, expect } from '@wordpress/e2e-test-utils-playwright';
import AxeBuilder from '@axe-core/playwright';
import { BlockFixtures } from '../config/block-fixtures';

// Extend basic test by providing a "blockFixtures" fixture.
const test = base.extend<{ blockFixtures: BlockFixtures }>({
  blockFixtures: async ({ page }, use) => {
    // Set up the fixture.
    const blockFixtures = new BlockFixtures(page);

    // Use the fixture value in the test.
    await use(blockFixtures);
  },
});

test.describe('Image Comparison block', () => {
  // Create a new post before each test
  test.beforeEach(async ({ page, admin, editor }) => {
    // Create a new post
    await admin.createNewPost();

    // Add a title to the post
    await page.keyboard.type('Test Image Comparison Block');

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
  });

  /**
   * Test to ensure the block can be fully populated and rendered
   */
  test('should be added to a page, populated, and rendered', async ({ blockFixtures, page }) => {
    await test.step('add an image into slot 1', async () => {
      // Select the before image for use in the first slot
      await blockFixtures.addImageToAvailableSlot('before');

      // Ensure the first image is added to the block
      const firstComparisonImage = page
        .locator('iframe[name="editor-canvas"]')
        .contentFrame()
        .getByLabel('Block: Image Comparison Item')
        .first();
      await expect(firstComparisonImage).toBeVisible();

      // Expect that the correct image is used
      await expect(firstComparisonImage.getByRole('img')).toHaveAttribute('src', /before/i);
    });

    await test.step('add an image into slot 2', async () => {
      // Select the after image for use in the second slot
      await blockFixtures.addImageToAvailableSlot('after');

      // Ensure the second image is added to the block
      const secondComparisonImage = page
        .locator('iframe[name="editor-canvas"]')
        .contentFrame()
        .getByLabel('Block: Image Comparison Item')
        .nth(1);
      await expect(secondComparisonImage).toBeVisible();

      // Expect that the correct image is used
      await expect(secondComparisonImage.getByRole('img')).toHaveAttribute('src', /after/i);
    });

    await test.step('Add a caption', async () => {
      await blockFixtures.addCaptionToBlock(
        'A bridge over a large body of water, a small boat sails underneath',
      );

      await expect(
        page.locator('iframe[name="editor-canvas"]').contentFrame().locator('figcaption'),
      ).toHaveText('A bridge over a large body of water, a small boat sails underneath');
    });

    await test.step('Save and visit the page', async () => {
      await blockFixtures.saveVisitPage();

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
      await expect(
        page.getByText('A bridge over a large body of water, a small boat sails underneath'),
      ).toBeVisible();
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

  /**
   * Test to ensure if the block is not populated, it is not rendered
   */
  test('should not be rendered with no images populated', async ({ blockFixtures, page }) => {
    await test.step('Save and visit the page', async () => {
      await blockFixtures.saveVisitPage();

      // Make sure the heading is correct
      await expect(page.title()).resolves.toMatch('Test Image Comparison Block');
    });

    // Define the image comparison container
    const imageComparisonContainer = page.locator('.wp-block-bigbite-image-comparison__container');

    await test.step('Ensure block is not present', async () => {
      await expect(imageComparisonContainer).not.toBeVisible();
    });
  });

  /**
   * Test to ensure if the block is partially populated (first image only), it is not rendered
   */
  test('should not be rendered with only the first image populated', async ({
    blockFixtures,
    page,
  }) => {
    await test.step('add an image into slot 1', async () => {
      // Select the before image for use in the first slot
      await blockFixtures.addImageToAvailableSlot('before');

      // Ensure the first image is added to the block
      const firstComparisonImage = page
        .locator('iframe[name="editor-canvas"]')
        .contentFrame()
        .getByLabel('Block: Image Comparison Item')
        .first();
      await expect(firstComparisonImage).toBeVisible();

      // Expect that the correct image is used
      await expect(firstComparisonImage.getByRole('img')).toHaveAttribute('src', /before/i);
    });

    await test.step('Save and visit the page', async () => {
      await blockFixtures.saveVisitPage();

      // Make sure the heading is correct
      await expect(page.title()).resolves.toMatch('Test Image Comparison Block');
    });

    // Define the image comparison container
    const imageComparisonContainer = page.locator('.wp-block-bigbite-image-comparison__container');

    await test.step('Ensure block is not present', async () => {
      await expect(imageComparisonContainer).not.toBeVisible();
    });
  });

  /**
   * Test to ensure if the block is partially populated (second image only), it is not rendered
   */
  test('should not be rendered with only the second image populated', async ({
    blockFixtures,
    editor,
    page,
  }) => {
    await test.step('add the block to the page', async () => {});

    await test.step('add an image into slot 2', async () => {
      // Select the after image for use in the second slot
      await blockFixtures.addImageToSecondSlot('after');

      // Ensure the second image is added to the block
      const secondComparisonImage = page
        .locator('iframe[name="editor-canvas"]')
        .contentFrame()
        .getByLabel('Block: Image Comparison Item')
        .nth(1);
      await expect(secondComparisonImage).toBeVisible();

      // Expect that the correct image is used
      await expect(secondComparisonImage.getByRole('img')).toHaveAttribute('src', /after/i);
    });

    await test.step('Save and visit the page', async () => {
      await blockFixtures.saveVisitPage();

      // Make sure the heading is correct
      await expect(page.title()).resolves.toMatch('Test Image Comparison Block');
    });

    // Define the image comparison container
    const imageComparisonContainer = page.locator('.wp-block-bigbite-image-comparison__container');

    await test.step('Ensure block is not present', async () => {
      await expect(imageComparisonContainer).not.toBeVisible();
    });
  });

  /**
   * Test to ensure custom block sizes are rendered
   */
  test('should be altered and rendered at 250px x 250px', async ({
    blockFixtures,
    editor,
    page,
  }) => {
    await test.step('Add the images', async () => {
      await blockFixtures.addImageToAvailableSlot('before');
      await blockFixtures.addImageToAvailableSlot('after');
    });

    await test.step('Adjust the width and height of the block', async () => {
      // Select the outer block

      await page
        .locator('iframe[name="editor-canvas"]')
        .contentFrame()
        .getByLabel('Block: Image Comparison', { exact: true })
        .click();

      // Check if the Settings panel is open
      const isSettingsPanelOpen = await page.getByLabel('Editor settings').isVisible();

      // If not, click the Settings panel button
      if (!isSettingsPanelOpen) {
        await page.getByLabel('Settings', { exact: true }).click();
      }

      // Check if the Block tab is selected
      const isBlockTabSelected =
        (await page.getByRole('tab', { name: 'Block' }).getAttribute('aria-selected')) === 'true';

      // If not, select the Block tab
      if (!isBlockTabSelected) {
        await page.getByRole('tab', { name: 'Block' }).click();
      }

      // Set the width and height to 250px
      await page.getByLabel('Width').fill('250');
      await page.getByLabel('Height').fill('250');
    });

    await test.step('Save and visit the page', async () => {
      await blockFixtures.saveVisitPage();

      // Make sure the heading is correct
      await expect(page.title()).resolves.toMatch('Test Image Comparison Block');
    });

    await test.step('Confirm the size of the container is 250px x 250px', async () => {
      // Define the container
      const imageComparisonContainer = page.locator(
        '.wp-block-bigbite-image-comparison__container',
      );

      // Get the container bounding box
      const containerBoundingBox = await imageComparisonContainer.boundingBox();

      // Assert the container width and height match the expected values
      expect(containerBoundingBox?.width).toEqual(250);
      expect(containerBoundingBox?.height).toEqual(250);
    });
  });
});
