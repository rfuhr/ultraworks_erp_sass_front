import type { Meta, StoryObj } from '@storybook/angular';
import { UwPanelComponent } from './uw-panel.component';

const meta: Meta<UwPanelComponent> = {
  title: 'UW-UI/Layout/Panel',
  component: UwPanelComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'secondary', 'primary'], description: 'Variante visual do panel' },
    customColor: { control: 'color', description: 'Cor customizada' },
    title: { control: 'text', description: 'Título do panel' },
    icon: { control: 'text', description: 'Ícone do panel' },
  },
};

export default meta;
type Story = StoryObj<UwPanelComponent>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-panel [variant]="variant">
        <div class="p-4">
          <p class="text-sm text-gray-600">Conteúdo do panel.</p>
        </div>
      </uw-panel>
    `,
  }),
};

export const WithTitle: Story = {
  args: {
    variant: 'default',
    title: 'Informações Gerais',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-panel [variant]="variant" [title]="title">
        <div class="p-4">
          <p class="text-sm text-gray-600">Conteúdo do panel com título.</p>
        </div>
      </uw-panel>
    `,
  }),
};

export const WithIcon: Story = {
  args: {
    variant: 'default',
    title: 'Configurações',
    icon: 'settings',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-panel [variant]="variant" [title]="title" [icon]="icon">
        <div class="p-4">
          <p class="text-sm text-gray-600">Conteúdo do panel com ícone.</p>
        </div>
      </uw-panel>
    `,
  }),
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    title: 'Destaque',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-panel [variant]="variant" [title]="title">
        <div class="p-4">
          <p class="text-sm text-gray-600">Panel com variante primária.</p>
        </div>
      </uw-panel>
    `,
  }),
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    title: 'Secundário',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-panel [variant]="variant" [title]="title">
        <div class="p-4">
          <p class="text-sm text-gray-600">Panel com variante secundária.</p>
        </div>
      </uw-panel>
    `,
  }),
};
