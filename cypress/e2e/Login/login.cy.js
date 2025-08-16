import userData from "../../fixtures/users/userData.json";
describe("Testes de Login - Swag Labs", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  const selectorsList = {
    userName: "#user-name",
    password: "#password",
    loginButton: "#login-button",
    errorMessage: '[data-test="error"]',
  };

  it("TC-LOGIN-001 - Standard User", () => {
    cy.get(selectorsList.userName).type(userData.userStandard.username); // insere username ** é esperadoa
    cy.get(selectorsList.password).type(userData.userStandard.password); // insere senha
    cy.get(selectorsList.loginButton).click(); // clica no botão de login
    cy.location("pathname").should("equals", "/v1/inventory.html"); // verifica redirecionamento maneira ideal
    cy.get(".product_label").should("contain", "Products"); // verifica se fez o redirecionamento
  });

  it("TC-LOGIN-002 - Locked out User", () => {
    cy.get(selectorsList.userName).type(userData.userLocked.username);
    cy.get(selectorsList.password).type(userData.userLocked.password);
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  it("TC-LOGIN-003 - Issue User", () => {
    cy.get(selectorsList.userName).type(userData.userProblem.username);
    cy.get(selectorsList.password).type(userData.userProblem.password);
    cy.get(selectorsList.loginButton).click();
    cy.url().should("include", "/inventory.html");
  });

  it("TC-LOGIN-004 - Low Performance User", () => {
    cy.get(selectorsList.userName).type(userData.userPerformance.username);
    cy.get(selectorsList.password).type(userData.userPerformance.password);
    cy.get(selectorsList.loginButton).click();
    // timeout aumentado para 10 segundos devido a lentidão proposital do usuário
    cy.url({ timeout: 10000 }).should("include", "/inventory.html");
  });

  it("TC-LOGIN-005 - Invalid username and password", () => {
    cy.get(selectorsList.userName).type(userData.userInvalid.username);
    cy.get(selectorsList.password).type(userData.userInvalid.password);
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("TC-LOGIN-006 - Empty Username and Password", () => {
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Username is required"
    );
  });

  it("TC-LOGIN-007 - Empty Username", () => {
    cy.get(selectorsList.userName).type(userData.userEmpty.password);
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Username is required"
    );
  });

  it("TC-LOGIN-008 - Invalid password", () => {
    cy.get(selectorsList.userName).type("standard_user");
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Password is required"
    );
  });

  it("TC-LOGIN-009 - Invalid user and password", () => {
    cy.get(selectorsList.userName).type(userData.userInvalidPassword.username);
    cy.get(selectorsList.password).type(userData.userInvalidPassword.password);
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("TC-LOGIN-010 - Empty Password", () => {
    cy.get(selectorsList.userName).type(userData.userEmptyPassword.username);
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Password is required"
    );
  });
  it("TC-LOGIN-011 - Empty Username", () => {
    cy.get(selectorsList.password).type(userData.userEmptyUsername.password);
    cy.get(selectorsList.loginButton).click();
    cy.get(selectorsList.errorMessage).should(
      "contain",
      "Epic sadface: Username is required"
    );
  });
});
