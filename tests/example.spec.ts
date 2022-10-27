import { test, expect } from '@playwright/test';

test('Quick Leaf privacy policy verification ', async ({ page }) => {
  // reaches the tested page
  await page.goto('https://www.quickleaf.net/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Quickleaf - Top Custom Web/Mobile Software Development');

  // create a locator
  const privacyPolicy = page.locator('text="Privacy policy"');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(privacyPolicy).toHaveAttribute('href', 'https://www.quickleaf.net/privacy-policy/');

  //clicks on privacy policy button and verifies new popup page
  const [privacyPolicyPageHandle] = await Promise.all([
    page.waitForEvent('popup'),
    privacyPolicy.click()
  ]);

  // Verifies page redirects to the appropriate Url
  await expect(privacyPolicyPageHandle).toHaveURL('https://www.quickleaf.net/privacy-policy/');

  //Declare privacy policy locator and Accepts Privacy Policy
  const acceptPrivacyPolicy = page.locator('text="Accept"');
  await acceptPrivacyPolicy.click();
});
