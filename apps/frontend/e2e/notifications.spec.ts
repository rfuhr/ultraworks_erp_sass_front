import { expect, test } from '@playwright/test';
import { loginAsDemo } from './helpers';

async function openNotificationsPanel(page: import('@playwright/test').Page) {
  const trigger = page.getByTestId('header-notifications-trigger');
  const panel = page.getByTestId('notifications-panel');

  await trigger.click();
  try {
    await panel.waitFor({ state: 'visible', timeout: 1_500 });
  } catch {
    await trigger.click();
    await expect(panel).toBeVisible();
  }

  return panel;
}

test.describe('Notificações e menu de perfil', () => {
  test('abre o popup de notificações e navega para a leitura', async ({ page }) => {
    await loginAsDemo(page);

    const panel = await openNotificationsPanel(page);
    await expect(panel.getByText('Relatório mensal aprovado')).toBeVisible();

    await panel.getByRole('button', { name: /Relatório mensal aprovado/i }).click();

    await expect(page).toHaveURL('/notificacoes/report-approved');
    const detail = page.getByTestId('notification-detail');
    await expect(detail).toBeVisible();
    await expect(detail.getByText('O relatório de outubro foi aprovado pelo financeiro.')).toBeVisible();
  });

  test('acessa a lista completa pelo rodapé do popup', async ({ page }) => {
    await loginAsDemo(page);

    const panel = await openNotificationsPanel(page);
    await panel.getByRole('button', { name: /Ver todas as notificações/i }).click();

    await expect(page).toHaveURL('/notificacoes');
    const list = page.getByTestId('notifications-list');
    await expect(list).toBeVisible();
    await expect(list.getByText('Fatura disponível')).toBeVisible();
  });

  test('marca todas as notificações como lidas', async ({ page }) => {
    await loginAsDemo(page);

    const panel = await openNotificationsPanel(page);
    await panel.getByRole('button', { name: /Ver todas as notificações/i }).click();
    await page.getByTestId('notifications-mark-all').locator('button').click();

    await expect(page.getByText('0 não lidas')).toBeVisible();
  });

  test('abre o popup do usuário e sai pelo menu de perfil', async ({ page }) => {
    await loginAsDemo(page);

    await page.getByTestId('header-profile-trigger').click();
    await expect(page.getByTestId('profile-panel')).toBeVisible();

    await page.getByRole('menuitem', { name: /Sair/i }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
  });

  test('informa que itens do perfil são demonstrativos', async ({ page }) => {
    await loginAsDemo(page);

    await page.getByTestId('header-profile-trigger').click();
    await page.getByRole('menuitem', { name: /Meu perfil/i }).click();

    await expect(page.getByText('Esta tela não faz parte da demonstração.')).toBeVisible();
    await expect(page).toHaveURL('/');
  });
});
