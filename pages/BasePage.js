const { expect } = require('@playwright/test');

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async click(locator) {
        await locator.click();
    }

    async fill(locator, text) {
        await locator.fill(text);
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

module.exports = BasePage;