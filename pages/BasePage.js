class BasePage {
    constructor(page) {
        this.page = page;
    }

    async goto(url) {
        await this.page.goto(url);
    }

    async click(locator) {
        await locator.click();
    }

    async fill(locator, text) {
        await locator.fill(text);
    }

    async getText(locator) {
        return await locator.textContent();
    }

    async waitForVisible(locator) {
        await expect(locator).toBeVisible();
    }

    async takeScreenshot(name) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`
        });
    }
}

module.exports = { BasePage };