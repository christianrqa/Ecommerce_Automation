exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.username_textbox = page.locator('[data-test="username"]');
        this.password_textbox = page.locator('[data-test="password"]');
        this.login_button = page.locator('[data-test="login-button"]');
    }

    async gotoLoginPage(){
    await this.page.goto('https://www.saucedemo.com/?utm_source=chatgpt.com');
    }

    async login(username, password) {
        await this.username_textbox.fill(username)
        await this.password_textbox.fill(password)
        await this.login_button.click()
    }
}
