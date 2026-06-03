exports.InventoryPage = class InventoryPage {

    constructor(page) {
        this.page = page;
    }

    async addProduct(productId) {
        await this.page
            .locator(`[data-test="add-to-cart-${productId}"]`)
            .click();
    }

    async goToCart() {
        await this.page
            .locator('[data-test="shopping-cart-link"]')
            .click();
    }
}