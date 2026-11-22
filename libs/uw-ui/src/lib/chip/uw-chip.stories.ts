import type { Meta, StoryObj } from '@storybook/angular';
import { UwChipComponent } from './uw-chip.component';

const meta: Meta<UwChipComponent> = {
  title: 'UW-UI/Data/Chip',
  component: UwChipComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Texto do chip' },
    variant: { control: 'radio', options: ['outlined', 'filled'], description: 'Variante visual' },
    size: { control: 'radio', options: ['sm', 'md'], description: 'Tamanho do chip' },
    color: { control: 'color', description: 'Cor customizada' },
    textColor: { control: 'color', description: 'Cor do texto' },
    removable: { control: 'boolean', description: 'Pode ser removido' },
    disabled: { control: 'boolean', description: 'Desabilitado' },
  },
};

export default meta;
type Story = StoryObj<UwChipComponent>;

export const Default: Story = {
  args: {
    label: 'Angular',
    variant: 'outlined',
    size: 'md',
    removable: false,
    disabled: false,
  },
};

export const Outlined: Story = {
  args: {
    label: 'TypeScript',
    variant: 'outlined',
    size: 'md',
    removable: false,
    disabled: false,
  },
};

export const Filled: Story = {
  args: {
    label: 'JavaScript',
    variant: 'filled',
    size: 'md',
    removable: false,
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    variant: 'outlined',
    size: 'sm',
    removable: false,
    disabled: false,
  },
};

export const Removable: Story = {
  args: {
    label: 'Removível',
    variant: 'outlined',
    size: 'md',
    removable: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Desabilitado',
    variant: 'outlined',
    size: 'md',
    removable: false,
    disabled: true,
  },
};

export const CustomColor: Story = {
  args: {
    label: 'Custom',
    variant: 'filled',
    size: 'md',
    color: '#10b981',
    textColor: '#ffffff',
    removable: false,
    disabled: false,
  },
};

export const MultipleChips: Story = {
  args: {
    label: 'Chip',
    variant: 'outlined',
    size: 'md',
    removable: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-wrap gap-2">
        <uw-chip label="Angular" variant="filled" />
        <uw-chip label="TypeScript" variant="filled" />
        <uw-chip label="RxJS" variant="outlined" />
        <uw-chip label="NgRx" variant="outlined" />
        <uw-chip label="Jest" variant="filled" />
      </div>
    `,
  }),
};

export const RemovableChips: Story = {
  args: {
    label: 'Chip',
    variant: 'outlined',
    size: 'md',
    removable: true,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-wrap gap-2">
        <uw-chip label="React" variant="outlined" [removable]="true" />
        <uw-chip label="Vue" variant="outlined" [removable]="true" />
        <uw-chip label="Angular" variant="outlined" [removable]="true" />
        <uw-chip label="Svelte" variant="outlined" [removable]="true" />
      </div>
    `,
  }),
};
