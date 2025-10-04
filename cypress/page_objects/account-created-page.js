class AccountCreatedPage {
  elements = {
    accountCreatedHeader: () => cy.get("h2[data-qa=account-created]"),
    continueBtn: () => cy.get('[data-qa="continue-button"]'),
  };
}
export default new AccountCreatedPage();
