/*
  Hands-on
  Instale a biblioteca cypress-xpath no projeto e tente adaptar os seletores para usar xpath.
  Observe aspectos como legibilidade, velocidade de execução e compartilhe suas percepções na aula.
  Entregar somente o arquivo de spec
  Vale 1pt. Extra; Enviar apenas a spec via formulário.
*/
require("cypress-xpath");

describe.skip("Automation Exercise - With xpath", () => {
  const userData = {
    name: "User Test",
    email: "jenifer@automation.exercise",
    password: "12345",
  };

  function createUser(name, email, password) {
    createUserStep1(name, email);
    createUserStep2(name, email, password);
  }

  function createUserStep1(name, email) {
    cy.visit("https://www.automationexercise.com/");
    cy.xpath("//a[@href='/login']").click();

    cy.xpath("//h2[contains(text(), 'New User Signup!')]");

    cy.xpath('//input[@data-qa="signup-name"]').type(name);
    cy.xpath('//input[@data-qa="signup-email"]').type(email);
    cy.xpath('//button[@data-qa="signup-button"]').click();
  }

  function createUserStep2(email, password) {
    cy.xpath("//b[contains(text(), 'Enter Account Information')]");

    cy.xpath("//input[@id='id_gender1']").check();
    cy.xpath("//input[@id='password']").type(password, { log: false });
    cy.xpath("//select[@data-qa='days']").select("20");
    cy.xpath("//select[@data-qa='months']").select("December");
    cy.xpath("//select[@data-qa='years']").select("1990");
    cy.xpath("//input[@id='newsletter']").check();
    cy.xpath("//input[@id='optin']").check();
    cy.xpath("//input[@id='first_name']").type("QA");
    cy.xpath("//input[@id='last_name']").type("Tester");
    cy.xpath("//input[@id='company']").type("QA");
    cy.xpath("//input[@id='address1']").type("Rua Teste");
    cy.xpath("//input[@id='address2']").type("Bairro Teste");
    cy.xpath("//select[@id='country']").select("United States");
    cy.xpath("//input[@id='state']").type("Teste");
    cy.xpath("//input[@id='city']").type("Teste");
    cy.xpath("//input[@id='zipcode']").type("12345");
    cy.xpath("//input[@id='mobile_number']").type("123456789");
    cy.xpath("//button[@data-qa='create-account']").click();

    return { email, password };
  }

  function loginUser(email, password) {
    cy.visit("https://www.automationexercise.com/");
    cy.xpath("//a[@href='/login']").click();

    cy.xpath("//h2[contains(text(), 'Login to your account')]");

    cy.xpath('//input[@data-qa="login-email"]').type(email);
    cy.xpath('//input[@data-qa="login-password"]').type(password);
    cy.xpath('//button[@data-qa="login-button"]').click();
  }

  it("Test Case 1: Register User", () => {
    let email = `qa-tester-${new Date().getTime()}@test.com`;

    createUser(userData.name, email, userData.password);

    cy.url().should("include", "/account_created");
    cy.xpath("//h2[@data-qa='account-created']/b").should(
      "have.text",
      "Account Created!"
    );
    cy.xpath("//a[@data-qa='continue-button']").click();
    cy.xpath(`//a[contains(text(), 'Logged in as')]`)
      .xpath(`//b[contains(text(), '${userData.name}')]`)
      .should("exist");

    cy.xpath("//a[@href='/delete_account']").click();
    cy.xpath("//h2[@data-qa='account-deleted']/b").should(
      "have.text",
      "Account Deleted!"
    );
  });

  it("Test Case 2: Login User with correct email and password", () => {
    loginUser(userData.email, userData.password);
    cy.xpath(`//a[contains(text(), 'Logged in as')]`)
      .xpath(`//b[contains(text(), '${userData.name}')]`)
      .should("exist");
  });

  it("Test Case 3: Login User with incorrect email and password", () => {
    loginUser("test@test.com", "123");

    cy.xpath("//*[@class='login-form']/form/p").should(
      "have.text",
      "Your email or password is incorrect!"
    );
  });

  it("Test Case 4: Logout User", () => {
    loginUser(userData.email, userData.password);

    cy.xpath(`//a[contains(text(), 'Logged in as')]`)
      .xpath(`//b[contains(text(), '${userData.name}')]`)
      .should("exist");
    cy.xpath("//a[@href='/logout']").click();

    cy.xpath("//a[@href='/login']").should("be.visible");
    cy.url().should("include", "/login");
  });

  it("Test Case 5: Register User with existing email", () => {
    createUserStep1(userData.name, userData.email);

    cy.xpath("//*[@class='signup-form']/form/p").should(
      "have.text",
      "Email Address already exist!"
    );
  });
});
