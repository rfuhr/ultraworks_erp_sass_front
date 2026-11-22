import type { Meta, StoryObj } from '@storybook/angular';
import { UwStatusBadgeComponent } from './status-badge.component';

const meta: Meta<UwStatusBadgeComponent> = {
  title: 'UW-UI/Data/StatusBadge',
  component: UwStatusBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'radio',
      options: ['ativo', 'inativo'],
      description: 'Status do usuário a ser exibido',
    },
  },
};

export default meta;
type Story = StoryObj<UwStatusBadgeComponent>;

export const Ativo: Story = {
  args: {
    status: 'ativo',
  },
};

export const Inativo: Story = {
  args: {
    status: 'inativo',
  },
};

export const AmbosStatus: Story = {
  args: {
    status: 'ativo',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-wrap gap-2">
        <uw-status-badge status="ativo" />
        <uw-status-badge status="inativo" />
      </div>
    `,
  }),
};
