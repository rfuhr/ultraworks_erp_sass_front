import type { Meta, StoryObj } from '@storybook/angular';
import { UwToggleComponent } from './uw-toggle.component';

const meta: Meta<UwToggleComponent> = {
  title: 'UW-UI/Form/Toggle',
  component: UwToggleComponent,
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
    label: {
      control: 'text',
      description: 'Texto do label',
    },
    labelPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Posição do label',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Tamanho do toggle',
    },
  },
};

export default meta;
type Story = StoryObj<UwToggleComponent>;

export const Default: Story = {
  args: {
    label: 'Ativar notificações',
  },
};

export const Checked: Story = {
  args: {
    label: 'Modo escuro',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Recurso indisponível',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Toggle pequeno',
    size: 'sm',
  },
};

export const LabelLeft: Story = {
  args: {
    label: 'Label à esquerda',
    labelPosition: 'left',
  },
};

export const WithoutLabel: Story = {
  args: {
    label: '',
  },
};
