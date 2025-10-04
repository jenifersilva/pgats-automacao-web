class AccountDeletedPage {
  elements = {
    accountDeletedHeader: () => cy.get("h2[data-qa=account-deleted]"),
    continueBtn: () => cy.get('[data-qa="continue-button"]')
  };
}
export default new AccountDeletedPage();
