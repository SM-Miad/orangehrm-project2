const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');

test('apply, verify and cancel leave request', async ({ page }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const leavePage = poManager.getLeavePage();

    const fromDate = '2026-20-09';
    const toDate = '2026-30-09';


    await loginPage.gotoLoginPage();
    await loginPage.login('Admin', 'admin123');

    await dashboardPage.goToLeavePage();

    await leavePage.clickApplyLink();
    await leavePage.applyLeave(fromDate, toDate);

    await leavePage.clickMyLeaveLink();
    await leavePage.verifyLeaveStatus(fromDate, toDate, 'Pending Approval');

    await leavePage.cancelLeaveRequest(fromDate, toDate);
    await leavePage.verifyLeaveStatus(fromDate, toDate, 'Cancelled');

});

