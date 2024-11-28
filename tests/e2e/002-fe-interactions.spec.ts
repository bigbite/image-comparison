import { test as base, expect } from '@wordpress/e2e-test-utils-playwright';
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

test.describe('Front end interactions', () => {
  /**
   * Create the post and populate the block before each test
   */
  test.beforeEach(async ({ blockFixtures, page, editor, admin }) => {
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

    await test.step('populate the block', async () => {
      // Select the before image for use in the first slot
      await blockFixtures.addFirstImageToBlock('before');

      // Select the after image for use in the second slot
      await blockFixtures.addFirstImageToBlock('after');

      // Add the caption
      await blockFixtures.addCaptionToBlock(
        'A bridge over a large body of water, a small boat sails underneath',
      );
    });
  });

  /**
   * Ensure the divider can be dragged horizontally on the front end, with default settings
   */
  test('test the divider can be dragged horizontally', async ({ blockFixtures, page }) => {
    await test.step('Change the starting position of the divider', async () => {
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

      // Set the divider initial position to 40%
      await page.getByRole('spinbutton', { name: 'Divider Initial Position' }).fill('40');
    });

    await test.step('Save and visit the page', async () => {
      await blockFixtures.saveVisitPage();
    });

    // Assert the starting divider position is 90%
    await expect(page.locator('.wp-block-bigbite-image-comparison')).toHaveAttribute(
      'style',
      new RegExp('--bigbite-image-comparison-divider-initial-position: 40'),
    );

    // Define the elements to be used
    const dividerButton = page.locator('.wp-block-bigbite-image-comparison__divider > button');
    const imageComparisonContainer = page.locator('.wp-block-bigbite-image-comparison__container');

    // Set the container bounding box
    const containerBoundingBox = await imageComparisonContainer.boundingBox();

    await test.step('Drag the divider to 80% of the container', async () => {
      const containerWidth = containerBoundingBox?.width ?? 0;
      const xPosition = Math.round((80 / 100) * containerWidth);
      await dividerButton.dragTo(imageComparisonContainer, {
        force: true,
        targetPosition: { x: xPosition, y: 0 },
      });
    });

    // Assert that the CSS custom property has set to 80 correctly
    await expect(page.locator('.wp-block-bigbite-image-comparison')).toHaveAttribute(
      'style',
      new RegExp('--bigbite-image-comparison-divider-initial-position: 80'),
    );

    await test.step('Drag the divider to 20% of the container', async () => {
      const containerWidth = containerBoundingBox?.width ?? 0;
      const xPosition = Math.round((20 / 100) * containerWidth);
      await dividerButton.dragTo(imageComparisonContainer, {
        force: true,
        targetPosition: { x: xPosition, y: 0 },
      });
    });

    // Assert that the CSS custom property has set to 20 correctly
    await expect(page.locator('.wp-block-bigbite-image-comparison')).toHaveAttribute(
      'style',
      new RegExp('--bigbite-image-comparison-divider-initial-position: 20'),
    );
  });

  /**
   * Ensure the divider can be dragged vertically on the front end, with other default settings
   */
  test('test the divider can be dragged vertically', async ({ blockFixtures, editor, page }) => {
    await test.step('Set the block to have a horizontal divider', async () => {
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

      // Then select the horizontal option for the divider axis attribbute
      await page.getByLabel('Horizontal').click();

      // Set the divider initial position to 90%
      await page.getByRole('spinbutton', { name: 'Divider Initial Position' }).fill('90');
    });

    await test.step('Save and visit the page', async () => {
      await blockFixtures.saveVisitPage();
    });

    // Assert the starting divider position is 90%
    await expect(page.locator('.wp-block-bigbite-image-comparison')).toHaveAttribute(
      'style',
      new RegExp('--bigbite-image-comparison-divider-initial-position: 90'),
    );

    // Define the elements to be used
    const dividerButton = page.locator('.wp-block-bigbite-image-comparison__divider > button');
    const imageComparisonContainer = page.locator('.wp-block-bigbite-image-comparison__container');

    // Set the container bounding box
    const containerBoundingBox = await imageComparisonContainer.boundingBox();

    await test.step('Drag the divider to 75% of the container', async () => {
      const containerHeight = containerBoundingBox?.height ?? 0;
      const yPosition = Math.round((75 / 100) * containerHeight);
      await dividerButton.dragTo(imageComparisonContainer, {
        force: true,
        targetPosition: { x: 0, y: yPosition },
      });
    });

    // Assert that the CSS custom property has set to 75 correctly
    await expect(page.locator('.wp-block-bigbite-image-comparison')).toHaveAttribute(
      'style',
      new RegExp('--bigbite-image-comparison-divider-initial-position: 74.9'),
    );

    await test.step('Drag the divider to 25% of the container', async () => {
      const containerHeight = containerBoundingBox?.height ?? 0;
      const yPosition = Math.round((25 / 100) * containerHeight);
      await dividerButton.dragTo(imageComparisonContainer, {
        force: true,
        targetPosition: { x: 0, y: yPosition },
      });
    });

    // Assert that the CSS custom property has set to 25 correctly
    await expect(page.locator('.wp-block-bigbite-image-comparison')).toHaveAttribute(
      'style',
      new RegExp('--bigbite-image-comparison-divider-initial-position: 24.9'),
    );
  });
});
