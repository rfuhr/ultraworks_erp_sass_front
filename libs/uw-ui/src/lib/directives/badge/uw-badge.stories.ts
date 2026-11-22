import type { Meta, StoryObj } from '@storybook/angular';
import { UWBadge } from './uw-badge.directive';

const meta: Meta<UWBadge> = {
  title: 'UW-UI/Utility/Badge',
  component: UWBadge,
  tags: ['autodocs'],
  argTypes: {
    uwBadge: { control: 'text', description: 'Texto ou número do badge' },
    uwBadgePosition: { control: 'radio', options: ['above after', 'above before', 'below before', 'below after'], description: 'Posição do badge' },
    uwBadgeHidden: { control: 'boolean', description: 'Esconder o badge' },
  },
};

export default meta;
type Story = StoryObj<UWBadge>;

export const Default: Story = {
  args: {
    uwBadge: '5',
    uwBadgePosition: 'above after',
    uwBadgeHidden: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8">
        <button uwBadge [uwBadge]="uwBadge" [uwBadgePosition]="uwBadgePosition" [uwBadgeHidden]="uwBadgeHidden" class="px-4 py-2 bg-primary text-white rounded">
          Notificações
        </button>
      </div>
    `,
  }),
};

export const NumberBadge: Story = {
  args: {
    uwBadge: 99,
    uwBadgePosition: 'above after',
    uwBadgeHidden: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8">
        <button uwBadge [uwBadge]="uwBadge" [uwBadgePosition]="uwBadgePosition" [uwBadgeHidden]="uwBadgeHidden" class="px-4 py-2 bg-primary text-white rounded">
          Mensagens
        </button>
      </div>
    `,
  }),
};

export const LargeNumber: Story = {
  args: {
    uwBadge: '999+',
    uwBadgePosition: 'above after',
    uwBadgeHidden: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8">
        <button uwBadge [uwBadge]="uwBadge" [uwBadgePosition]="uwBadgePosition" [uwBadgeHidden]="uwBadgeHidden" class="px-4 py-2 bg-primary text-white rounded">
          Alertas
        </button>
      </div>
    `,
  }),
};

export const AboveBefore: Story = {
  args: {
    uwBadge: '3',
    uwBadgePosition: 'above before',
    uwBadgeHidden: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8">
        <button uwBadge [uwBadge]="uwBadge" [uwBadgePosition]="uwBadgePosition" [uwBadgeHidden]="uwBadgeHidden" class="px-4 py-2 bg-primary text-white rounded">
          Tarefas
        </button>
      </div>
    `,
  }),
};

export const BelowAfter: Story = {
  args: {
    uwBadge: '7',
    uwBadgePosition: 'below after',
    uwBadgeHidden: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8">
        <button uwBadge [uwBadge]="uwBadge" [uwBadgePosition]="uwBadgePosition" [uwBadgeHidden]="uwBadgeHidden" class="px-4 py-2 bg-primary text-white rounded">
          Itens
        </button>
      </div>
    `,
  }),
};

export const BelowBefore: Story = {
  args: {
    uwBadge: '2',
    uwBadgePosition: 'below before',
    uwBadgeHidden: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8">
        <button uwBadge [uwBadge]="uwBadge" [uwBadgePosition]="uwBadgePosition" [uwBadgeHidden]="uwBadgeHidden" class="px-4 py-2 bg-primary text-white rounded">
          Pedidos
        </button>
      </div>
    `,
  }),
};

export const Hidden: Story = {
  args: {
    uwBadge: '5',
    uwBadgePosition: 'above after',
    uwBadgeHidden: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8">
        <button uwBadge [uwBadge]="uwBadge" [uwBadgePosition]="uwBadgePosition" [uwBadgeHidden]="uwBadgeHidden" class="px-4 py-2 bg-primary text-white rounded">
          Badge oculto
        </button>
        <p class="text-sm text-gray-600 mt-4">O badge está oculto</p>
      </div>
    `,
  }),
};

export const OnIcon: Story = {
  args: {
    uwBadge: '3',
    uwBadgePosition: 'above after',
    uwBadgeHidden: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8">
        <div class="inline-block p-3 bg-gray-100 rounded-full cursor-pointer" uwBadge [uwBadge]="uwBadge" [uwBadgePosition]="uwBadgePosition" [uwBadgeHidden]="uwBadgeHidden">
          <uw-icon name="notifications" size="lg" />
        </div>
      </div>
    `,
  }),
};

export const OnAvatar: Story = {
  args: {
    uwBadge: '5',
    uwBadgePosition: 'above after',
    uwBadgeHidden: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8">
        <div class="inline-block" uwBadge [uwBadge]="uwBadge" [uwBadgePosition]="uwBadgePosition" [uwBadgeHidden]="uwBadgeHidden">
          <uw-avatar initials="JS" size="lg" />
        </div>
      </div>
    `,
  }),
};

export const MultipleBadges: Story = {
  args: {
    uwBadge: '1',
    uwBadgePosition: 'above after',
    uwBadgeHidden: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 flex gap-8">
        <div class="inline-block p-3 bg-gray-100 rounded-full cursor-pointer" uwBadge uwBadge="3" uwBadgePosition="above after">
          <uw-icon name="email" size="lg" />
        </div>
        <div class="inline-block p-3 bg-gray-100 rounded-full cursor-pointer" uwBadge uwBadge="12" uwBadgePosition="above after">
          <uw-icon name="chat" size="lg" />
        </div>
        <div class="inline-block p-3 bg-gray-100 rounded-full cursor-pointer" uwBadge uwBadge="5" uwBadgePosition="above after">
          <uw-icon name="notifications" size="lg" />
        </div>
      </div>
    `,
  }),
};
