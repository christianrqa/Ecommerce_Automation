const { expect } = require('@playwright/test');

exports.CheckOut = class CheckOut {
    constructor(page) {
        this.page = page;

        // LOCATORS
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButtonLocator = page.locator('[data-test="finish"]');
    }

    async fillInformation(firstname, lastname, postal) {
        await this.firstNameInput.fill(firstname);
        await this.lastNameInput.fill(lastname);
        await this.postalCodeInput.fill(postal);

        await this.continueButton.click();
        await expect(this.page).toHaveURL(/checkout-step-two/);
    }

    async validateProduct(expectedProducts) {
        const actualProducts = await this.page
            .locator('.inventory_item_name')
            .allTextContents();

        expect(actualProducts).toEqual(expectedProducts);
    }

    async validateTotal(expectedTotal) {
        const totalText = await this.page
            .locator('.summary_total_label')
            .textContent();

        const actualTotal = totalText.match(/\$([0-9]+\.[0-9]{2})/)[1];

        expect(actualTotal).toBe(expectedTotal);
    }

    async finishOrder() {
        await this.finishButtonLocator.click();

        await expect(this.page).toHaveURL(/checkout-complete/);

        await expect(this.page.locator('.complete-header'))
            .toHaveText('Thank you for your order!');
    }
};
