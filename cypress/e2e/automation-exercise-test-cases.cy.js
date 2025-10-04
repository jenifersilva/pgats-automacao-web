/// <reference types="cypress" />

import userData from "../fixtures/user-data.json";
import titles from "../fixtures/titles.json";
import messages from "../fixtures/messages.json";
import headerPage from "../page_objects/header-page";
import loginPage from "../page_objects/login-page";
import signupPage from "../page_objects/signup-page";
import accountCreatedPage from "../page_objects/account-created-page";
import accountDeletedPage from "../page_objects/account-deleted-page";
import contactUsPage from "../page_objects/contact-us-page";
import { getRandomEmail } from "../support/helpers";
import { faker } from "@faker-js/faker";

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Test Case 1: Register User", () => {
    let email = getRandomEmail();
    headerPage.elements.loginBtn().click();

    cy.contains(titles.signup);
    loginPage.startSignup(userData.name, email);

    cy.contains(titles.enter_account_information);
    signupPage.fillAccountInformation(userData.password, {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });

    cy.url().should("include", "/account_created");
    accountCreatedPage.elements
      .accountCreatedHeader()
      .should("have.text", messages.account_created);
    accountCreatedPage.elements.continueBtn().click();
    headerPage.elements.loggedInAsText(userData.name).should("be.visible");

    headerPage.elements.deleteAccountBtn().click();
    accountDeletedPage.elements
      .accountDeletedHeader()
      .should("have.text", messages.account_deleted);
  });

  it("Test Case 2: Login User with correct email and password", () => {
    headerPage.elements.loginBtn().click();
    cy.contains(titles.login);
    loginPage.login(userData.email, userData.password);
    headerPage.elements.loggedInAsText(userData.name).should("be.visible");
  });

  it("Test Case 3: Login User with incorrect email and password", () => {
    headerPage.elements.loginBtn().click();
    loginPage.login(faker.internet.email(), faker.internet.password());
    loginPage.elements
      .loginErrorText()
      .should("have.text", messages.incorrect_email_password);
  });

  it("Test Case 4: Logout User", () => {
    headerPage.elements.loginBtn().click();
    cy.contains(titles.login);
    loginPage.login(userData.email, userData.password);
    headerPage.elements.loggedInAsText(userData.name).should("be.visible");
    headerPage.elements.logoutBtn().click();
    cy.url().should("include", "/login");
  });

  it("Test Case 5: Register User with existing email", () => {
    headerPage.elements.loginBtn().click();

    cy.contains(titles.signup);
    loginPage.startSignup(userData.name, userData.email);
    loginPage.elements
      .signupErrorText()
      .should("have.text", messages.email_already_exists);
  });

  it("Test Case 6: Contact Us Form", () => {
    headerPage.elements.contactUsBtn().click();
    cy.url().should("include", "/contact_us");
    cy.contains(titles.get_in_touch);

    contactUsPage.elements.nameInput().type(userData.name);
    contactUsPage.elements.emailInput().type(userData.email);
    contactUsPage.elements.subjectInput().type(userData.subject);
    contactUsPage.elements.messageInput().type(userData.message);
    cy.fixture("cypress-logo.png").as("image");
    contactUsPage.elements.uploadFile().selectFile("@image");
    contactUsPage.elements.submitBtn().click();

    contactUsPage.elements
      .successText()
      .should("have.text", messages.message_sent);

    headerPage.elements.homeBtn().click();
    cy.url().should("include", "/");
  });
});
