/// <reference types="cypress" />

import userData from "../fixtures/user-data.json";
import header from "../modules/header";
import login from "../modules/login";
import signup from "../modules/signup";
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
    header.goToLogin();

    login.checkLoginTitles();
    login.startSignup(userData.name, email);

    signup.checkSignUpTitle();
    signup.fillAccountInformation(
      userData.password,
      faker.person.firstName(),
      faker.person.lastName()
    );

    cy.url().should("include", "/account_created");
    signup.checkAccountCreated();
    signup.clickContinueButton();
    header.checkLoggedInText(userData.name);
    header.deleteAccount();
    accountDeleted.checkAccountDeletedTitle();
  });

  it("Test Case 2: Login User with correct email and password", () => {
    header.goToLogin();

    login.checkLoginTitles();
    login.login(userData.email, userData.password);
    header.checkLoggedInText(userData.name);
  });

  it("Test Case 3: Login User with incorrect email and password", () => {
    header.goToLogin();

    login.login(faker.internet.email(), faker.internet.password());
    login.checkLoginErrorMessage();
  });

  it("Test Case 4: Logout User", () => {
    header.goToLogin();

    login.checkLoginTitles();
    login.login(userData.email, userData.password);
    header.checkLoggedInText(userData.name);
    header.logout();
    cy.url().should("include", "/login");
  });

  it("Test Case 5: Register User with existing email", () => {
    header.goToLogin();

    login.checkLoginTitles();
    login.startSignup(userData.name, userData.email);
    login.checkSignupErrorMessage();
  });

  it("Test Case 6: Contact Us Form", () => {
    header.goToContactUs();

    cy.url().should("include", "/contact_us");
    contactUs.checkContactUsTitle();
    contactUs.fillContactUsForm(
      userData.name,
      userData.email,
      userData.subject,
      userData.message
    );
    contactUs.checkSuccessMessage();
    header.goToHome();
    cy.url().should("include", "/");
  });
});
