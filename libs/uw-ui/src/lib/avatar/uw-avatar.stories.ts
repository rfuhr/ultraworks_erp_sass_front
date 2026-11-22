import type { Meta, StoryObj } from '@storybook/angular';
import { UwAvatarComponent } from './uw-avatar.component';

const meta: Meta<UwAvatarComponent> = {
  title: 'UW-UI/Data/Avatar',
  component: UwAvatarComponent,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL da imagem',
    },
    initials: {
      control: 'text',
      description: 'Iniciais do nome',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do avatar',
    },
    bgColor: {
      control: 'color',
      description: 'Cor de fundo customizada',
    },
  },
};

export default meta;
type Story = StoryObj<UwAvatarComponent>;

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=1',
    size: 'md',
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'JS',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    initials: 'AB',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    initials: 'CD',
    size: 'lg',
  },
};

export const CustomColor: Story = {
  args: {
    initials: 'EF',
    size: 'md',
    bgColor: '#10b981',
  },
};

export const AvatarGroup: Story = {
  args: {
    initials: 'GH',
    size: 'md',
  },
  render: () => ({
    template: `
      <div class="flex -space-x-2">
        <uw-avatar initials="AB" size="md" />
        <uw-avatar initials="CD" size="md" bgColor="#10b981" />
        <uw-avatar initials="EF" size="md" bgColor="#f59e0b" />
        <uw-avatar initials="+5" size="md" bgColor="#6b7280" />
      </div>
    `,
  }),
};
