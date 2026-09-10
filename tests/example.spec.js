import { test, expect } from '@playwright/test';
const { POManager } = require('../pageObjects/POManager');
require('dotenv').config();


test('has title', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.pause();


});
