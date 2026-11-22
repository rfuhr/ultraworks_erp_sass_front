import type { Meta, StoryObj } from '@storybook/angular';
import { UwSkeletonComponent } from './uw-skeleton.component';

const meta: Meta<UwSkeletonComponent> = {
  title: 'UW-UI/Feedback/Skeleton',
  component: UwSkeletonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circle', 'rect', 'card', 'table-row'],
      description: 'Variante do skeleton',
    },
    lines: {
      control: 'number',
      description: 'Número de linhas (para variant text)',
    },
    width: {
      control: 'text',
      description: 'Largura customizada',
    },
    height: {
      control: 'text',
      description: 'Altura customizada',
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius customizado',
    },
  },
};

export default meta;
type Story = StoryObj<UwSkeletonComponent>;

export const Text: Story = {
  args: {
    variant: 'text',
    lines: 3,
  },
};

export const SingleLine: Story = {
  args: {
    variant: 'text',
    lines: 1,
  },
};

export const FiveLines: Story = {
  args: {
    variant: 'text',
    lines: 5,
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: '80px',
    height: '80px',
  },
};

export const Rectangle: Story = {
  args: {
    variant: 'rect',
    width: '200px',
    height: '120px',
    borderRadius: '8px',
  },
};

export const CustomSize: Story = {
  args: {
    variant: 'rect',
    width: '100%',
    height: '200px',
    borderRadius: '12px',
  },
};

export const CardSkeleton: Story = {
  args: {
    variant: 'rect',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4 space-y-4">
        <uw-skeleton variant="rect" width="100%" height="200px" borderRadius="8px" />
        <uw-skeleton variant="text" [lines]="1" width="60%" />
        <uw-skeleton variant="text" [lines]="3" />
      </div>
    `,
  }),
};
