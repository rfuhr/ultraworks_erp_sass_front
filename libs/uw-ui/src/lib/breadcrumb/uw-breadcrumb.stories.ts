import type { Meta, StoryObj } from '@storybook/angular';
import { UwBreadcrumbComponent } from './uw-breadcrumb.component';

const meta: Meta<UwBreadcrumbComponent> = {
  title: 'UW-UI/Navigation/Breadcrumb',
  component: UwBreadcrumbComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Array de itens do breadcrumb' },
    separator: { control: 'text', description: 'Ícone separador' },
    maxItems: { control: 'number', description: 'Máximo de itens visíveis (0 = todos)' },
  },
};

export default meta;
type Story = StoryObj<UwBreadcrumbComponent>;

const mockItems = [
  { label: 'Home', route: '/' },
  { label: 'Participantes', route: '/participantes' },
  { label: 'João Silva', route: '/participantes/1' },
];

const longItems = [
  { label: 'Home', route: '/' },
  { label: 'Eventos', route: '/eventos' },
  { label: 'Congresso 2024', route: '/eventos/2024' },
  { label: 'Participantes', route: '/eventos/2024/participantes' },
  { label: 'João Silva', route: '/eventos/2024/participantes/1' },
];

export const Default: Story = {
  args: {
    items: mockItems,
    separator: 'chevron_right',
    maxItems: 0,
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { label: 'Dashboard', route: '/' },
      { label: 'Relatórios', route: '/relatorios' },
    ],
    separator: 'chevron_right',
    maxItems: 0,
  },
};

export const FourItems: Story = {
  args: {
    items: longItems.slice(0, 4),
    separator: 'chevron_right',
    maxItems: 0,
  },
};

export const Collapsed: Story = {
  args: {
    items: longItems,
    separator: 'chevron_right',
    maxItems: 3,
  },
};

export const CustomSeparator: Story = {
  args: {
    items: mockItems,
    separator: 'arrow_forward',
    maxItems: 0,
  },
};

export const CurrentPageOnly: Story = {
  args: {
    items: [
      { label: 'Home', route: '/' },
      { label: 'Página Atual' },
    ],
    separator: 'chevron_right',
    maxItems: 0,
  },
};
