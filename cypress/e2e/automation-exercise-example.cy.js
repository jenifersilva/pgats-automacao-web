/// <reference types="cypress" />

describe.skip('Automation Exercise - Example', () => {
  it('Cadastrar um usuário', () => {
    cy.visit('https://www.automationexercise.com/');
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="signup-name"]').type('QA Tester');
    cy.get('input[data-qa="signup-email"]').type(`qa-tester-${new Date().getTime()}@test.com`);
    cy.get('button[data-qa="signup-button"]').click();

    cy.get('#id_gender1').check();
    cy.get('input#password').type('12345', { log: false });
    cy.get('select[data-qa=days]').select('20');
    cy.get('select[data-qa=months]').select('December');
    cy.get('select[data-qa=years]').select('1990');
    cy.get('input[type=checkbox]#newsletter').check();
    cy.get('input[type=checkbox]#optin').check();
    cy.get('#first_name').type('QA');
    cy.get('#last_name').type('Tester');
    cy.get('#company').type('QA');
    cy.get('#address1').type('Rua Teste');
    cy.get('#address2').type('Bairro Teste');
    cy.get('#country').select('United States');
    cy.get('#state').type('Teste');
    cy.get('#city').type('Teste');
    cy.get('#zipcode').type('12345');
    cy.get('#mobile_number').type('123456789');
    cy.get('button[data-qa=create-account]').click();

    cy.url().should('include', '/account_created');
    cy.get('h2[data-qa=account-created]').should('have.text', 'Account Created!');
  });
});
