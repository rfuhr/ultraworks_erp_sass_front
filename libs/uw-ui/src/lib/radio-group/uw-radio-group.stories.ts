import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { UwRadioGroupComponent } from './uw-radio-group.component';
import { UwRadioOptionComponent } from './uw-radio-option.component';

const meta: Meta<UwRadioGroupComponent> = {
  title: 'UW-UI/Form/RadioGroup',
  component: UwRadioGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [UwRadioOptionComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Desabilita o grupo',
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Orientação das opções',
    },
  },
};

export default meta;
type Story = StoryObj<UwRadioGroupComponent>;

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    props: args,
    component: UwRadioGroupComponent,
    template: `
      <uw-radio-group orientation="vertical">
        <uw-radio-option value="opcao1" label="Opção 1" />
        <uw-radio-option value="opcao2" label="Opção 2" />
        <uw-radio-option value="opcao3" label="Opção 3" />
      </uw-radio-group>
    `,
  }),
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-radio-group orientation="horizontal">
        <uw-radio-option value="sim" label="Sim" />
        <uw-radio-option value="nao" label="Não" />
        <uw-radio-option value="talvez" label="Talvez" />
      </uw-radio-group>
    `,
  }),
};

export const WithSelectedValue: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-radio-group orientation="vertical" [value]="'opcao2'">
        <uw-radio-option value="opcao1" label="Opção 1" />
        <uw-radio-option value="opcao2" label="Opção 2 (selecionada)" />
        <uw-radio-option value="opcao3" label="Opção 3" />
      </uw-radio-group>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    orientation: 'vertical',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-radio-group [disabled]="true" orientation="vertical">
        <uw-radio-option value="opcao1" label="Opção 1" />
        <uw-radio-option value="opcao2" label="Opção 2" />
        <uw-radio-option value="opcao3" label="Opção 3" />
      </uw-radio-group>
    `,
  }),
};

export const WithDisabledOption: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-radio-group orientation="vertical">
        <uw-radio-option value="opcao1" label="Opção 1" />
        <uw-radio-option value="opcao2" label="Opção 2 (desabilitada)" [disabled]="true" />
        <uw-radio-option value="opcao3" label="Opção 3" />
      </uw-radio-group>
    `,
  }),
};
