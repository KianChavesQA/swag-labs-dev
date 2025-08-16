import userData from "../../fixtures/users/userData.json";
describe("Testes de Login - Swag Labs", () => {
  beforeEach(() => {
    // Executa antes de cada caso de teste, acessando a página de login
    cy.visit("/index.html");
  });

  // Seletores de elementos deixei aqui para facilitar o entendimento com fixtures
  const selectorsList = {
    userName: "#user-name",
    password: "#password",
    loginButton: "#login-button",
    errorMessage: '[data-test="error"]',
  };

  it("TC-LOGIN-001 - Autenticação com usuário válido", () => {
    cy.get(selectorsList.userName).type(userData.userStandard.username); // insere username ** é esperadoa
    cy.get(selectorsList.password).type(userData.userStandard.password); // insere senha
    cy.get(selectorsList.loginButton).click(); // clica no botão de login
    cy.location("pathname").should("equals", "/v1/inventory.html"); // verifica redirecionamento maneira ideal
    cy.get(".product_label").should("contain", "Products"); // verifica se fez o redirecionamento
  });

  it("TC-LOGIN-002 - Usuário bloqueado", () => {
    cy.get(selectorsList.userName).type(userData.userLocked.username);
    cy.get(selectorsList.password).type(userData.userLocked.password);
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  it("TC-LOGIN-003 - Usuário problemático", () => {
    cy.get(selectorsList.userName).type(userData.userProblem.username);
    cy.get(selectorsList.password).type(userData.userProblem.password);
    cy.get(selectorsList.loginButton).click();
    cy.url().should("include", "/inventory.html");
    // Opcional: aqui você pode verificar se há imagens quebradas
  });

  it("TC-LOGIN-004 - Usuário com lentidão", () => {
    cy.get(selectorsList.userName).type(userData.userPerformance.username);
    cy.get(selectorsList.password).type(userData.userPerformance.password);
    cy.get(selectorsList.loginButton).click();
    // Verifica que mesmo com lentidão, a página final foi carregada
    cy.url({ timeout: 10000 }).should("include", "/inventory.html");
  });

  it("TC-LOGIN-005 - Campo de username e password invalidos", () => {
    cy.get(selectorsList.userName).type(userData.userInvalid.username);
    cy.get(selectorsList.password).type(userData.userInvalid.password);
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("TC-LOGIN-006 - Campo de username e password em branco", () => {
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Username is required"
    );
  });

  it("TC-LOGIN-007 - Campo de username em branco", () => {
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Epic sadface: Username is required"
    );
  });

  it("TC-LOGIN-008 - Senha Incorreta", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Epic sadface: Password is required"
    );
  });

  it("TC-LOGIN-009 - Usuário e senha inválidos", () => {
    cy.get(selectorsList.userName).type(userData.userInvalidPassword.username);
    cy.get(selectorsList.password).type(userData.userInvalidPassword.password);
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("TC-LOGIN-010 - Senha em branco", () => {
    cy.get(selectorsList.userName).type(userData.userEmptyPassword.username);
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Password is required"
    );
  });

  it("TC-LOGIN-011 - Usuário em branco", () => {
    cy.get(selectorsList.password).type(userData.userEmptyUsername.password);
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Username is required"
    );
  });
});
