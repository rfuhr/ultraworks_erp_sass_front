import { expect, test } from '@playwright/test';

test.describe('Página 404', () => {
  test('exibe a página para rota desconhecida', async ({ page }) => {
    await page.goto('/rota-inexistente');

    await expect(page.getByRole('heading', { name: /Página não encontrada/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Voltar para o início/i })).toBeVisible();
  });

  test('volta para a página inicial', async ({ page }) => {
    await page.goto('/rota-inexistente');

    await page.getByRole('link', { name: /Voltar para o início/i }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
