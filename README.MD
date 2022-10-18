# How do we approach the testing process at Quickleaf?

Each piece of software has bugs. We know this is true for every company, from Big Tech down to Quickleaf, we deal with nasty bugs in our code.

Ranging from security issues resulting in server breaches, performance issues, or merely some UI typos.
These issues will come to light, eventually, being discovered by either the QA or the end user. We do not want the latter to happen, therefore the question is how do we approach the complex testing process at Quickleaf?
Maybe you've heard of the Test Pyramid.
![image info](/img/testpyramid.png)

It represents the various layers of the testing process, each having its merits and caveats in the development process.

The foundation of this Pyramid consists of...
## Unit tests.
Unit tests are the solid base of any successful software release.
The scope of this best practice is to validate that each unit of the software code performs as documented or as expected.

Many companies such as Google require that any changes in the codebase or newly added functions should be covered by a corresponding unit test. If you wrote new code, you test it before it reaches production. 
Due to the low cost of implementation, unit tests should outnumber the rest of the test suites, end-to-end scenarios, or service tests.
The first stage of the testing process applied in the Ci/Cd method is the execution of Unit Tests.
![](/img/classicCiCd.png)

### Advantages
When running a unit test, the codebase does not need to be deployed and external services are mocked, faked or stubbed.
The execution time for a set of unit tests is about 1/10th the length of an e2e scenario. Therefore the faster the test execution, the faster the ci/cd process will be.
Having a layer of unit tests available is a safety net against introducing bugs into the codebase, while allowing the developer the liberty of refactoring the code and assuring the refactored module still works as expected.
Unit tests are less costly compared to Service Tests or UI tests.
### Disadvantages
Will not catch any issues related to service/integration layer.
Cannot catch every error in a piece of software.

It is not recommended to rely solely on unit tests because our application still depends on external services, APis or databases, therefore the next layer will be...

## Integration tests

An integration test takes two or more components of a software application and ensures those components work together correctly.
//TODO extend this part

## UI tests

The UI is the interface in which the end user communicates with a certain application.
In the case of modern web apps we have a graphical user interface(GUI).
The user should experience a flawless user interface/user experience, therefore testing must be put in place to enforce this.
Actions performed via keyboard, mouse or touch should be tested and verify they perform as expected. Page elements should be displayed and function properly. Proper data should be displayed to the user. Various states of the application should be tested as they change based on certain user roles and rights.

## Automated testing vs Manual testing
These tests can be executed by a manual tester or through an automated regression test framework. Both automated or manual regression have pros and cons.

### Automated testing advantages
Automated tests brings speed into the ci/cd development process. A developer can have his branch tested in a fraction of the time needed for a manual tester to do it. The man-hour costs associated with QA will drop over time after the succesfull implementation of a automated regression framework.
Automated testing is more geared towards a faster paced development environment with shorter sprints.
### Automated testing disadvantages
An automated regression frameworks is in essence just an application which tests another application. It will have its own subset of problems and bugs, possibly linked to the application under test.
Did you changed your front-end, well then expect to refactor your UI tests aswell.
Did the API schema for a certain service changed, then you will need to refactor your automated API/service tests aswell.
Test maintenance is a well know problem and not to be taken lightly by the QA engineer.
In conclussion automated tests are definitely more expensive then unit tests or integration tests and provide a lower return on invested time.

### Manual testing advantages
The computer does not have an eye for detail. Not everything needs/should be automated.
A manual tester would apply his knowledge of the product under test and would conduct exploratory testing. He would have a subjective approach towards the tested application. An automated script will not do that. It will just do its assertions, perhaps passing all of them, sometimes luring the developer into a false sense of security because "all tests pass".

### Manual testing disadvantages
Requires more resources and more man-hours.
We need to factor in the possibility of human error.
It is the slowest testing method, sometimes causing the release cycle to be blocked until all manual tests are done. 

A balance should exists between automated and manual testing and they should complement each other.
A mix of these two elements is perhaps...

## End to End Testing
E2e testing means testing a deployed application via its user interface.
These tests scripts will mimic a user behavior and go through the web app just like a user would.
From Login to Logout theres a myriad of scenarios the user would go through.
All of these would be covered by different tests, grouped in test suites, verifying different services or parts of the application.
Much like a spider laying its web line by line, the Qa engineer produces e2e tests. The scope of this is to catch bugs.
Each newly added test brings extended test coverage and peace of mind for the developers who can commit and deploy faster.
The more tests there are in the regression test suite, the lower is the chance for an issue to find its way in the production environment.

In the following example we will setup an end to end scenario and run it in a CI environment aka Github Actions.
For this we will need
- a Github account(dont worry, it's free);
- nodeJs https://nodejs.org/en/
- Visual Studio Code https://code.visualstudio.com/

We will use Playwright to setup our test framework.
It's a testing tool used to develop e2e, api or even unit tests; however in this case we will concenrtate on end to end testing.

We will first install the latest version of Playwright using the following command in the terminal.
 `npm init playwright@latest`
 
![](/img/playwright_init.png)

This will install all required dependencies including browsers.
Let's execute the default tests to make sure everything is okay `npx playwright test`.
You should see something like this.

![](/img/playwright_test.png)

Now, let us see the test report, let's run `npx playwright show-report`.

Next, lets modify the example test found in `/tests/example.spec.js` to look like this:

```import { test, expect } from '@playwright/test';

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
```


### Continuous Integration
Our tests need to be executed in a CI environment