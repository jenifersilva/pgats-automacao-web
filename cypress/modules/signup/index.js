import { faker } from "@faker-js/faker";
import titles from "../../fixtures/titles.json";

class Signup {
  elements = {
    title: () => cy.get(":nth-child(1) > b"),
    genderMrRadio: () => cy.get("#id_gender1"),
    passwordInput: () => cy.get("input#password"),
    daysDropdown: () => cy.get("select[data-qa=days]"),
    monthsDropdown: () => cy.get("select[data-qa=months]"),
    yearsDropdown: () => cy.get("select[data-qa=years]"),
    newsletterCheckbox: () => cy.get("input[type=checkbox]#newsletter"),
    optinCheckbox: () => cy.get("input[type=checkbox]#optin"),
    firstNameInput: () => cy.get("#first_name"),
    lastNameInput: () => cy.get("#last_name"),
    companyInput: () => cy.get("#company"),
    address1Input: () => cy.get("#address1"),
    address2Input: () => cy.get("#address2"),
    countryDropdown: () => cy.get("#country"),
    stateInput: () => cy.get("#state"),
    cityInput: () => cy.get("#city"),
    zipcodeInput: () => cy.get("#zipcode"),
    mobileNumberInput: () => cy.get("#mobile_number"),
    createAccountButton: () => cy.get("button[data-qa=create-account]"),
    accountCreatedHeader: () => cy.get("h2[data-qa=account-created]"),
    continueBtn: () => cy.get('[data-qa="continue-button"]'),
  };

  checkSignUpTitle() {
    this.elements.title().should("have.text", titles.enter_account_information);
  }

  fillAccountInformation(password, firstName, lastName) {
    let account_information = {
      password: password,
      firstName: firstName,
      lastName: lastName,
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: "Test",
      country: "United States",
      state: faker.location.state(),
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
      mobileNumber: faker.phone.number(),
    };

    this.elements.genderMrRadio().check();
    this.elements
      .passwordInput()
      .type(account_information.password, { log: false });
    this.elements.daysDropdown().select("20");
    this.elements.monthsDropdown().select(faker.date.month());
    this.elements.yearsDropdown().select("1990");
    this.elements.newsletterCheckbox().check();
    this.elements.optinCheckbox().check();
    this.elements.firstNameInput().type(account_information.firstName);
    this.elements.lastNameInput().type(account_information.lastName);
    this.elements.companyInput().type(account_information.company);
    this.elements.address1Input().type(account_information.address1);
    this.elements.address2Input().type(account_information.address2);
    this.elements.countryDropdown().select(account_information.country);
    this.elements.stateInput().type(account_information.state);
    this.elements.cityInput().type(account_information.city);
    this.elements.zipcodeInput().type(account_information.zipCode);
    this.elements.mobileNumberInput().type(account_information.mobileNumber);
    this.elements.createAccountButton().click();

    return account_information;
  }

  checkSignUpTitle() {
    cy.contains(titles.enter_account_information);
  }

  checkAccountCreated() {
    this.elements
      .accountCreatedHeader()
      .should("have.text", titles.account_created);
  }

  clickContinueButton() {
    this.elements.continueBtn().click();
  }
}

export default new Signup();
