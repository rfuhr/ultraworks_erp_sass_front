import { expect, test } from '@playwright/test';
import { loginAsDemo, openSidebarOnMobile } from './helpers';

test.describe('Login de demonstração', () => {
  test('protege a rota inicial e redireciona para o login', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL('/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

  test('rejeita credenciais inválidas', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('login-email').locator('input').fill('demo@frontend.dev');
    await page.getByTestId('login-password').locator('input').fill('senha-errada');
    await page.getByTestId('login-submit').locator('button').click();

    await expect(page.getByTestId('login-error')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('faz login, acessa a home e encerra a sessão', async ({ page }) => {
    await loginAsDemo(page);

    await expect(page.getByText('Projetos ativos')).toBeVisible();

    await openSidebarOnMobile(page);
    await page.getByRole('button', { name: 'Sair' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

  test('recarregar a página encerra a sessão em memória', async ({ page }) => {
    await loginAsDemo(page);

    await page.reload();

    await expect(page).toHaveURL('/login');
  });

  test('permite navegação por teclado no login', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByTestId('login-form')).toBeVisible();

    await page.keyboard.press('Tab');

    const focusedTag = await page.evaluate(() => document.activeElement?.tagName ?? 'BODY');
    expect(focusedTag).not.toBe('BODY');
  });
});
