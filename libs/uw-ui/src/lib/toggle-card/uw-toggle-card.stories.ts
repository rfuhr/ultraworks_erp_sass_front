import type { Meta, StoryObj } from '@storybook/angular';
import { UwToggleCardComponent } from './uw-toggle-card.component';

const meta: Meta<UwToggleCardComponent> = {
  title: 'UW-UI/Form/ToggleCard',
  component: UwToggleCardComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Estado ligado/desligado',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitado',
    },
    icon: {
      control: 'text',
      description: 'Nome do ícone Material Symbols',
    },
    label: {
      control: 'text',
      description: 'Título do card',
    },
    description: {
      control: 'text',
      description: 'Descrição do card',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'success', 'warning', 'error', 'info'],
      description: 'Variante de cor',
    },
    opacity: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Opacidade do background quando checked (0-100)',
    },
    clickableArea: {
      control: 'radio',
      options: ['card', 'toggle'],
      description: 'Área clicável',
    },
  },
};

export default meta;
type Story = StoryObj<UwToggleCardComponent>;

export const Default: Story = {
  args: {
    icon: 'certificado',
    label: 'Emitir Certificado',
    description: 'Certificado digital gerado automaticamente',
  },
};

export const Checked: Story = {
  args: {
    icon: 'badge',
    label: 'Credenciamento',
    description: 'Controle de credenciamento de participantes',
    checked: true,
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 480px;">
        <uw-toggle-card icon="certificado" label="Primary" description="Variante primary" variant="primary" checked></uw-toggle-card>
        <uw-toggle-card icon="check_circle" label="Success" description="Variante success" variant="success" checked></uw-toggle-card>
        <uw-toggle-card icon="warning" label="Warning" description="Variante warning" variant="warning" checked></uw-toggle-card>
        <uw-toggle-card icon="error" label="Error" description="Variante error" variant="error" checked></uw-toggle-card>
        <uw-toggle-card icon="info" label="Info" description="Variante info" variant="info" checked></uw-toggle-card>
      </div>
    `,
  }),
};

export const CustomOpacity: Story = {
  args: {
    icon: 'palette',
    label: 'Opacidade reduzida',
    description: 'Background com 50% de opacidade',
    checked: true,
    opacity: 50,
  },
};

export const ClickableToggle: Story = {
  args: {
    icon: 'touch_app',
    label: 'Clique apenas no toggle',
    description: 'Clique no card não alterna o estado',
    clickableArea: 'toggle',
  },
};

export const Disabled: Story = {
  args: {
    icon: 'lock',
    label: 'Recurso desabilitado',
    description: 'Este recurso não está disponível',
    disabled: true,
  },
};
