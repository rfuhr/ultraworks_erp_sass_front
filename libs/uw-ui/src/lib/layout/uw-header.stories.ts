import type { Meta, StoryObj } from '@storybook/angular';
import { UwHeaderComponent } from './uw-header.component';

const meta: Meta<UwHeaderComponent> = {
  title: 'UW-UI/Layout/Header',
  component: UwHeaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<UwHeaderComponent>;

export const Default: Story = {
  args: {
    title: 'Visão geral',
    user: { name: 'Ana Souza', role: 'Administradora', initials: 'AS' },
    unreadCount: 3,
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
        id: 'member',
        title: 'Novo membro na equipe',
        description: 'Carlos Lima entrou no time de Produto.',
        time: 'há 5 horas',
        icon: 'person_add',
        read: false,
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

export const NotificationsLoading: Story = {
  ...Default,
  args: {
    ...Default.args,
    notificationsLoading: true,
    notifications: [],
  },
};

export const NotificationsEmpty: Story = {
  ...Default,
  args: {
    ...Default.args,
    notifications: [],
    unreadCount: 0,
  },
};

export const NotificationsError: Story = {
  ...Default,
  args: {
    ...Default.args,
    notificationsError: true,
    notifications: [],
  },
};
