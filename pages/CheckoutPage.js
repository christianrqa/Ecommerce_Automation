const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

exports.CheckOut = class CheckOut extends BasePage {

    constructor(page) {
        super(page);

        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');

        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');

        this.productNames = page.locator('.inventory_item_name');
        this.totalLabel = page.locator('.summary_total_label');
        this.completeHeader = page.locator('.complete-header');
    }

    async fillInformation(firstName, lastName, postalCode) {

        await this.fill(this.firstNameInput, firstName);
        await this.fill(this.lastNameInput, lastName);
        await this.fill(this.postalCodeInput, postalCode);

        await this.click(this.continueButton);

        await expect(this.page)
            .toHaveURL(/checkout-step-two/);
    }

    async validateProduct(expectedProducts) {

        const actualProducts =
            await this.productNames.allTextContents();

        expect(actualProducts).toEqual(expectedProducts);
    }

    async validateTotal(expectedTotal) {

        const totalText =
            await this.getText(this.totalLabel);

        const actualTotal =
            totalText.match(/\$([0-9]+\.[0-9]{2})/)[1];

        expect(actualTotal).toBe(expectedTotal);
    }

    async finishOrder() {

        await this.click(this.finishButton);

        await expect(this.page)
            .toHaveURL(/checkout-complete/);

        await expect(this.completeHeader)
            .toHaveText('Thank you for your order!');
    }
};