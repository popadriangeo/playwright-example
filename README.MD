# How do we approach the testing process at Quickleaf?

Each piece of software has bugs. We know this is true for every company, from Big Tech down to Quickleaf, we deal with nasty bugs in our code.
Ranging from security issues resulting in server breaches, performance issues, or merely some UI typos.

Eventually, these issues will come to light, being discovered by either the QA or the end user.<br> We do not want the latter to happen, therefore the question is how do we approach the complex testing process at Quickleaf?

Maybe you've heard of the Test Pyramid. It's a concept related to Agile development.

![](/img/testpyramid.png)

It represents the various layers of the testing process, each having its merits and caveats in the development process.

The foundation of this Pyramid consists of...
## Unit tests

Unit tests are the solid base of any successful software release.
The scope of this best practice is to validate that each unit of the software code performs as documented or as expected.

Many companies such as Google require that any changes in the codebase or newly added functions should be covered by a corresponding unit test.<br> If you wrote new code, you test it, by writing a new unit test as coverage.
Due to the low cost of implementation, unit tests should outnumber the rest of the test suites, end-to-end scenarios, or service tests.<br>
The first stage of the testing process applied in the CI/CD method is the execution of Unit Tests.<br>

![](/img/CICD-pipeline-1024x354.webp)

### Advantages

When executing a unit test, the codebase does not need to be deployed and external services are mocked, faked, or stubbed.<br>
The execution time for a set of unit tests is considerably lower than the execution time for an end-to-end scenario, so Unit tests are less costly compared to Service Tests or UI tests.<br>
Improving the speed of the test execution results in a faster CI/CD process.
Having a layer of unit tests available is a safety net against introducing bugs into the codebase,<br> while allowing the developer the liberty of refactoring the code and assuring the refactored module still works as expected.

### Disadvantages

Will not catch any issues related to the service/integration layer.
Cannot catch every error in a piece of software.

It is not recommended to rely solely on unit tests because our application still depends on external services, APIs, or databases, therefore the next layer will be...

## Integration tests

Any modern app is split into layers, which is a good thing.
Testing each layer by mocking other parts of the app(like in unit testing) is good, but not enough.
An integration test takes two or more components of a software application and ensures these bigger units work together correctly. 

These tests can prove to be quite valuable to validate a **real** environment and make sure the thing works properly as a whole.

**API** testing is a subset of integration testing which determines if the API meets a set of expectations determined by usability, reliability, and functionality factors.
Let us look at an API test.
In the following example we will verify:
- reaching a test endpoint 
- receiving the proper response data
- validating a certain HTTP status code.
  
Node packages needed are:

