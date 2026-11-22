import { Page, expect } from '@playwright/test';

export async function loginAsDemo(page: Page): Promise<void> {
  await page.goto('/login');
  await page.getByTestId('login-email').locator('input').fill('demo@frontend.dev');
  await page.getByTestId('login-password').locator('input').fill('demo1234');
  await page.getByTestId('login-submit').locator('button').click();

  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { name: 'Visão geral' }).first()).toBeVisible();
}

export async function openSidebarOnMobile(page: Page): Promise<void> {
  const width = page.viewportSize()?.width ?? 1280;
  if (width < 900) {
    await page.getByRole('button', { name: 'Alternar menu lateral' }).click();
  }
}
