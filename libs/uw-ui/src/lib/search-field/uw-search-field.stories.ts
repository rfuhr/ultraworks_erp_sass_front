import type { Meta, StoryObj } from '@storybook/angular';
import { UwSearchFieldComponent } from './uw-search-field.component';

const meta: Meta<UwSearchFieldComponent> = {
  title: 'UW-UI/Form/SearchField',
  component: UwSearchFieldComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text', description: 'Texto placeholder' },
    initialValue: { control: 'text', description: 'Valor inicial' },
    disabled: { control: 'boolean', description: 'Desabilitado' },
    appliedFilter: { control: 'text', description: 'Filtro aplicado' },
    lazy: { control: 'boolean', description: 'Modo lazy loading' },
  },
};

export default meta;
type Story = StoryObj<UwSearchFieldComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Buscar...',
    initialValue: '',
    disabled: false,
    appliedFilter: '',
    lazy: false,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Buscar participantes...',
    initialValue: '',
    disabled: false,
    appliedFilter: '',
    lazy: false,
  },
};

export const WithInitialValue: Story = {
  args: {
    placeholder: 'Buscar...',
    initialValue: 'João Silva',
    disabled: false,
    appliedFilter: '',
    lazy: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Buscar...',
    initialValue: '',
    disabled: true,
    appliedFilter: '',
    lazy: false,
  },
};

export const WithAppliedFilter: Story = {
  args: {
    placeholder: 'Buscar...',
    initialValue: '',
    disabled: false,
    appliedFilter: 'Status: Ativo',
    lazy: false,
  },
};

export const LazyMode: Story = {
  args: {
    placeholder: 'Buscar (lazy)...',
    initialValue: '',
    disabled: false,
    appliedFilter: '',
    lazy: true,
  },
};
