import { expect, test } from '@playwright/test';
import { loginAsDemo, openSidebarOnMobile } from './helpers';

test.describe('Home do shell', () => {
  test('exibe os indicadores e atividades mockados', async ({ page }) => {
    await loginAsDemo(page);

    await expect(page.getByText('Projetos ativos')).toBeVisible();
    await expect(page.getByText('Atividades recentes')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Relatório mensal aprovado' })).toBeVisible();
    await expect(page.getByText('Progresso do trimestre')).toBeVisible();
  });

  test('informa que itens de menu sem rota são demonstrativos', async ({ page }) => {
    await loginAsDemo(page);

    await openSidebarOnMobile(page);
    await page.getByRole('button', { name: 'Relatórios' }).click();

    await expect(page.getByText('Esta tela não faz parte da demonstração.')).toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('exibe o breadcrumb e o usuário autenticado', async ({ page }) => {
    await loginAsDemo(page);

    await expect(page.getByText('Ana Souza').first()).toBeVisible();
    await expect(page.getByText('Frontend Template').first()).toBeVisible();
  });
});
