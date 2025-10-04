class LoginPage {
    elements = {
        // Signup Form
        signupNameInput: () => cy.get('input[data-qa="signup-name"]'),
        signupEmailInput: () => cy.get('input[data-qa="signup-email"]'),
        signupButton: () => cy.get('button[data-qa="signup-button"]'),
        signupErrorText: () => cy.get('.signup-form > form > p'),

        // Login Form
        loginEmailInput: () => cy.get('[data-qa="login-email"]'),
        loginPasswordInput: () => cy.get('[data-qa="login-password"]'),
        loginButton: () => cy.get('button[data-qa="login-button"]'),
        loginErrorText: () => cy.get('.login-form > form > p')
    }

    startSignup(name, email) {
        this.elements.signupNameInput().type(name);
        this.elements.signupEmailInput().type(email);
        this.elements.signupButton().click();
    }

    login(email, password) {
        this.elements.loginEmailInput().type(email);
        this.elements.loginPasswordInput().type(password);
        this.elements.loginButton().click();
    }
}

export default new LoginPage();