import userData from "../../fixtures/users/userData.json";
import LoginPage from "../../pageObjects/loginPage";
import ProductsPage from "../../pageObjects/productsPage";

const loginPage = new LoginPage();
const productsPage = new ProductsPage();

describe("Testes de Login - Swag Labs", () => {
  beforeEach(() => {
    loginPage.visit();
    cy.viewport(1280, 720); // Set viewport size for consistent testing
  });

  it("TC-LOGIN-001 - Standard User", () => {
    loginPage.enterUsername(userData.userStandard.username);
    loginPage.enterPassword(userData.userStandard.password);
    loginPage.clickLogin();
    productsPage.verifyLoginSuccess();
  });

  it("TC-LOGIN-002 - Locked out User", () => {
    loginPage.enterUsername(userData.userLocked.username);
    loginPage.enterPassword(userData.userLocked.password);
    loginPage.clickLogin();
    loginPage
      .getErrorMessage()
      .should("contain", "Epic sadface: Sorry, this user has been locked out.");
  });

  it("TC-LOGIN-003 - Issue User", () => {
    loginPage.enterUsername(userData.userProblem.username);
    loginPage.enterPassword(userData.userProblem.password);
    loginPage.clickLogin();
    productsPage.verifyLoginSuccess();
  });

  it("TC-LOGIN-004 - Low Performance User", () => {
    loginPage.enterUsername(userData.userPerformance.username);
    loginPage.enterPassword(userData.userPerformance.password);
    loginPage.clickLogin();
    productsPage.verifyLoginSuccess();
  });

  it("TC-LOGIN-005 - Invalid username and password", () => {
    loginPage.enterUsername(userData.userInvalid.username);
    loginPage.enterPassword(userData.userInvalid.password);
    loginPage.clickLogin();
    loginPage
      .getErrorMessage()
      .should(
        "contain",
        "Epic sadface: Username and password do not match any user in this service"
      );
  });

  it("TC-LOGIN-006 - Empty Username and Password", () => {
    loginPage.clickLogin();
    loginPage
      .getErrorMessage()
      .should("contain", "Epic sadface: Username is required");
  });

  it("TC-LOGIN-007 - Empty Username", () => {
    loginPage.enterPassword(userData.userEmptyUsername.password);
    loginPage.clickLogin();
    loginPage
      .getErrorMessage()
      .should("contain", "Epic sadface: Username is required");
  });

  it("TC-LOGIN-008 - Empty Password", () => {
    loginPage.enterUsername(userData.userEmptyPassword.username);
    loginPage.clickLogin();
    loginPage
      .getErrorMessage()
      .should("contain", "Epic sadface: Password is required");
  });

  it("TC-LOGIN-009 - Invalid password", () => {
    loginPage.enterUsername(userData.userInvalidPassword.username);
    loginPage.enterPassword(userData.userInvalidPassword.password);
    loginPage.clickLogin();
    loginPage
      .getErrorMessage()
      .should("contain", "Username and password do not match any user in this service");
  });
});
