const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { POManager } = require('../pageObjects/POManager');

test('Add a new employee and verify in employee list', async ({ page }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const pimPage = poManager.getPimPage();

    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();


    await loginPage.gotoLoginPage();
    await loginPage.login('Admin', 'admin123');

    await dashboardPage.goToPIM();
    await pimPage.clickAddEmployee();
    await pimPage.enterEmployeeDetails(firstName, middleName, lastName);
    console.log( 'New Employee Details: ' + firstName + ' ' + middleName + ' ' + lastName );
    await pimPage.clickSaveButton();


    await pimPage.goToEmployeeList();
    await pimPage.searchEmployee(firstName);
    await pimPage.verifyEmployeeInList(firstName);
    await dashboardPage.logout();
});