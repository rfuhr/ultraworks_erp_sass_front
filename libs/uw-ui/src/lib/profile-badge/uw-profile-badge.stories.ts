import type { Meta, StoryObj } from '@storybook/angular';
import { UwProfileBadgeComponent } from './uw-profile-badge.component';

const meta: Meta<UwProfileBadgeComponent> = {
  title: 'UW-UI/Data/PerfilBadge',
  component: UwProfileBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    tipo: {
      control: 'radio',
      options: ['avaliador', 'administrativo'],
      description: 'Tipo de perfil a ser exibido',
    },
  },
};

export default meta;
type Story = StoryObj<UwProfileBadgeComponent>;

export const Avaliador: Story = {
  args: {
    tipo: 'avaliador',
  },
};

export const Administrativo: Story = {
  args: {
    tipo: 'administrativo',
  },
};

export const MultiplosPerfis: Story = {
  args: {
    tipo: 'avaliador',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-wrap gap-2">
        <uw-profile-badge tipo="avaliador" />
        <uw-profile-badge tipo="administrativo" />
        <uw-profile-badge tipo="avaliador" />
        <uw-profile-badge tipo="administrativo" />
      </div>
    `,
  }),
};
