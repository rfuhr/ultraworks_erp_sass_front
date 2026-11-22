import type { Meta, StoryObj } from '@storybook/angular';
import { UwAlertComponent } from './uw-alert.component';

const meta: Meta<UwAlertComponent> = {
  title: 'UW-UI/Feedback/Alert',
  component: UwAlertComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
      description: 'Variante do alert',
    },
    dismissible: {
      control: 'boolean',
      description: 'Pode ser fechado',
    },
  },
};

export default meta;
type Story = StoryObj<UwAlertComponent>;

export const Info: Story = {
  args: {
    variant: 'info',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-alert variant="info">
        Esta é uma mensagem informativa.
      </uw-alert>
    `,
  }),
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-alert variant="success">
        Operação realizada com sucesso!
      </uw-alert>
    `,
  }),
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-alert variant="warning">
        Atenção: verifique os dados antes de continuar.
      </uw-alert>
    `,
  }),
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-alert variant="danger">
        Erro ao processar a requisição.
      </uw-alert>
    `,
  }),
};

export const Dismissible: Story = {
  args: {
    variant: 'info',
    dismissible: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-alert variant="info" [dismissible]="true">
        Este alert pode ser fechado.
      </uw-alert>
    `,
  }),
};
