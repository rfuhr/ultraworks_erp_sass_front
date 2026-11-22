import type { Meta, StoryObj } from '@storybook/angular';
import { UwStatCardComponent } from './uw-stat-card.component';

const meta: Meta<UwStatCardComponent> = {
  title: 'UW-UI/Data/StatCard',
  component: UwStatCardComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Nome do ícone',
    },
    iconBg: {
      control: 'color',
      description: 'Cor de fundo do ícone',
    },
    iconColor: {
      control: 'color',
      description: 'Cor do ícone',
    },
    value: {
      control: 'text',
      description: 'Valor da estatística',
    },
    label: {
      control: 'text',
      description: 'Label da estatística',
    },
    variant: {
      control: 'radio',
      options: ['default', 'compact'],
      description: 'Variante do card',
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento',
    },
    href: {
      control: 'text',
      description: 'Link para navegação',
    },
  },
};

export default meta;
type Story = StoryObj<UwStatCardComponent>;

export const Default: Story = {
  args: {
    icon: 'people',
    value: '1.234',
    label: 'Participantes',
  },
};

export const WithGreenIcon: Story = {
  args: {
    icon: 'check_circle',
    iconBg: 'var(--color-emerald-100)',
    iconColor: 'var(--color-emerald-600)',
    value: '856',
    label: 'Aprovados',
  },
};

export const WithRedIcon: Story = {
  args: {
    icon: 'cancel',
    iconBg: 'var(--color-red-100)',
    iconColor: 'var(--color-red-600)',
    value: '42',
    label: 'Rejeitados',
  },
};

export const Compact: Story = {
  args: {
    icon: 'event',
    value: '15',
    label: 'Eventos',
    variant: 'compact',
  },
};

export const Loading: Story = {
  args: {
    icon: 'people',
    value: '',
    label: 'Participantes',
    loading: true,
  },
};

export const Clickable: Story = {
  args: {
    icon: 'assignment',
    value: '234',
    label: 'Submissões',
    href: '/submissions',
  },
};

export const Dashboard: Story = {
  args: {
    icon: 'dashboard',
    value: '0',
    label: 'Dashboard',
  },
  render: () => ({
    template: `
      <div class="grid grid-cols-4 gap-4">
        <uw-stat-card icon="people" value="1.234" label="Participantes" iconBg="var(--color-violet-100)" iconColor="var(--color-primary)" />
        <uw-stat-card icon="assignment" value="567" label="Submissões" iconBg="var(--color-blue-100)" iconColor="var(--color-blue-600)" />
        <uw-stat-card icon="check_circle" value="856" label="Aprovados" iconBg="var(--color-emerald-100)" iconColor="var(--color-emerald-600)" />
        <uw-stat-card icon="schedule" value="23" label="Pendentes" iconBg="var(--color-amber-100)" iconColor="var(--color-amber-600)" />
      </div>
    `,
  }),
};
