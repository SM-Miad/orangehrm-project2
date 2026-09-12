const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');

test('search, edit, and verify user role/status', async ({ page }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const adminPage = poManager.getAdminPage();

    await loginPage.gotoLoginPage();
    await loginPage.login('Admin', 'admin123');

    await dashboardPage.goToAdmin();

    const username = await adminPage.getRandomUsername();
    console.log(`Randomly selected username: ${username}`);

    await adminPage.searchUser(username);

    await adminPage.verifyUserInResults(username);

    await adminPage.editUser(username);

    await adminPage.changeUserRole('ESS');
    await adminPage.changeUserStatus('Disabled');
    await adminPage.saveChange();

    await page.reload();


    await dashboardPage.goToAdmin();
    await adminPage.searchUser(username);
    await adminPage.verifyUserInResults(username);

    await adminPage.verifyUserRole(username, 'ESS');
    await adminPage.verifyUserStatus(username, 'Disabled');

    await dashboardPage.logout();
});

