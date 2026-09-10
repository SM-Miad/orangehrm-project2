import { test, expect } from '@playwright/test';
const { POManager } = require('../pageObjects/POManager');

test('Login with invalid credentials', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    await loginPage.gotoLoginPage();
    await loginPage.login('InvalidU', '67054');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.trim()).toBe('Invalid credentials');
});