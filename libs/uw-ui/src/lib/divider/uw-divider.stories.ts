import type { Meta, StoryObj } from '@storybook/angular';
import { UwDividerComponent } from './uw-divider.component';

const meta: Meta<UwDividerComponent> = {
  title: 'UW-UI/Layout/Divider',
  component: UwDividerComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientação do divisor',
    },
    label: {
      control: 'text',
      description: 'Texto exibido no divisor',
    },
    icon: {
      control: 'text',
      description: 'Ícone exibido no divisor',
    },
    thickness: {
      control: 'radio',
      options: [1, 2],
      description: 'Espessura do divisor',
    },
  },
};

export default meta;
type Story = StoryObj<UwDividerComponent>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (story) => ({
      template: `<div style="height: 100px; display: flex; align-items: center;">${story()}</div>`,
    }),
  ],
};

export const WithLabel: Story = {
  args: {
    orientation: 'horizontal',
    label: 'OU',
  },
};

export const WithIcon: Story = {
  args: {
    orientation: 'horizontal',
    icon: 'star',
  },
};

export const Thick: Story = {
  args: {
    orientation: 'horizontal',
    thickness: 2,
  },
};

export const InForm: Story = {
  args: {
    orientation: 'horizontal',
    label: 'Dados pessoais',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-4">
        <div class="text-sm text-gray-600">Conteúdo acima do divisor</div>
        <uw-divider label="Dados pessoais" />
        <div class="text-sm text-gray-600">Conteúdo abaixo do divisor</div>
      </div>
    `,
  }),
};
