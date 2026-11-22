import type { Meta, StoryObj } from '@storybook/angular';
import { UwAvatarGroupComponent } from './uw-avatar-group.component';

const meta: Meta<UwAvatarGroupComponent> = {
  title: 'UW-UI/Data/AvatarGroup',
  component: UwAvatarGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Array de avatares' },
    maxVisible: { control: 'number', description: 'Máximo de avatares visíveis' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Tamanho dos avatares' },
    dynamicColor: { control: 'boolean', description: 'Cores dinâmicas baseadas no nome' },
  },
};

export default meta;
type Story = StoryObj<UwAvatarGroupComponent>;

const mockItems = [
  { src: 'https://i.pravatar.cc/150?u=1', initials: 'AB' },
  { src: 'https://i.pravatar.cc/150?u=2', initials: 'CD' },
  { src: 'https://i.pravatar.cc/150?u=3', initials: 'EF' },
  { src: 'https://i.pravatar.cc/150?u=4', initials: 'GH' },
  { src: 'https://i.pravatar.cc/150?u=5', initials: 'IJ' },
];

const initialsItems = [
  { initials: 'JS' },
  { initials: 'MA' },
  { initials: 'PO' },
  { initials: 'AC' },
  { initials: 'RS' },
];

export const Default: Story = {
  args: {
    items: mockItems,
    maxVisible: 3,
    size: 'md',
    dynamicColor: false,
  },
};

export const TwoVisible: Story = {
  args: {
    items: mockItems,
    maxVisible: 2,
    size: 'md',
    dynamicColor: false,
  },
};

export const FourVisible: Story = {
  args: {
    items: mockItems,
    maxVisible: 4,
    size: 'md',
    dynamicColor: false,
  },
};

export const AllVisible: Story = {
  args: {
    items: mockItems,
    maxVisible: 5,
    size: 'md',
    dynamicColor: false,
  },
};

export const Small: Story = {
  args: {
    items: mockItems,
    maxVisible: 3,
    size: 'sm',
    dynamicColor: false,
  },
};

export const Large: Story = {
  args: {
    items: mockItems,
    maxVisible: 3,
    size: 'lg',
    dynamicColor: false,
  },
};

export const WithInitials: Story = {
  args: {
    items: initialsItems,
    maxVisible: 3,
    size: 'md',
    dynamicColor: false,
  },
};

export const DynamicColors: Story = {
  args: {
    items: initialsItems,
    maxVisible: 4,
    size: 'md',
    dynamicColor: true,
  },
};

export const SingleAvatar: Story = {
  args: {
    items: [mockItems[0]],
    maxVisible: 3,
    size: 'md',
    dynamicColor: false,
  },
};

export const ManyAvatars: Story = {
  args: {
    items: [
      ...mockItems,
      { src: 'https://i.pravatar.cc/150?u=6', initials: 'KL' },
      { src: 'https://i.pravatar.cc/150?u=7', initials: 'MN' },
      { src: 'https://i.pravatar.cc/150?u=8', initials: 'OP' },
    ],
    maxVisible: 4,
    size: 'md',
    dynamicColor: false,
  },
};
