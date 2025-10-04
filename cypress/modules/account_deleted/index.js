import messages from "../../fixtures/messages.json";

class AccountDeleted {
  elements = {
    accountDeletedHeader: () => cy.get("h2[data-qa=account-deleted]"),
    continueBtn: () => cy.get('[data-qa="continue-button"]'),
  };

  checkAccountDeletedTitle() {
    this.elements
      .accountDeletedHeader()
      .should("have.text", messages.account_deleted);
  }
}
export default new AccountDeleted();
