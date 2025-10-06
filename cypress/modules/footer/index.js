import titles from "../../fixtures/titles.json";
import messages from "../../fixtures/messages.json";

class Footer {
  elements = {
    subscriptionTitle: () => cy.get("h2").last(),
    subscriptionForm: () => cy.get(".searchform"),
    subscriptionInput: () => cy.get("input[id='susbscribe_email']"),
    submitBtn: () => cy.get("button[id='subscribe']"),
  };

  goToSubscriptionForm() {
    this.elements.subscriptionForm().scrollIntoView();
    this.elements.subscriptionTitle().should("have.text", titles.subscription);
  }

  submitSubscription(email) {
    this.elements.subscriptionInput().type(email);
    this.elements.submitBtn().click();
    cy.contains(messages.subscription_submitted);
  }
}

export default new Footer();