[Chai](https://www.npmjs.com/package/chai), a BDD/TDD assertion library - `npm install --save-dev chai`

[Mocha](https://mochajs.org/) - `npm install mocha`

[Supertest](https://www.npmjs.com/package/supertest), an HTTP library - `npm install --save-dev supertest`

```const request = require('supertest')('https://api.open-meteo.com/v1');
const assert = require('chai').assert;

describe('Weather Forecast Api', () => {
  it('GET /forecast', () => {
    return request
       // Make a GET request to /forecast route
      .get('/forecast?latitude=52.52&longitude=13.41')
      // Assert 200 HTTP response code
      .expect(200).expect('Content-Type', /json/)
      .then((res) => {
        // Verify data being returned is not empty
        console.log(res.body);
        assert.isNotEmpty(res.body);
      });
  });
});
```

After test execution, you will hopefully see something like this:<br>

![](/img/apitest.PNG)


These types of tests **can** and **need** to be integrated into a CI/CD deployment pipeline along with unit tests and automated UI tests, which leads us to...

## UI tests

The UI is the interface in which the end user communicates with a certain application.
In the case of modern web apps, we have a graphical user interface(GUI).
The user should experience a flawless user interface/user experience, therefore testing must be put in place to enforce this.
Actions performed via keyboard, mouse, or touch should be tested and verify they perform as expected. Page elements should be displayed and function properly. Proper data should be displayed to the user. Various states of the application should be tested as they change based on certain user roles and rights.

## Automated testing vs Manual testing

These tests can be executed by a manual tester or through an automated regression test framework. Both automated and manual regression have pros and cons.

### Automated testing advantages

Automated tests bring speed into the ci/cd development process. A developer can have his branch tested in a fraction of the time needed for a manual tester to do it. The man-hour costs associated with QA will drop over time after the successful implementation of an automated regression framework.
Automated testing is more geared towards a faster-paced development environment with shorter sprints.

### Automated testing disadvantages

An automated regression framework is in essence just a piece of software that tests another application. It will have its subset of problems and bugs, possibly linked to the application under test.
Did you change your front end, well then expect to refactor your UI tests as well.
Did the API schema for certain service changes, then you will need to refactor your automated API/service tests as well.
Test maintenance is a well know problem and not to be taken lightly by the QA engineer.
In conclusion, automated tests are more expensive and provide a lower return on invested time compared to unit tests.

### Manual testing advantages

The computer does not have an eye for detail. Not everything needs/should be automated.
A manual tester would apply his knowledge of the product under test and would conduct exploratory testing. He would have a subjective approach toward the tested application. An automated script will not do that. It will just do its assertions, perhaps passing all of them, sometimes luring the developer into a false sense of security because "all tests pass".

### Manual testing disadvantages

Requires more resources and more man-hours.
We need to factor in the possibility of human error.
It is the slowest testing method, sometimes causing the release cycle to be blocked until all manual tests are done. 

A balance should exist between automated and manual testing and they should complement each other.
A mix of these two elements is perhaps...

## End-to-End Testing

E2e testing means testing a deployed application via its user interface.

Automated e2e testing means doing it in an automated manner.
[Selenium](https://www.selenium.dev/) or [Webdriver](https://www.w3.org/TR/webdriver/) allow us to do that.
These tools allow testers and developers to write code that automates user agents, such as the browser.<br>
These test scripts will mimic the user's behavior and go through the web app just like a real user would.
From logging in to logging out, there's a myriad of scenarios the user would go through and a substantial number of ways it can go wrong. <br>Catching these issues on the branch level reduces future development costs, spent on fixes and refactorings.

All of these would be covered by different tests, grouped in test suites, verifying different services or parts of the application.
Much like a spider laying its web line by line, the Qa engineer produces end-to-end test suites. The scope of both is to catch bugs.
Each newly added test scenario brings extended test coverage and peace of mind for the developers who can commit and deploy faster without fear of introducing unwanted issues into the codebase.
The scope of this workload is to:
 - catch regression issues on the branch level or before reaching a production environment
 - reduce costs associated with manual testing
 - speed up the CI/CD process, as automated regression is faster than manual regression

In the following example, we will set up an end-to-end scenario and run it in a CI environment, [Github Actions](https://github.com/features/actions).
For this we will need:
- [a Github](https://github.com/) account(don't worry, it's free)
- [NodeJs](https://nodejs.org/en/), the Javascript runtime allowing us to execute our code
- [Visual Studio Code](https://code.vsualstudio.com/), a customizable text editor

We will use [Playwright](https://playwright.dev/) to set up our test framework.
It's a testing tool used to develop e2e, API, or even unit tests; however in this case we will concentrate on end-to-end testing.

We will first install the latest version of Playwright by using the following command in the terminal:<br>
 `npm init playwright@latest`
 
![](/img/playwright_init.PNG)

This will install all required dependencies including browsers.
Let's execute the default tests to make sure everything is okay `npx playwright test`.
You should see something like this.

![](/img/playwright_test.PNG)

Next, let's modify the example test found in `/tests/example.spec.js`.
We will add our scenario.
A pretty straightforward example, we want to access our page, click the privacy policy button, and verify the user can accept it.

```import { test, expect } from '@playwright/test';

test('Scenario: Quick Leaf Privacy Policy verification', async ({ page }) => {
  // attempts to reach the desired URL
  await page.goto('https://www.quickleaf.net/');

  // Expect a page to have a specific title
  await expect(page).toHaveTitle('Quickleaf - Top Custom Web/Mobile Software Development');

  // create a locator
  const privacyPolicy = page.locator('text="Privacy policy"');

  // Expect the locator to have a specific attribute
  await expect(privacyPolicy).toHaveAttribute('href', 'https://www.quickleaf.net/privacy-policy/');

  //clicks on privacy policy button and verifies new popup page
  const [privacyPolicyPageHandle] = await Promise.all([
    page.waitForEvent('popup'),
    privacyPolicy.click()
  ]);

  // Verifies page redirects to the appropriate Url
  await expect(privacyPolicyPageHandle).toHaveURL('https://www.quickleaf.net/privacy-policy/');

  //Clicks the Accept Privacy Policy button
  const acceptPrivacyPolicy = page.locator('text="Accept"');
  await acceptPrivacyPolicy.click();
});

```

Now, let us execute the test again, for us to check the test report, let's run `npx playwright show-report`, this will serve the report on localhost and should look like this:<br>

![](/img/report.PNG)

Looks like our test was executed on Chromium, Firefox, and Webkit environments, meaning we have coverage on all modern browsers:
  - Microsoft Edge
  - Chrome
  - Safari
  - Firefox


### Executing tests in the deployment pipeline

Our tests need to be executed in a Continous Integration or Continous Delivery environment, therefore we need to configure this part. 
GitHub offers virtual machines which install packages and execute workflows similar to ours. This is what we will be achieving in the next steps.

Let's first examine the `.github\workflows\playwright.yml` file. It should look like this.

```yml
name: Playwright Tests
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 5
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 16
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 1
```

This file is where you can configure specific instructions for the GitLab CI/CD process using YAML syntax.<br>
Things that can be configured in this file:
- **When** the tests will be executed through trigger events
- Caching dependencies to reduce execution time
- Storing artifacts, such as test reports
- configuring the OS for the run-time environment(Windows, Ubuntu, macOS)
- setting up concurrency groups
- setting up job secrets such as access-tokens

In our case, our tests will be executed on pull requests or commits to main or master branches.

Next, let's commit and push our code toward our GitHub repository and check the Actions Tab.
The workflow will be picked up by a GitHub-hosted runner and our workflow will be executed in the cloud.


![](/img/github_actions.PNG)

While Using GitHub Actions, keep in mind that storage and minutes used for these jobs could be costly, if not managed properly.
Make sure to always keep your tests as efficient as possible and remember to add a specific test timeout, which would interrupt the job if the test would hang for too long.

In case of any error in the execution of our test, the test job will fail and you will be alerted by an email notification.<br>
The test report, which represents the proof of execution, can be downloaded from the Artifacts section.

# Sum up

In conclusion, the test automation pyramid is a good model when thinking about the distribution of your tests.
```
        /\                           --------------
       /  \        UI / End-to-End    \          /
      /----\                           \--------/
     /      \        Integration        \      /
    /--------\                           \----/
   /          \         Unit              \  /
  --------------                           \/
  Pyramid (good)                   Ice cream cone (bad)
```

Therefore if we want to have a successful development process, it should retain its Pyramid shape by:
- keeping a large set of fast Unit tests as they are cheaper to set up and run
- keeping a healthy set of integration tests
- writing as few UI tests as possible, provided the verifications are done in the Unit tests or Integration test layers.<br> While having 50 e2e test scenarios would be no problem if the number increases during the CI/CD process you're going to have a maintenance problem. Just imagine 1000+ tests to maintain at the UI level, not to mention the entire regression could last up to 10 hours of run-time, blocking the integration/development process
- lower-level tests allow you to narrow down errors and replicate them in an isolated way
- if a bug is detected at higher level testing, it is time to write a corresponding test at the Unit and Integration layer
- avoid duplicate verifications in tests; redundant checks in tests just add dead weight, extend run-time and provide no value to the development team.
- keep test suites fast
