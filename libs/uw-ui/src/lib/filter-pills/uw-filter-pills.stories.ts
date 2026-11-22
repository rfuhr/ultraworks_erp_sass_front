import type { Meta, StoryObj } from '@storybook/angular';
import { UwFilterPillsComponent } from './uw-filter-pills.component';

const meta: Meta<UwFilterPillsComponent> = {
  title: 'uw-ui/FilterPills',
  component: UwFilterPillsComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Lista de items do filtro' },
    active: { control: 'text', description: 'Valor do item ativo' },
    size: {
      control: 'select',
      options: ['default', 'small'],
      description: 'Tamanho das pills',
    },
    activeChange: { action: 'activeChange', description: 'Evento emitido ao selecionar uma pill' },
  },
};

export default meta;
type Story = StoryObj<UwFilterPillsComponent>;

const defaultItems = [
  { value: 'todos', label: 'Todos' },
  { value: 'pendentes', label: 'Pendentes' },
  { value: 'aprovados', label: 'Aprovados' },
  { value: 'rejeitados', label: 'Rejeitados' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    active: 'todos',
  },
};

export const WithBadge: Story = {
  args: {
    items: [
      { value: 'todos', label: 'Todos', badge: 42 },
      { value: 'pendentes', label: 'Pendentes', badge: 12 },
      { value: 'aprovados', label: 'Aprovados', badge: 28 },
      { value: 'rejeitados', label: 'Rejeitados', badge: 2 },
    ],
    active: 'todos',
  },
};

export const WithIcon: Story = {
  args: {
    items: [
      { value: 'todos', label: 'Todos', icon: 'lists' },
      { value: 'pendentes', label: 'Pendentes', icon: 'pending' },
      { value: 'aprovados', label: 'Aprovados', icon: 'check_circle' },
      { value: 'rejeitados', label: 'Rejeitados', icon: 'cancel' },
    ],
    active: 'todos',
  },
};

export const WithIconAndBadge: Story = {
  args: {
    items: [
      { value: 'todos', label: 'Todos', badge: 42, icon: 'lists' },
      { value: 'pendentes', label: 'Pendentes', badge: 12, icon: 'pending' },
      { value: 'aprovados', label: 'Aprovados', badge: 28, icon: 'check_circle' },
      { value: 'rejeitados', label: 'Rejeitados', badge: 2, icon: 'cancel' },
    ],
    active: 'todos',
  },
};

export const Small: Story = {
  args: {
    items: defaultItems,
    active: 'pendentes',
    size: 'small',
  },
};
