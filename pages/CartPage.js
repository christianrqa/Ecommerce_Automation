const { expect } = require('@playwright/test');

exports.CartPage = class CartPage {

    constructor(page) {
        this.page = page;
    }

    // -------------------------
    // VALIDATE CART ITEMS
    // -------------------------
    async validateProducts(expectedNames) {
        const items = await this.page
            .locator('.inventory_item_name')
            .allTextContents();

        expect(items.sort()).toEqual(expectedNames.sort());
    }

    // -------------------------
    // REMOVE PRODUCT (DYNAMIC)
    // -------------------------
    async removeProduct(productId) {
        await this.page
            .locator(`[data-test="remove-${productId}"]`)
            .click();
    }

    // -------------------------
    // NAVIGATION
    // -------------------------
    async backToHome() {
        await this.page.locator('[data-test="continue-shopping"]').click();
        await expect(this.page).toHaveURL(/inventory/);
    }

    async checkOut() {
        await this.page.locator('[data-test="checkout"]').click();
        await expect(this.page).toHaveURL(/checkout/);
    }
};