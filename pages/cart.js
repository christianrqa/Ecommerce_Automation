const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {

    constructor(page) {
        this.page = page;

        // LOCATORS
        this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]'); 
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async removeProduct() {
        await this.removeButton.click();
    }

    async backToHome() {
        await this.continueShoppingButton.click();
        await expect(this.page).toHaveURL(/inventory/);
    }

    async checkOut() {
        await this.checkoutButton.click();
        await expect(this.page).toHaveURL(/checkout/);
    }
};