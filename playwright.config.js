import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();

const config = defineConfig({
  testDir: './tests',

  timeout: 50 * 1000,

  expect: {
    timeout: 5000
  },

  reporter: [
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }],

    ['allure-playwright', {
      outputFolder: 'allure-results'
    }]
  ],

  use: {
    browserName: 'chromium',
    headless: false,

    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  }
});

module.exports = config;