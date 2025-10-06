/// <reference types="cypress" />

/*
  Hands-on
  Usando o projeto e conceitos que aprendemos em aula, implemente os 5 primeiros cenários da lista na página testcases do site usado em aula.
  (não vale nota, mas, é importante para fixar)
*/

import userData from "../fixtures/user-data.json";

describe.skip("Automation Exercise", () => {
  function createUser(name, email, password) {
    createUserStep1(name, email);
    createUserStep2(name, email, password);
  }

  function createUserStep1(name, email) {
    cy.visit("https://www.automationexercise.com/");
    cy.get('a[href="/login"]').click();

    cy.contains("New User Signup!");
    cy.get('input[data-qa="signup-name"]').type(name);
    cy.get('input[data-qa="signup-email"]').type(email);
    cy.get('button[data-qa="signup-button"]').click();
  }

  function createUserStep2(email, password) {
    cy.get(":nth-child(1) > b").should(
      "have.text",
      "Enter Account Information"
    );

    cy.get("#id_gender1").check();
    cy.get("input#password").type(password, { log: false });
    cy.get("select[data-qa=days]").select("20");
    cy.get("select[data-qa=months]").select("December");
    cy.get("select[data-qa=years]").select("1990");
    cy.get("input[type=checkbox]#newsletter").check();
    cy.get("input[type=checkbox]#optin").check();
    cy.get("#first_name").type("QA");
    cy.get("#last_name").type("Tester");
    cy.get("#company").type("QA");
    cy.get("#address1").type("Rua Teste");
    cy.get("#address2").type("Bairro Teste");
    cy.get("#country").select("United States");
    cy.get("#state").type("Teste");
    cy.get("#city").type("Teste");
    cy.get("#zipcode").type("12345");
    cy.get("#mobile_number").type("123456789");
    cy.get("button[data-qa=create-account]").click();

    return { email, password };
  }

  function loginUser(email, password) {
    cy.visit("https://www.automationexercise.com/");
    cy.get('a[href="/login"]').click();

    cy.contains("Login to your account");
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password);
    cy.get('button[data-qa="login-button"]').click();
  }

  it("Test Case 1: Register User", () => {
    let email = `qa-tester-${new Date().getTime()}@test.com`;

    createUser(userData.name, email, userData.password);

    cy.url().should("include", "/account_created");
    cy.get("h2[data-qa=account-created]").should(
      "have.text",
      "Account Created!"
    );
    cy.get('[data-qa="continue-button"]').click();
    cy.get(":nth-child(10) > a").contains(`Logged in as ${userData.name}`);

    cy.get('a[href="/delete_account"]').click();
    cy.get("h2[data-qa=account-deleted]").should(
      "have.text",
      "Account Deleted!"
    );
  });

  it("Test Case 2: Login User with correct email and password", () => {
    loginUser(userData.email, userData.password);

    cy.get(":nth-child(10) > a").contains(`Logged in as ${userData.name}`);
  });

  it("Test Case 3: Login User with incorrect email and password", () => {
    loginUser("test@test.com", "123");

    cy.get(".login-form > form > p").should(
      "have.text",
      "Your email or password is incorrect!"
    );
  });

  it("Test Case 4: Logout User", () => {
    loginUser(userData.email, userData.password);

    cy.get(":nth-child(10) > a").contains(`Logged in as ${userData.name}`);
    cy.get("a[href='/logout']").click();

    cy.get('a[href="/login"]').should("be.visible");
    cy.url().should("include", "/login");
  });

  it("Test Case 5: Register User with existing email", () => {
    createUserStep1(userData.name, userData.email);

    cy.get(".signup-form > form > p").should(
      "have.text",
      "Email Address already exist!"
    );
  });
});
