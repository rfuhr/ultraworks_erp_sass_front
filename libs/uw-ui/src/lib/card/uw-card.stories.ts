import type { Meta, StoryObj } from '@storybook/angular';
import { UwCardComponent } from './uw-card.component';

const meta: Meta<UwCardComponent> = {
  title: 'UW-UI/Data/Card',
  component: UwCardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['outlined', 'flat'],
      description: 'Variante visual do card',
    },
    hoverable: {
      control: 'boolean',
      description: 'Efeito hover',
    },
    stripe: {
      control: 'select',
      options: ['none', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Cor da faixa lateral',
    },
    stripeBg: {
      control: 'boolean',
      description: 'Background colorido baseado na stripe',
    },
    bgColor: {
      control: 'color',
      description: 'Cor de fundo customizada',
    },
  },
};

export default meta;
type Story = StoryObj<UwCardComponent>;

export const Default: Story = {
  args: {
    variant: 'outlined',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-card [variant]="variant" [hoverable]="hoverable" [stripe]="stripe">
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-2">Título do Card</h3>
          <p class="text-sm text-gray-600">Conteúdo do card com informações relevantes.</p>
        </div>
      </uw-card>
    `,
  }),
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-card variant="outlined">
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-2">Card Outlined</h3>
          <p class="text-sm text-gray-600">Card com borda padrão.</p>
        </div>
      </uw-card>
    `,
  }),
};

export const Flat: Story = {
  args: {
    variant: 'flat',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-card variant="flat">
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-2">Card Flat</h3>
          <p class="text-sm text-gray-600">Card sem borda, apenas background.</p>
        </div>
      </uw-card>
    `,
  }),
};

export const Hoverable: Story = {
  args: {
    variant: 'outlined',
    hoverable: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-card variant="outlined" [hoverable]="true">
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-2">Card Hoverable</h3>
          <p class="text-sm text-gray-600">Passe o mouse sobre este card.</p>
        </div>
      </uw-card>
    `,
  }),
};

export const WithStripePrimary: Story = {
  args: {
    stripe: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-card stripe="primary">
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-2">Card com Stripe Primary</h3>
          <p class="text-sm text-gray-600">Card com faixa lateral primária.</p>
        </div>
      </uw-card>
    `,
  }),
};

export const WithStripeSuccess: Story = {
  args: {
    stripe: 'success',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-card stripe="success">
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-2">Card com Stripe Success</h3>
          <p class="text-sm text-gray-600">Card com faixa lateral de sucesso.</p>
        </div>
      </uw-card>
    `,
  }),
};

export const WithStripeWarning: Story = {
  args: {
    stripe: 'warning',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-card stripe="warning">
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-2">Card com Stripe Warning</h3>
          <p class="text-sm text-gray-600">Card com faixa lateral de aviso.</p>
        </div>
      </uw-card>
    `,
  }),
};

export const WithStripeError: Story = {
  args: {
    stripe: 'error',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-card stripe="error">
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-2">Card com Stripe Error</h3>
          <p class="text-sm text-gray-600">Card com faixa lateral de erro.</p>
        </div>
      </uw-card>
    `,
  }),
};
