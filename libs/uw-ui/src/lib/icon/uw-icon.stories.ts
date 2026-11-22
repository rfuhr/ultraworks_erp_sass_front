import type { Meta, StoryObj } from '@storybook/angular';
import { UwIconComponent } from './uw-icon.component';

const meta: Meta<UwIconComponent> = {
  title: 'UW-UI/Utility/Icon',
  component: UwIconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Nome do ícone Material Symbols',
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamanho do ícone',
    },
    filled: {
      control: 'boolean',
      description: 'Ícone preenchido',
    },
  },
};

export default meta;
type Story = StoryObj<UwIconComponent>;

export const Default: Story = {
  args: {
    name: 'home',
    size: 'md',
  },
};

export const ExtraSmall: Story = {
  args: {
    name: 'home',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    name: 'home',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    name: 'home',
    size: 'lg',
  },
};

export const Filled: Story = {
  args: {
    name: 'favorite',
    size: 'lg',
    filled: true,
  },
};

export const Outlined: Story = {
  args: {
    name: 'favorite',
    size: 'lg',
    filled: false,
  },
};

export const IconGallery: Story = {
  args: {
    name: 'home',
    size: 'md',
  },
  render: () => ({
    template: `
      <div class="grid grid-cols-6 gap-4">
        <div class="flex flex-col items-center gap-1">
          <uw-icon name="home" size="lg" />
          <span class="text-xs">home</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <uw-icon name="search" size="lg" />
          <span class="text-xs">search</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <uw-icon name="settings" size="lg" />
          <span class="text-xs">settings</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <uw-icon name="person" size="lg" />
          <span class="text-xs">person</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <uw-icon name="edit" size="lg" />
          <span class="text-xs">edit</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <uw-icon name="delete" size="lg" />
          <span class="text-xs">delete</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <uw-icon name="add" size="lg" />
          <span class="text-xs">add</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <uw-icon name="close" size="lg" />
          <span class="text-xs">close</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <uw-icon name="check" size="lg" />
          <span class="text-xs">check</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <uw-icon name="menu" size="lg" />
          <span class="text-xs">menu</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <uw-icon name="arrow_back" size="lg" />
          <span class="text-xs">arrow_back</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <uw-icon name="arrow_forward" size="lg" />
          <span class="text-xs">arrow_forward</span>
        </div>
      </div>
    `,
  }),
};
