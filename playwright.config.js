// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  reporter: 'html',

  projects: [
    {
      name: 'chrome',
      use: {
      actionTimeout: 10*1000,
      navigationTimeout: 30*1000,
      browserName: 'chromium',
      headless: false,
      screenshot: 'off',
      trace: 'on'
      }
    },
  ]


});

module.exports = config

