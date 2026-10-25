import { defineConfig, devices } from "@playwright/test";

const PORT = 4321;

export default defineConfig({
  testDir: "tests",
  testMatch: "*.spec.ts",
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  reporter: [["list"]],
  snapshotPathTemplate: "tests/screenshots/{projectName}/{arg}{ext}",
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: "disabled" } },
  use: { baseURL: `http://localhost:${String(PORT)}` },
  webServer: {
    command: `PORT=${String(PORT)} bun tools/serve.ts`,
    url: `http://localhost:${String(PORT)}/`,
    reuseExistingServer: false,
  },
  projects: [
    { name: "phone", use: { ...devices["Pixel 7"], viewport: { width: 375, height: 812 } } },
    { name: "iphone", use: { ...devices["iPhone 15"] } },
    { name: "tablet", use: { browserName: "chromium", viewport: { width: 768, height: 1024 } } },
    { name: "desktop", use: { browserName: "chromium", viewport: { width: 1440, height: 900 } } },
  ],
});
