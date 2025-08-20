class LoginPage {
    constructor() {
        this.usernameInput = '#user-name';
        this.passwordInput = '#password';
        this.loginButton = '#login-button';
        this.errorMessage = '[data-test="error"]';
    }

    visit() {
        cy.visit('/'); // Adjust the URL if needed
    }

    enterUsername(username) {
        cy.get(this.usernameInput).clear().type(username);
    }

    enterPassword(password) {
        cy.get(this.passwordInput).clear().type(password);
    }

    clickLogin() {
        cy.get(this.loginButton).click();
    }

    getErrorMessage() {
        return cy.get(this.errorMessage);
    }

   
}

export default LoginPage;