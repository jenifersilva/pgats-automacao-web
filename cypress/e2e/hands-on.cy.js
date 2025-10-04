/// <reference types="cypress" />

import userData from "../fixtures/user-data.json";
import homePage from "../page_objects/home-page";
import contactUsPage from "../page_objects/contact-us-page";

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Enviar mensagem de contato", () => {
    homePage.elements.contactUsBtn().click();
    cy.url().should("include", "/contact_us");

    contactUsPage.elements.nameInput().type(userData.name);
    contactUsPage.elements.emailInput().type(userData.email);
    contactUsPage.elements.subjectInput().type("Subject test");
    contactUsPage.elements.messageInput().type("Message test");
    contactUsPage.elements.uploadFile().selectFile('/Users/jenifersilva/workspace/pgats-automacao-web/cypress/fixtures/example.json')
    contactUsPage.elements.submitBtn().click();
    cy.get(".status").should("have.text", "Success! Your details have been submitted successfully.");
  });
});