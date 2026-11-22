import type { Meta, StoryObj } from '@storybook/angular';
import { UwActionCardComponent } from './uw-action-card.component';

const meta: Meta<UwActionCardComponent> = {
  title: 'UW-UI/Data/ActionCard',
  component: UwActionCardComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Rótulo descritivo do tile',
    },
    statusLabel: {
      control: 'text',
      description: 'Texto de status exibido em destaque (sobrescrito por ctaLabel quando presente)',
    },
    ctaLabel: {
      control: 'text',
      description: 'Texto de ação (CTA) que substitui statusLabel quando há ação',
    },
    icon: {
      control: 'text',
      description: 'Nome do ícone (Material Symbols). Vazio para ocultar.',
    },
    color: {
      control: 'color',
      description: 'Cor do ícone, do status e do chevron; também deriva a borda',
    },
    bg: {
      control: 'color',
      description: 'Cor de fundo do tile',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o clique e oculta o chevron',
    },
    actionable: {
      control: 'boolean',
      description: 'Mantém o card habilitado, mas sem clique, chevron ou aria-label de ação',
    },
  },
};

export default meta;
type Story = StoryObj<UwActionCardComponent>;

export const Default: Story = {
  args: {
    label: 'Pagamento',
    statusLabel: 'Pago',
    icon: 'credit_card',
    color: '#10b981',
    bg: '#ecfdf5',
  },
};

export const WithCta: Story = {
  args: {
    label: 'Pagamento',
    statusLabel: 'Pendente',
    ctaLabel: 'Pagar agora',
    icon: 'credit_card',
    color: '#f59e0b',
    bg: '#fffbeb',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Documentação',
    statusLabel: 'Não Requerida',
    icon: 'description',
    color: '#9896b8',
    bg: '#f6f7fb',
    disabled: true,
  },
};

export const EnabledWithoutAction: Story = {
  args: {
    label: 'Documentação',
    statusLabel: 'Aprovado',
    icon: 'task_alt',
    color: '#10b981',
    bg: '#ecfdf5',
    actionable: false,
  },
};

export const PagamentoBloqueadoPorDocumentacao: Story = {
  args: {
    label: 'Pagamento',
    statusLabel: 'Aguardando Pagamento',
    icon: 'schedule',
    color: '#f59e0b',
    bg: '#fffbeb',
    disabled: true,
  },
};

export const Certificado: Story = {
  args: {
    label: 'Certificado',
    statusLabel: 'Disponível',
    ctaLabel: 'Emitir certificado',
    icon: 'military_tech',
    color: '#3b82f6',
    bg: '#eff6ff',
  },
};
