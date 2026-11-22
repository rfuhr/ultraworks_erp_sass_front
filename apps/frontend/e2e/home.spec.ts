import { expect, test } from '@playwright/test';

test.describe('Página inicial', () => {
  test('carrega o conteúdo de exemplo', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Design system importado')).toBeVisible({
      timeout: 10_000,
    });
  });

  test('exibe erro e permite tentar novamente', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Simular erro/i }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('button', { name: /Tentar novamente/i })).toBeVisible();
  });

  test('permite navegação por teclado', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });
});
