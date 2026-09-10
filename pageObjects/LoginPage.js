const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.getByPlaceholder('Username');
        this.passWord = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('.oxd-alert-content-text');
    }



    async gotoLoginPage() {
        await this.page.goto(process.env.BASE_URL);
    }

    async login(username, password) {
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        await expect(this.errorMessage).toBeVisible();
        return await this.errorMessage.textContent();
    }
    
    
}

module.exports = { LoginPage };


//Attempt login with an invalid username/password combination. Verify the correct error message is displayed.
//Invalid credentials