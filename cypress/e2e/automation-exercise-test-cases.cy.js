/// <reference types="cypress" />

import userData from "../fixtures/user-data.json";
import headerPage from "../page_objects/header-page";
import loginPage from "../page_objects/login-page";
import signupPage from "../page_objects/signup-page";
import accountCreatedPage from "../page_objects/account-created-page";
import accountDeletedPage from "../page_objects/account-deleted-page";
import contactUsPage from "../page_objects/contact-us-page";

describe("Automation Exercise", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Test Case 1: Register User", () => {
    let email = `qa-tester-${new Date().getTime()}@test.com`;
    headerPage.elements.loginBtn().click();
    loginPage.startSignup(userData.name, email);

    signupPage.fillAccountInformation(userData.password, {
      firstName: "QA",
      lastName: "Tester",
    });

    cy.url().should("include", "/account_created");
    accountCreatedPage.elements
      .accountCreatedHeader()
      .should("have.text", "Account Created!");
    accountCreatedPage.elements.continueBtn().click();
    headerPage.elements.loggedInAsText(userData.name).should("be.visible");

    headerPage.elements.deleteAccountBtn().click();
    accountDeletedPage.elements
      .accountDeletedHeader()
      .should("have.text", "Account Deleted!");
  });

  it("Test Case 2: Login User with correct email and password", () => {
    headerPage.elements.loginBtn().click();
    loginPage.login(userData.email, userData.password);
    headerPage.elements.loggedInAsText(userData.name).should("be.visible");
  });

  it("Test Case 3: Login User with incorrect email and password", () => {
    headerPage.elements.loginBtn().click();
    loginPage.login("test@test.com", "123");
    loginPage.elements
      .loginErrorText()
      .should("have.text", "Your email or password is incorrect!");
  });

  it("Test Case 4: Logout User", () => {
    headerPage.elements.loginBtn().click();
    loginPage.login(userData.email, userData.password);
    headerPage.elements.loggedInAsText(userData.name).should("be.visible");
    headerPage.elements.logoutBtn().click();
    cy.url().should("include", "/login");
  });

  it("Test Case 5: Register User with existing email", () => {
    headerPage.elements.loginBtn().click();
    loginPage.startSignup(userData.name, userData.email);
    loginPage.elements
      .signupErrorText()
      .should("have.text", "Email Address already exist!");
  });

  it.only("Test Case 6: Contact Us Form", () => {
    headerPage.elements.contactUsBtn().click();
    cy.url().should("include", "/contact_us");
    cy.contains('Get In Touch');

    contactUsPage.elements.nameInput().type(userData.name);
    contactUsPage.elements.emailInput().type(userData.email);
    contactUsPage.elements.subjectInput().type(userData.subject);
    contactUsPage.elements.messageInput().type(userData.message);
    cy.fixture('example.json').as('file')
    contactUsPage.elements.uploadFile().selectFile('@file')
    contactUsPage.elements.submitBtn().click();
    
    cy.get(".status").should("have.text", "Success! Your details have been submitted successfully.");

    headerPage.elements.homeBtn().click();
    cy.url().should("include", "/");
  });
});
