import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckOut } from '../../pages/CheckoutPage';
import { products } from '../../test-data/products';

test('User can login, manage cart and complete checkout', async ({ page }) => {

    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckOut(page);

    // -------------------------
    // LOGIN
    // -------------------------
    await login.gotoLoginPage();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    // -------------------------
    // ADD PRODUCTS
    // -------------------------
    const productIds = products.map(p => p.id);
    await inventory.addProducts(productIds);

    await expect(page.locator('.shopping_cart_badge'))
        .toHaveText(String(productIds.length));

    // Validate cart items from inventory selection logic
    const expectedNames = products.map(p => p.name);
    await inventory.goToCart();
    await cart.validateProducts(expectedNames);

    // -------------------------
    // REMOVE ITEM
    // -------------------------
    await cart.removeProduct('sauce-labs-backpack');

    const expectedAfterRemoval = products
        .filter(p => p.id !== 'sauce-labs-backpack')
        .map(p => p.name);

    await cart.validateProducts(expectedAfterRemoval);

    // -------------------------
    // CHECKOUT FLOW
    // -------------------------
    await cart.checkOut();

    await checkout.fillInformation('Tian', 'Ramos', '1234');
    await checkout.validateProduct(expectedAfterRemoval);
    await checkout.validateTotal('28.06');
    await checkout.finishOrder();
});