import type { Meta, StoryObj } from '@storybook/angular';
import { UwBadgeComponent } from './uw-badge.component';

const meta: Meta<UwBadgeComponent> = {
  title: 'UW-UI/Data/Badge',
  component: UwBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto ou número do badge',
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'danger', 'warning', 'neutral', 'soft'],
      description: 'Variante visual do badge',
    },
    badgeSize: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do badge',
    },
    dot: {
      control: 'boolean',
      description: 'Badge como ponto (sem texto)',
    },
  },
};

export default meta;
type Story = StoryObj<UwBadgeComponent>;

export const Primary: Story = {
  args: {
    label: '5',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    label: 'Novo',
    variant: 'success',
  },
};

export const Danger: Story = {
  args: {
    label: '99+',
    variant: 'danger',
  },
};

export const Warning: Story = {
  args: {
    label: '!',
    variant: 'warning',
  },
};

export const Neutral: Story = {
  args: {
    label: 'Info',
    variant: 'neutral',
  },
};

export const Soft: Story = {
  args: {
    label: 'Beta',
    variant: 'soft',
  },
};

export const Dot: Story = {
  args: {
    variant: 'danger',
    dot: true,
  },
};

export const Small: Story = {
  args: {
    label: '3',
    variant: 'primary',
    badgeSize: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: '3',
    variant: 'primary',
    badgeSize: 'md',
  },
};

export const Large: Story = {
  args: {
    label: '3',
    variant: 'primary',
    badgeSize: 'lg',
  },
};

export const LongText: Story = {
  args: {
    label: '999+',
    variant: 'danger',
  },
};
