import { defineConfig } from '@playwright/test';

// Require the wp-scripts Playwright config
const baseConfig = require('@wordpress/scripts/config/playwright.config.js');

const config = defineConfig({
  ...baseConfig,
  // Specific test folder, if required
  testDir: './tests/e2e',
  globalSetup: './tests/config/global-setup.ts',
});
export default config;
