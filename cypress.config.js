const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Relatório de Testes - PGATS",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    showSkipped: false,
    showPending: false,
  },
  e2e: {
    baseUrl: "https://www.automationexercise.com/",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
