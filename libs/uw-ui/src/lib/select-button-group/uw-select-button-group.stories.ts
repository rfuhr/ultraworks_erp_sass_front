import type { Meta, StoryObj } from '@storybook/angular';
import { UwSelectButtonGroupComponent } from './uw-select-button-group.component';

const meta: Meta<UwSelectButtonGroupComponent> = {
  title: 'UW-UI/Form/SelectButtonGroup',
  component: UwSelectButtonGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object', description: 'Array de opções' },
    multiple: { control: 'boolean', description: 'Permite seleção múltipla' },
    variant: { control: 'radio', options: ['primary', 'secondary'], description: 'Variante visual' },
    size: { control: 'radio', options: ['sm', 'md'], description: 'Tamanho' },
    disabled: { control: 'boolean', description: 'Desabilitado' },
  },
};

export default meta;
type Story = StoryObj<UwSelectButtonGroupComponent>;

const mockOptions = [
  { label: 'Opção 1', value: '1' },
  { label: 'Opção 2', value: '2' },
  { label: 'Opção 3', value: '3' },
];

const statusOptions = [
  { label: 'Ativo', value: 'ativo' },
  { label: 'Inativo', value: 'inativo' },
  { label: 'Pendente', value: 'pendente' },
];

export const Default: Story = {
  args: {
    options: mockOptions,
    multiple: false,
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

export const Multiple: Story = {
  args: {
    options: mockOptions,
    multiple: true,
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    options: mockOptions,
    multiple: false,
    variant: 'secondary',
    size: 'md',
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    options: mockOptions,
    multiple: false,
    variant: 'primary',
    size: 'sm',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    options: mockOptions,
    multiple: false,
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};

export const StatusFilter: Story = {
  args: {
    options: statusOptions,
    multiple: true,
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

export const TwoOptions: Story = {
  args: {
    options: [
      { label: 'Sim', value: 'sim' },
      { label: 'Não', value: 'nao' },
    ],
    multiple: false,
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};

export const FourOptions: Story = {
  args: {
    options: [
      { label: 'P', value: 'p' },
      { label: 'M', value: 'm' },
      { label: 'G', value: 'g' },
      { label: 'GG', value: 'gg' },
    ],
    multiple: false,
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
};
