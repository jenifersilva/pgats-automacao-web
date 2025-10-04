class Header {
  elements = {
    homeBtn: () => cy.get(".fa-home"),
    loginBtn: () => cy.get('a[href="/login"]'),
    logoutBtn: () => cy.get("a[href='/logout']"),
    deleteAccountBtn: () => cy.get('a[href="/delete_account"]'),
    contactUsBtn: () => cy.get("a[href='/contact_us']"),
    loggedInAsText: (username) => cy.contains(`Logged in as ${username}`),
  };

  goToHome() {
    this.elements.homeBtn().click();
  }

  goToLogin() {
    this.elements.loginBtn().click();
  }

  logout() {
    this.elements.logoutBtn().click();
  }

  deleteAccount() {
    this.elements.deleteAccountBtn().click();
  }

  goToContactUs(){
    this.elements.contactUsBtn().click();
  }

  checkLoggedInText(username){ 
    this.elements.loggedInAsText(username).should("be.visible");
  }
}

export default new Header();
