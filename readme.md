OrangeHRM playwright automation
This contains ui automation tests using Playwright with JavaScript. this project follows Page Object Model (POM).


-----------------------------------------------------------------------------------------------------------------
Technologies used:
-----------------------------------------------------------------------------------------------------------------
1.JavaScript
2.Playwright
3.Node.js
4.Faker.js
5.dotenv
6.Allure Report
7.Playwright HTML Report


-----------------------------------------------------------------------------------------------------------------
Pewconditions:
-----------------------------------------------------------------------------------------------------------------
Make sure following things are installed into the system.
1.Nodejs
2.npm



check Nodejs installation: node --version
check npm installation: npm --version

-----------------------------------------------------------------------------------------------------------------
Installation
-----------------------------------------------------------------------------------------------------------------
1. Clone the project directory from GitHub. link:

2. Install all the dependencies:
	command: npm install

3. Install the Playwright and reporting packages
	commands: 
	npm init playwright@latest

	npm i @faker-js/faker

	npm install dotenv

	npm install -D allure-playwright

	npm install -D allure-commandline


-----------------------------------------------------------------------------------------------------------------
Environment Variables
-----------------------------------------------------------------------------------------------------------------
Create a .env file in the project root folder and add following line:
BASE_URL=https://opensource-demo.orangehrmlive.com



-----------------------------------------------------------------------------------------------------------------
Project Stracture
-----------------------------------------------------------------------------------------------------------------

Project directory/
|
|
|---tests/
|	|
|	|---add-employee-test.spec.js
|	|
|	|---admin-user-role.spec.js
|	|
|	|---leave-application.spec.js
|	|
|	|---login-test.spec.js
|
|	
|---pageObjects/
|	|
|	|---AdminPage.js
|	|
|	|---DashboardPage.js
|	|
|	|---LeavePage.js
|	|
|	|---LoginPage.js
|	|
|	|---PimPage.js
|	|
|	|---POManager.js
|
|
|---manual-test/
|	|
|	|---OrangeHRM Bug report.pdf
|	|
|	|---OrangeHRM_Manual_Test_Cases_Assignment.xlsx
|	
|
|---api-automation/
|	|
|	|---Automation_assignment_v2.postman_collection.json
|	
|	
|
|---playwright-report/
|	
|
|---allure-results/
|	
|
|---api-automation/
|	
|
|---allure-report/
|	
|
|
|
|---playwright.config.js
|	
|
|---package.json
|	
|
|---.env
|	
|
|---README.md






-----------------------------------------------------------------------------------------------------------------
Run all tests
-----------------------------------------------------------------------------------------------------------------
Run all tests: npx playwright test



-----------------------------------------------------------------------------------------------------------------
Run a specific test
-----------------------------------------------------------------------------------------------------------------
Run login test: npx playwright test tests/login-test.spec.js

Run Admin test: npx playwright test tests/admin-user-role.spec.js

Run Leave test: npx playwright test tests/leave-application.spec.js

Run employee test: npx playwright test tests/add-employee-test.spec.js


-----------------------------------------------------------------------------------------------------------------
Run Headed test
-----------------------------------------------------------------------------------------------------------------
To see the browser while the test is running:

npx playwright test --headed

Run a specific test in headed mode:

npx playwright test tests/admin-user-role.spec.js --headed



-----------------------------------------------------------------------------------------------------------------
Debug mode
-----------------------------------------------------------------------------------------------------------------
Use Playwright debug mode:

npx playwright test --debug

For a specific test:

npx playwright test tests/admin-user-role.spec.js --debug



-----------------------------------------------------------------------------------------------------------------
Test report
-----------------------------------------------------------------------------------------------------------------
The project is configured to generate both:

1.Playwright HTML Report
2.Allure Report

Reports are generated after test execution.



-----------------------------------------------------------------------------------------------------------------
HTML report
-----------------------------------------------------------------------------------------------------------------

1.Run the tests: npx playwright test

2.Open the HTML report: npx playwright show-report

3.The HTML report is generated in: playwright-report/



-----------------------------------------------------------------------------------------------------------------
Allure report
-----------------------------------------------------------------------------------------------------------------
1.After running the tests, generate the Allure report: npx allure generate allure-results --clean -o allure-report

2.Open the Allure report: npx allure open allure-report

3.Allure test data is stored in: allure-results/

4.The generated report is stored in: allure-report/



-----------------------------------------------------------------------------------------------------------------
Generate report after every run
-----------------------------------------------------------------------------------------------------------------
The project can use the following npm script: npm run test:report

This runs the tests and generates the Allure report.

The complete workflow is:

npm run test:report

Then open the Playwright HTML report:

npm run report:html

Open the Allure report:

npm run report:allure


-----------------------------------------------------------------------------------------------------------------
Notes
-----------------------------------------------------------------------------------------------------------------
1.Test credentials should be stored in .env.
2.Do not commit .env to a public repository.
3.The tests use Page Object Model architecture.
4.Screenshots are captured when tests fail.
5.Playwright traces are collected when a failed test is retried.
6.Reports should be regenerated after each execution to reflect the latest test results.

