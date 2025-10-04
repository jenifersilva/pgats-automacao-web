/// <reference types="cypress" />

import userData from "../fixtures/user-data.json";
import titles from "../fixtures/titles.json";
import messages from "../fixtures/messages.json";
import header from "../modules/header";
import login from "../modules/login";
import signup from "../modules/signup";
import accountCreated from "../modules/account_created";
import accountDeleted from "../modules/account_deleted";
import contactUs from "../modules/contact_us";
import { getRandomEmail } from "../support/helpers";
import { faker } from "@faker-js/faker";

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Test Case 1: Register User", () => {
    let email = getRandomEmail();
    header.elements.loginBtn().click();

    cy.contains(titles.signup);
    login.startSignup(userData.name, email);

    cy.contains(titles.enter_account_information);
    signup.fillAccountInformation(userData.password, {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });

    cy.url().should("include", "/account_created");
    accountCreated.elements
      .accountCreatedHeader()
      .should("have.text", messages.account_created);
    accountCreated.elements.continueBtn().click();
    header.elements.loggedInAsText(userData.name).should("be.visible");

    header.elements.deleteAccountBtn().click();
    accountDeleted.elements
      .accountDeletedHeader()
      .should("have.text", messages.account_deleted);
  });

  it("Test Case 2: Login User with correct email and password", () => {
    header.elements.loginBtn().click();
    cy.contains(titles.login);
    login.login(userData.email, userData.password);
    header.elements.loggedInAsText(userData.name).should("be.visible");
  });

  it("Test Case 3: Login User with incorrect email and password", () => {
    header.elements.loginBtn().click();
    login.login(faker.internet.email(), faker.internet.password());
    login.elements
      .loginErrorText()
      .should("have.text", messages.incorrect_email_password);
  });

  it("Test Case 4: Logout User", () => {
    header.elements.loginBtn().click();
    cy.contains(titles.login);
    login.login(userData.email, userData.password);
    header.elements.loggedInAsText(userData.name).should("be.visible");
    header.elements.logoutBtn().click();
    cy.url().should("include", "/login");
  });

  it("Test Case 5: Register User with existing email", () => {
    header.elements.loginBtn().click();

    cy.contains(titles.signup);
    login.startSignup(userData.name, userData.email);
    login.elements
      .signupErrorText()
      .should("have.text", messages.email_already_exists);
  });

  it("Test Case 6: Contact Us Form", () => {
    header.elements.contactUsBtn().click();
    cy.url().should("include", "/contact_us");
    cy.contains(titles.get_in_touch);

    contactUs.elements.nameInput().type(userData.name);
    contactUs.elements.emailInput().type(userData.email);
    contactUs.elements.subjectInput().type(userData.subject);
    contactUs.elements.messageInput().type(userData.message);
    cy.fixture("cypress-logo.png").as("image");
    contactUs.elements.uploadFile().selectFile("@image");
    contactUs.elements.submitBtn().click();

    contactUs.elements
      .successText()
      .should("have.text", messages.message_sent);

    header.elements.homeBtn().click();
    cy.url().should("include", "/");
  });
});
