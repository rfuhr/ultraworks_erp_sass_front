import type { Meta, StoryObj } from '@storybook/angular';
import { UwPickListComponent } from './uw-pick-list.component';

const meta: Meta<UwPickListComponent> = {
  title: 'uw-ui/PickList',
  component: UwPickListComponent,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object', description: 'Lista de opções disponíveis' },
    value: { control: 'text', description: 'Valor selecionado' },
    placeholder: { control: 'text', description: 'Texto exibido quando nenhuma opção está selecionada' },
    clearable: { control: 'boolean', description: 'Exibe botão de limpar (X)' },
    disabled: { control: 'boolean', description: 'Desabilita o seletor' },
    valueChange: { action: 'valueChange', description: 'Evento emitido ao selecionar ou limpar' },
  },
};

export default meta;
type Story = StoryObj<UwPickListComponent>;

const defaultOptions = [
  { label: 'Opção A', value: 'a' },
  { label: 'Opção B', value: 'b' },
  { label: 'Opção C', value: 'c' },
  { label: 'Opção D', value: 'd' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
  },
};

export const Clearable: Story = {
  args: {
    options: defaultOptions,
    clearable: true,
    value: 'a',
  },
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    disabled: true,
    value: 'b',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Escolha um evento',
  },
};
