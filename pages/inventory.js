exports.InventoryPage = class InventoryPage {

    constructor(page) {
        this.page = page;
    }

    async addProduct(productId) {
        await this.page
            .locator(`[data-test="add-to-cart-${productId}"]`)
            .click();
    }

    async addProducts(productIds) {
        for (const id of productIds) {
            await this.addProduct(id);
        }
    }


    async goToCart() {
        await this.page
            .locator('[data-test="shopping-cart-link"]')
            .click();
    }
}