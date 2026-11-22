import type { Meta, StoryObj } from '@storybook/angular';
import { UwSpinnerComponent } from './uw-spinner.component';

const meta: Meta<UwSpinnerComponent> = {
  title: 'UW-UI/Feedback/Spinner',
  component: UwSpinnerComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Tamanho do spinner',
    },
    color: {
      control: 'select',
      options: ['primary', 'white', 'inherit'],
      description: 'Cor do spinner',
    },
    mode: {
      control: 'radio',
      options: ['indeterminate', 'determinate'],
      description: 'Modo do spinner',
    },
    value: {
      control: 'number',
      description: 'Valor do progresso (0-100) para modo determinate',
    },
    label: {
      control: 'text',
      description: 'Label exibido abaixo do spinner',
    },
    overlay: {
      control: 'boolean',
      description: 'Exibe como overlay',
    },
  },
};

export default meta;
type Story = StoryObj<UwSpinnerComponent>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
    mode: 'indeterminate',
  },
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    color: 'primary',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    color: 'primary',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    color: 'primary',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    color: 'primary',
  },
};

export const White: Story = {
  args: {
    size: 'md',
    color: 'white',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Determinate: Story = {
  args: {
    size: 'md',
    color: 'primary',
    mode: 'determinate',
    value: 75,
  },
};

export const WithLabel: Story = {
  args: {
    size: 'lg',
    color: 'primary',
    label: 'Carregando...',
  },
};

export const Overlay: Story = {
  args: {
    size: 'lg',
    color: 'primary',
    overlay: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};
