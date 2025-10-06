/*
  Hands-on
  Analise os testes criados para uma aplicação e que estão com falhas diversas, de sintaxe, funcionalidade, seletores. Execute, Identifique a origem do erro e corrija os testes falhando.
  Link: https://gist.github.com/samlucax/0df852881249b561cdf8888493b03125
  (não vale nota, mas, é importante para fixar)
*/

describe.skip("Cadastrar entradas e saídas com bugs", () => {
  it("Cadastrar uma nova transação de entrada - falha 1", () => {
    cy.visit("https://devfinance-agilizei.netlify.app");

    cy.contains("Nova Transação").click();
    cy.get("#description").type("Mesada");
    cy.get("#amount").type(100);
    cy.get("#date").type("2023-02-01");

    cy.contains("Salvar").click();
  });

  it("Cadastrar uma nova transação de entrada - falha 2", () => {
    cy.visit("https://devfinance-agilizei.netlify.app");

    cy.contains("Nova Transação").click();
    cy.get("#description").type("Mesada");
    cy.get("#amount").type(100);
    cy.get("#date").type("2023-02-01");

    cy.contains("Salvar").click();

    cy.get("tbody tr").should("have.length", 1);
  });

  it("Cadastrar uma nova transação de entrada - falha 3", () => {
    cy.visit("https://devfinance-agilizei.netlify.app");

    cy.contains("Nova Transação").click();
    cy.get("#description").type("Mesada");
    cy.get("#amount").type(100);

    cy.get("#date").type("2023-02-01");

    cy.contains("Salvar").click();

    cy.get("tbody tr").should("have.length", 1);
  });

  it("Cadastrar uma nova transação de entrada - falha 4", () => {
    cy.visit("https://devfinance-agilizei.netlify.app");

    cy.contains("Nova Transação").click();
    cy.get("#amount").type(100);
    cy.get("#description").type("Mesada");
    cy.get("#date").type("2023-02-01");
    cy.contains("Salvar").click();

    cy.get("tbody tr").should("have.length", 1);
  });

  it("Cadastrar uma nova transação de entrada - falha 5", () => {
    cy.visit("https://devfinance-agilizei.netlify.app");

    cy.contains("Nova Transação").click();
    cy.get("#description").type("Mesada");
    cy.get("#amount").type(100);
    cy.get("#date").type("2023-02-01");

    cy.contains("Salvar").click();

    cy.get("tbody tr").should("have.length", 1);
  });

  it("Cadastrar uma nova transação de entrada - falha 6", () => {
    cy.visit("https://devfinance-agilizei.netlify.app");

    cy.contains("Nova Transação").click();
    cy.get("#description").type("Mesada");
    cy.get("#amount").type(100);
    cy.get("#date").type("2023-02-01");

    cy.contains("Salvar").click();

    cy.get("tbody tr").should("have.length", 1);
  });
});
