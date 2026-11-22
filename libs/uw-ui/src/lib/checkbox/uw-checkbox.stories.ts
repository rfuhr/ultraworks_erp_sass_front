import type { Meta, StoryObj } from '@storybook/angular';
import { UwCheckboxComponent } from './uw-checkbox.component';

const meta: Meta<UwCheckboxComponent> = {
  title: 'UW-UI/Form/Checkbox',
  component: UwCheckboxComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto do label',
    },
    checked: {
      control: 'boolean',
      description: 'Estado marcado',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Estado indeterminado',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitado',
    },
    labelPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Posição do label',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Tamanho do checkbox',
    },
  },
};

export default meta;
type Story = StoryObj<UwCheckboxComponent>;

export const Default: Story = {
  args: {
    label: 'Aceito os termos',
  },
};

export const Checked: Story = {
  args: {
    label: 'Marcado',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminado',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Desabilitado',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    label: 'Tamanho pequeno',
    size: 'sm',
  },
};

export const LabelLeft: Story = {
  args: {
    label: 'Label à esquerda',
    labelPosition: 'left',
  },
};
