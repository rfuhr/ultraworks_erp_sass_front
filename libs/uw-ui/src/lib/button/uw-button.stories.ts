import type { Meta, StoryObj } from '@storybook/angular';
import { UwButtonComponent } from './uw-button.component';

const meta: Meta<UwButtonComponent> = {
  title: 'UW-UI/Form/Button',
  component: UwButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'soft', 'text', 'premium', 'danger', 'alert'],
      description: 'Variante visual do botão',
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Tamanho do botão',
    },
    label: {
      control: 'text',
      description: 'Texto do botão',
    },
    icon: {
      control: 'text',
      description: 'Nome do ícone Material Symbols',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Posição do ícone',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Apenas ícone (sem texto)',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    badge: {
      control: 'text',
      description: 'Texto do badge',
    },
    badgeVariant: {
      control: 'select',
      options: ['danger', 'success', 'warning', 'info', 'neutral'],
      description: 'Variante do badge',
    },
    badgeDot: {
      control: 'boolean',
      description: 'Badge como ponto',
    },
  },
};

export default meta;
type Story = StoryObj<UwButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    label: 'Outline Button',
    variant: 'outline',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    label: 'Ghost Button',
    variant: 'ghost',
    size: 'md',
  },
};

export const Soft: Story = {
  args: {
    label: 'Soft Button',
    variant: 'soft',
    size: 'md',
  },
};

export const Text: Story = {
  args: {
    label: 'Text Button',
    variant: 'text',
    size: 'md',
  },
};

export const Premium: Story = {
  args: {
    label: 'Premium Button',
    variant: 'premium',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger',
    size: 'md',
  },
};

export const Alert: Story = {
  args: {
    label: 'Alert Button',
    variant: 'alert',
    size: 'md',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Save',
    icon: 'save',
    variant: 'primary',
    size: 'md',
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'add',
    iconOnly: true,
    variant: 'primary',
    size: 'md',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
};

export const WithBadge: Story = {
  args: {
    label: 'Notifications',
    variant: 'primary',
    size: 'md',
    badge: '5',
    badgeVariant: 'danger',
  },
};
