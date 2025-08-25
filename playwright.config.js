module.exports = {
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
    headless: false, // Set to true for CI
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'python -m http.server 3000',
    port: 3000,
    reuseExistingServer: true,
  },
};
