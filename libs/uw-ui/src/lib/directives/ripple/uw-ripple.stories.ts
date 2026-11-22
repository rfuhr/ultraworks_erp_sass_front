import type { Meta, StoryObj } from '@storybook/angular';
import { UWRipple } from './uw-ripple.directive';

const meta: Meta<UWRipple> = {
  title: 'UW-UI/Utility/Ripple',
  component: UWRipple,
  tags: ['autodocs'],
  argTypes: {
    uwRippleDisabled: { control: 'boolean', description: 'Desabilita o efeito ripple' },
  },
};

export default meta;
type Story = StoryObj<UWRipple>;

export const Default: Story = {
  args: {
    uwRippleDisabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 space-y-4">
        <button uwRipple [uwRippleDisabled]="uwRippleDisabled" class="px-6 py-3 bg-primary text-white rounded-lg">
          Clique aqui (Ripple)
        </button>
        <p class="text-sm text-gray-600">Clique no botão para ver o efeito ripple</p>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    uwRippleDisabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 space-y-4">
        <button uwRipple [uwRippleDisabled]="uwRippleDisabled" class="px-6 py-3 bg-gray-500 text-white rounded-lg">
          Clique aqui (Sem Ripple)
        </button>
        <p class="text-sm text-gray-600">O efeito ripple está desabilitado</p>
      </div>
    `,
  }),
};

export const OnCard: Story = {
  args: {
    uwRippleDisabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8">
        <div uwRipple [uwRippleDisabled]="uwRippleDisabled" class="p-6 bg-white border rounded-lg cursor-pointer hover:bg-gray-50">
          <h3 class="font-semibold mb-2">Card com Ripple</h3>
          <p class="text-sm text-gray-600">Clique neste card para ver o efeito ripple</p>
        </div>
      </div>
    `,
  }),
};

export const OnIconButton: Story = {
  args: {
    uwRippleDisabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 flex gap-4">
        <button uwRipple [uwRippleDisabled]="uwRippleDisabled" class="p-3 bg-primary text-white rounded-full">
          <uw-icon name="add" />
        </button>
        <button uwRipple [uwRippleDisabled]="uwRippleDisabled" class="p-3 bg-secondary text-white rounded-full">
          <uw-icon name="edit" />
        </button>
        <button uwRipple [uwRippleDisabled]="uwRippleDisabled" class="p-3 bg-error text-white rounded-full">
          <uw-icon name="delete" />
        </button>
      </div>
    `,
  }),
};

export const MultipleElements: Story = {
  args: {
    uwRippleDisabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 space-y-4">
        <div class="flex gap-4">
          <button uwRipple [uwRippleDisabled]="uwRippleDisabled" class="px-4 py-2 bg-primary text-white rounded">Botão 1</button>
          <button uwRipple [uwRippleDisabled]="uwRippleDisabled" class="px-4 py-2 bg-secondary text-white rounded">Botão 2</button>
          <button uwRipple [uwRippleDisabled]="uwRippleDisabled" class="px-4 py-2 bg-tertiary text-white rounded">Botão 3</button>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div uwRipple [uwRippleDisabled]="uwRippleDisabled" class="p-4 bg-white border rounded cursor-pointer hover:bg-gray-50">
            <p class="text-sm">Card 1</p>
          </div>
          <div uwRipple [uwRippleDisabled]="uwRippleDisabled" class="p-4 bg-white border rounded cursor-pointer hover:bg-gray-50">
            <p class="text-sm">Card 2</p>
          </div>
          <div uwRipple [uwRippleDisabled]="uwRippleDisabled" class="p-4 bg-white border rounded cursor-pointer hover:bg-gray-50">
            <p class="text-sm">Card 3</p>
          </div>
        </div>
      </div>
    `,
  }),
};
