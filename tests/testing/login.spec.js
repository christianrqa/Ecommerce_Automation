import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { InventoryPage } from '../../pages/inventory';
import { CartPage } from '../../pages/cart';
import { CheckOut } from '../../pages/checkout';


test('User can login and add products to cart', async ({ page }) => {

    const login = new LoginPage(page);
    await login.gotoLoginPage();
    await login.login('standard_user','secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    const inventory = new InventoryPage(page)
    await inventory.addProduct('sauce-labs-backpack');
    await inventory.addProduct('sauce-labs-bike-light');
    await inventory.addProduct('sauce-labs-bolt-t-shirt');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    await inventory.goToCart()

    const cart = new CartPage(page);
    await cart.removeProduct();
    await cart.backToHome();
    await inventory.goToCart();
    await cart.checkOut();

    const checkOut = new CheckOut(page);
    await checkOut.fillInformation('Tian','ramos','1234');
    await checkOut.validateProduct(['Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt']);
    await checkOut.validateTotal('28.06');
    await checkOut.finishOrder();
});

