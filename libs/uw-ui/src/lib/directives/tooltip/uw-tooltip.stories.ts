import type { Meta, StoryObj } from '@storybook/angular';
import { UWTooltip } from './uw-tooltip.directive';

const meta: Meta<UWTooltip> = {
  title: 'UW-UI/Utility/Tooltip',
  component: UWTooltip,
  tags: ['autodocs'],
  argTypes: {
    uwTooltip: { control: 'text', description: 'Texto do tooltip' },
    uwTooltipPosition: { control: 'radio', options: ['above', 'below', 'left', 'right'], description: 'Posição do tooltip' },
  },
};

export default meta;
type Story = StoryObj<UWTooltip>;

export const Above: Story = {
  args: {
    uwTooltip: 'Tooltip acima',
    uwTooltipPosition: 'above',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-16 flex justify-center">
        <button
          [uwTooltip]="uwTooltip"
          [uwTooltipPosition]="uwTooltipPosition"
          class="px-4 py-2 bg-primary text-white rounded">
          Passe o mouse
        </button>
      </div>
    `,
  }),
};

export const Below: Story = {
  args: {
    uwTooltip: 'Tooltip abaixo',
    uwTooltipPosition: 'below',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-16 flex justify-center">
        <button
          [uwTooltip]="uwTooltip"
          [uwTooltipPosition]="uwTooltipPosition"
          class="px-4 py-2 bg-primary text-white rounded">
          Passe o mouse
        </button>
      </div>
    `,
  }),
};

export const Left: Story = {
  args: {
    uwTooltip: 'Tooltip à esquerda',
    uwTooltipPosition: 'left',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-16 flex justify-center">
        <button
          [uwTooltip]="uwTooltip"
          [uwTooltipPosition]="uwTooltipPosition"
          class="px-4 py-2 bg-primary text-white rounded">
          Passe o mouse
        </button>
      </div>
    `,
  }),
};

export const Right: Story = {
  args: {
    uwTooltip: 'Tooltip à direita',
    uwTooltipPosition: 'right',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-16 flex justify-center">
        <button
          [uwTooltip]="uwTooltip"
          [uwTooltipPosition]="uwTooltipPosition"
          class="px-4 py-2 bg-primary text-white rounded">
          Passe o mouse
        </button>
      </div>
    `,
  }),
};

export const LongText: Story = {
  args: {
    uwTooltip: 'Este é um tooltip com um texto mais longo que demonstra como o componente lida com conteúdos extensos.',
    uwTooltipPosition: 'above',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-16 flex justify-center">
        <button
          [uwTooltip]="uwTooltip"
          [uwTooltipPosition]="uwTooltipPosition"
          class="px-4 py-2 bg-primary text-white rounded">
          Tooltip longo
        </button>
      </div>
    `,
  }),
};

export const OnIcon: Story = {
  args: {
    uwTooltip: 'Mais informações',
    uwTooltipPosition: 'right',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-16 flex justify-center">
        <uw-icon
          [uwTooltip]="uwTooltip"
          [uwTooltipPosition]="uwTooltipPosition"
          name="info"
          size="lg"
          class="cursor-pointer text-primary">
        </uw-icon>
      </div>
    `,
  }),
};

export const OnLink: Story = {
  args: {
    uwTooltip: 'Abrir em nova aba',
    uwTooltipPosition: 'above',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-16 flex justify-center">
        <a
          [uwTooltip]="uwTooltip"
          [uwTooltipPosition]="uwTooltipPosition"
          href="#"
          class="text-primary hover:underline">
          Link com tooltip
        </a>
      </div>
    `,
  }),
};

export const MultiplePositions: Story = {
  args: {
    uwTooltip: 'Tooltip',
    uwTooltipPosition: 'above',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-16 grid grid-cols-3 gap-8 max-w-2xl">
        <div class="flex justify-center">
          <button uwTooltip="Acima" uwTooltipPosition="above" class="px-4 py-2 bg-primary text-white rounded text-sm">Acima</button>
        </div>
        <div class="flex justify-center">
          <button uwTooltip="Acima" uwTooltipPosition="above" class="px-4 py-2 bg-primary text-white rounded text-sm">Acima</button>
        </div>
        <div class="flex justify-center">
          <button uwTooltip="Acima" uwTooltipPosition="above" class="px-4 py-2 bg-primary text-white rounded text-sm">Acima</button>
        </div>
        <div class="flex justify-center">
          <button uwTooltip="Esquerda" uwTooltipPosition="left" class="px-4 py-2 bg-primary text-white rounded text-sm">Esquerda</button>
        </div>
        <div class="flex justify-center">
          <button uwTooltip="Centro" uwTooltipPosition="above" class="px-4 py-2 bg-primary text-white rounded text-sm">Centro</button>
        </div>
        <div class="flex justify-center">
          <button uwTooltip="Direita" uwTooltipPosition="right" class="px-4 py-2 bg-primary text-white rounded text-sm">Direita</button>
        </div>
        <div class="flex justify-center">
          <button uwTooltip="Abaixo" uwTooltipPosition="below" class="px-4 py-2 bg-primary text-white rounded text-sm">Abaixo</button>
        </div>
        <div class="flex justify-center">
          <button uwTooltip="Abaixo" uwTooltipPosition="below" class="px-4 py-2 bg-primary text-white rounded text-sm">Abaixo</button>
        </div>
        <div class="flex justify-center">
          <button uwTooltip="Abaixo" uwTooltipPosition="below" class="px-4 py-2 bg-primary text-white rounded text-sm">Abaixo</button>
        </div>
      </div>
    `,
  }),
};
