import { test, expect } from '@playwright/test';

test('root redirect', async ({ page }) => {
    await page.goto('/');
    // long wait b/c automated tester is slow sometimes
    await page.waitForURL('**/user/customer', { timeout: 1000 });
});

test('images load', async ({ page }) => {
    // 'networkidle' is strongly discouraged, but we need it to know that all images have loaded
    await page.goto('/user/customer', { waitUntil: 'networkidle' });
    let imgs = await page.locator('//img').all();
    let imgsLoaded: boolean[] = await Promise.all(
        imgs.map(async (img) => {
            return (await img.getAttribute('height')) !== '0';
        })
    );
    expect(imgsLoaded.every((x) => x === true)).toBeTruthy();
});

test('correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle("Rev's American Grill");
});
