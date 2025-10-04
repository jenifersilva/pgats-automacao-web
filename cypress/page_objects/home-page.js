class HomePage {
  elements = {
    loginBtn: () => cy.get('a[href="/login"]'),
    loggedInAsText: (username) => cy.contains(`Logged in as ${username}`),
    deleteAccountBtn: () => cy.get('a[href="/delete_account"]'),
    logoutBtn: () => cy.get("a[href='/logout']"),
    contactUsBtn: () => cy.get("a[href='/contact_us']")
  };
}

export default new HomePage();
