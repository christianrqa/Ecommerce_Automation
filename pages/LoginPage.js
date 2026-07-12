const { BasePage } = require('./BasePage');
exports.LoginPage = class LoginPage extends BasePage {
    

constructor(page) {
    super(page)
    
        this.username_textbox = page.locator('[data-test="username"]');
        this.password_textbox = page.locator('[data-test="password"]');
        this.login_button = page.locator('[data-test="login-button"]');
    }

    async gotoLoginPage() {
    await this.goto('/');
}

    async login(username, password) {
        await this.fill(this.username_textbox, username);
        await this.fill(this.password_textbox, password);
        await this.click(this.login_button);
    }
}
