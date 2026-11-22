import type { Meta, StoryObj } from '@storybook/angular';
import { UwAdminLayoutComponent } from './uw-admin-layout.component';

const meta: Meta<UwAdminLayoutComponent> = {
  title: 'UW-UI/Layout/AdminLayout',
  component: UwAdminLayoutComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-admin-layout
        [menuItems]="menuItems"
        [bottomItems]="bottomItems"
        [breadcrumb]="breadcrumb"
        [user]="user"
        [unreadCount]="unreadCount"
        title="Dashboard"
        sidebarTitle="Frontend Template"
      >
        <section style="padding: 8px;">
          <h2>Conteúdo da página</h2>
          <p>O shell é presentational: menu, usuário e breadcrumb chegam por inputs.</p>
        </section>
      </uw-admin-layout>
    `,
  }),
};

export default meta;
type Story = StoryObj<UwAdminLayoutComponent>;

export const Default: Story = {
  args: {
    menuItems: [
      { label: 'Início', icon: 'home', path: '/home' },
      { label: 'Usuários', icon: 'group', path: '/usuarios' },
      { label: 'Configurações', icon: 'settings', path: '/configuracoes' },
    ],
    bottomItems: [{ label: 'Ajuda', icon: 'help', path: '/ajuda' }],
    breadcrumb: [{ label: 'Início', route: '/' }, { label: 'Dashboard' }],
    user: { name: 'Ana Souza', role: 'Administradora', initials: 'AS' },
    unreadCount: 3,
    title: 'Dashboard',
    notifications: [
      {
        id: 'report',
        title: 'Relatório mensal aprovado',
        description: 'O relatório de outubro foi aprovado pelo financeiro.',
        time: 'há 2 horas',
        icon: 'check_circle',
        read: false,
      },
      {
        id: 'sync',
        title: 'Integração atualizada',
        description: 'A sincronização automática foi concluída com sucesso.',
        time: 'ontem',
        icon: 'sync',
        read: true,
      },
    ],
    notificationLabels: {
      title: 'Notificações',
      empty: 'Nenhuma notificação',
      loading: 'Carregando notificações…',
      error: 'Não foi possível carregar as notificações.',
      retry: 'Tentar novamente',
      showAll: 'Ver todas as notificações',
    },
    profileItems: [
      { id: 'profile', label: 'Meu perfil', icon: 'person' },
      { id: 'settings', label: 'Configurações da conta', icon: 'settings' },
      { id: 'separator', label: '', separator: true },
      { id: 'logout', label: 'Sair', icon: 'logout', danger: true },
    ],
  },
};

export const Collapsed: Story = {
  ...Default,
  args: {
    ...Default.args,
    collapsed: true,
  },
};
