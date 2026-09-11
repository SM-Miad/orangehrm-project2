const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');

test('search, edit, and verify user role/status', async ({ page }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const adminPage = poManager.getAdminPage();

    //const username = 'Admin';
    const username = 'Your_name_999';


    await loginPage.gotoLoginPage();
    await loginPage.login('Admin', 'admin123');

    await dashboardPage.goToAdmin();

    await adminPage.searchUser(username);

    await adminPage.verifyUserInResults(username);

    await adminPage.editUser(username);

    await adminPage.changeUserRole('ESS');
    await adminPage.changeUserStatus('Disabled');
    await adminPage.saveChange();

    await page.reload();

    //after relod steps: navigate to adminpage > search > verify

    await dashboardPage.goToAdmin();
    await adminPage.searchUser(username);
    await adminPage.verifyUserInResults(username);

    await adminPage.verifyUserRole(username, 'ESS');
    await adminPage.verifyUserStatus(username, 'Disabled');

    await dashboardPage.logout();
});

