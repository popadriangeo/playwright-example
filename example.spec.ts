import { test, expect } from '@playwright/test';

test('Quick Leaf privacy policy verification ', async ({ page }) => {
  await page.goto('https://www.quickleaf.net/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Quickleaf - Top Custom Web/Mobile Software Development');

  // create a locator
  const privacyPolicy = page.locator('text="Privacy policy"');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(privacyPolicy).toHaveAttribute('href', 'https://www.quickleaf.net/privacy-policy/');

  const [privacyPolicyPageHandle] = await Promise.all([
    page.waitForEvent('popup'),
    privacyPolicy.click()
  ]);

  // Expects the URL to contain intro.
  await expect(privacyPolicyPageHandle).toHaveURL('https://www.quickleaf.net/privacy-policy/');
});
