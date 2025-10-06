/// <reference types="cypress" />

import userData from "../fixtures/user-data.json";
import header from "../modules/header";
import login from "../modules/login";
import signup from "../modules/signup";
import accountDeleted from "../modules/account_deleted";
import contactUs from "../modules/contact_us";
import testCases from "../modules/test_cases";
import products from "../modules/products";
import footer from "../modules/footer";
import checkout from "../modules/checkout";
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

  it("Test Case 7: Test Cases", () => {
    header.goToTestCases();

    cy.url().should("include", "/test_cases");
    testCases.checkTestCasesTitle();
  });

  it("Test Case 8: Verify All Products and product detail page", () => {
    header.goToProducts();

    cy.url().should("include", "/products");
    products.checkAllProductsTitle();
    products.checkProductList();
    products.goToProductDetail(0);
    products.checkProductInformation();
  });

  it("Test Case 9: Search Product", () => {
    header.goToProducts();

    cy.url().should("include", "/products");
    products.checkAllProductsTitle();
    products.checkProductList();
    products.searchProduct("Blue Cotton Indie Mickey Dress");
    products.checkSearchedProducts();
  });

  it("Test Case 10: Verify Subscription in home page", () => {
    footer.goToSubscriptionForm();
    footer.submitSubscription(faker.internet.email());
  });

  it("Test Case 11: Verify Subscription in Cart page", () => {
    header.goToCart();

    cy.url().should("include", "/view_cart");
    footer.goToSubscriptionForm();
    footer.submitSubscription(faker.internet.email());
  });

  it("Test Case 12: Add Products in Cart", () => {
    header.goToProducts();

    cy.url().should("include", "/products");
    products.addProductToCartFromList(0);
    products.closeCartModal();
    products.addProductToCartFromList(1);
    products.goToCart();
    cy.url().should("include", "/view_cart");
    checkout.checkBagItems(2);
    checkout.checkProductInformation(0);
    checkout.checkProductInformation(1);
  });

  it("Test Case 13: Verify Product quantity in Cart", () => {
    products.goToProductDetail(0);
    products.checkProductInformation();
    products.updateQuantity(4);
    products.addProductToCartFromDetails();
    products.goToCart();
    checkout.checkBagItems(1);
    checkout.checkProductInformation(0, 4);
  });

  it("Test Case 14: Place Order: Register while Checkout", () => {
    let email = getRandomEmail();

    products.addProductToCartFromList(0);
    products.closeCartModal();
    products.addProductToCartFromList(1);
    header.goToCart();
    checkout.checkBagItems(2);
    checkout.goToCheckout();
    checkout.goToLogin();

    login.startSignup(userData.name, email);
    signup.fillAccountInformation(
      userData.password,
      faker.person.firstName(),
      faker.person.lastName()
    );

    cy.url().should("include", "/account_created");
    signup.checkAccountCreated();
    checkout.continueToCheckout();
    header.checkLoggedInText(userData.name);
    header.goToCart();
    checkout.goToCheckout();
    checkout.confirmDataAndPlaceOrder(userData.name, 2, userData.message);
    cy.url().should("include", "/payment_done");
    header.deleteAccount();
    accountDeleted.checkAccountDeletedTitle();
  });

  it("Test Case 15: Place Order: Register before Checkout", () => {
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

    products.addProductToCartFromList(0);
    products.closeCartModal();
    products.addProductToCartFromList(1);
    header.goToCart();
    checkout.checkBagItems(2);
    checkout.goToCheckout();

    checkout.confirmDataAndPlaceOrder(userData.name, 2, userData.message);
    cy.url().should("include", "/payment_done");
    header.deleteAccount();
    accountDeleted.checkAccountDeletedTitle();
  });

  it("Test Case 16: Place Order: Login before Checkout", () => {
    header.goToLogin();

    login.checkLoginTitles();
    login.login(userData.email, userData.password);
    header.checkLoggedInText(userData.name);

    products.addProductToCartFromList(0);
    products.closeCartModal();
    products.addProductToCartFromList(1);
    header.goToCart();
    checkout.checkBagItems(2);
    checkout.goToCheckout();

    checkout.confirmDataAndPlaceOrder(userData.name, 2, userData.message);
    cy.url().should("include", "/payment_done");
  });

  it("Test Case 17: Remove Products From Cart", () => {
    products.addProductToCartFromList(0);
    products.closeCartModal();
    products.addProductToCartFromList(1);
    products.goToCart();
    checkout.removeProduct(0);
    checkout.removeProduct(1);
    checkout.checkEmptyCart();
  });
});
