class ContactUs {
  elements = {
    nameInput: () => cy.get('input[data-qa="name"]'),
    emailInput: () => cy.get('input[data-qa="email"]'),
    subjectInput: () => cy.get('input[data-qa="subject"]'),
    messageInput: () => cy.get('textarea[data-qa="message"]'),
    uploadFile: () => cy.get('input[name="upload_file"]'),
    submitBtn: () => cy.get('input[data-qa="submit-button"]'),
    successText: () => cy.get(".status"),
  };
}
export default new ContactUs();
