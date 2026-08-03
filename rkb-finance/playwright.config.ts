import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT ?? "3456";
const BASE_URL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "firefox-desktop",
      use: { ...devices["Desktop Firefox"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "webkit-desktop",
      use: { ...devices["Desktop Safari"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "webkit-iphone-13",
      use: { ...devices["iPhone 13"] },
    },
    {
      name: "webkit-iphone-se",
      use: { ...devices["iPhone SE"] },
    },
    {
      name: "webkit-ipad",
      use: { ...devices["iPad Pro 11"] },
    },
    {
      name: "chromium-pixel-7",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run start -- -p 3456",
        port: 3456,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
