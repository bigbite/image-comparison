const { request } = require('@playwright/test');
const { RequestUtils } = require('@wordpress/e2e-test-utils-playwright');

async function globalSetup(config) {
  const { storageState, baseURL } = config.projects[0].use;
  const storageStatePath = typeof storageState === 'string' ? storageState : undefined;
  const requestContext = await request.newContext({
    baseURL,
  });
  const requestUtils = new RequestUtils(requestContext, {
    storageStatePath,
  });

  // Authenticate and save the storageState to disk.
  await requestUtils.setupRest();

  // Reset the test environment before running the tests.
  await Promise.all([
    requestUtils.activateTheme('twentytwentyfive'),
    requestUtils.deleteAllPosts(),
    requestUtils.deleteAllBlocks(),
    requestUtils.deleteAllMedia(),
    // Prepopulate the media library with before and after images
    requestUtils.uploadMedia('./tests/assets/before.png'),
    requestUtils.uploadMedia('./tests/assets/after.png'),
    requestUtils.resetPreferences(),
  ]);
  await requestContext.dispose();
}
export default globalSetup;
