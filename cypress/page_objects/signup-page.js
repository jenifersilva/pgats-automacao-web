class SignupPage {
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
  };

  fillAccountInformation(password, userDetails) {
    this.elements.genderMrRadio().check();
    this.elements.passwordInput().type(password, { log: false });
    this.elements.daysDropdown().select("20");
    this.elements.monthsDropdown().select("December");
    this.elements.yearsDropdown().select("1990");
    this.elements.newsletterCheckbox().check();
    this.elements.optinCheckbox().check();
    this.elements.firstNameInput().type(userDetails.firstName);
    this.elements.lastNameInput().type(userDetails.lastName);
    this.elements.companyInput().type("QA");
    this.elements.address1Input().type("Rua Teste");
    this.elements.address2Input().type("Bairro Teste");
    this.elements.countryDropdown().select("United States");
    this.elements.stateInput().type("Teste");
    this.elements.cityInput().type("Teste");
    this.elements.zipcodeInput().type("12345");
    this.elements.mobileNumberInput().type("123456789");
    this.elements.createAccountButton().click();
  }
}

export default new SignupPage();
