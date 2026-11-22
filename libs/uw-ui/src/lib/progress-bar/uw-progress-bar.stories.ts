import type { Meta, StoryObj } from '@storybook/angular';
import { UwProgressBarComponent } from './uw-progress-bar.component';

const meta: Meta<UwProgressBarComponent> = {
  title: 'UW-UI/Data/ProgressBar',
  component: UwProgressBarComponent,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valor do progresso (0-100)',
    },
    mode: {
      control: 'radio',
      options: ['determinate', 'indeterminate'],
      description: 'Modo do progress bar',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do progress bar',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error'],
      description: 'Cor do progress bar',
    },
    showLabel: {
      control: 'boolean',
      description: 'Mostrar label com percentual',
    },
  },
};

export default meta;
type Story = StoryObj<UwProgressBarComponent>;

export const Default: Story = {
  args: {
    value: 50,
    mode: 'determinate',
    size: 'md',
    color: 'primary',
  },
};

export const Small: Story = {
  args: {
    value: 50,
    mode: 'determinate',
    size: 'sm',
    color: 'primary',
  },
};

export const Large: Story = {
  args: {
    value: 50,
    mode: 'determinate',
    size: 'lg',
    color: 'primary',
  },
};

export const Success: Story = {
  args: {
    value: 100,
    mode: 'determinate',
    size: 'md',
    color: 'success',
  },
};

export const Warning: Story = {
  args: {
    value: 75,
    mode: 'determinate',
    size: 'md',
    color: 'warning',
  },
};

export const Error: Story = {
  args: {
    value: 25,
    mode: 'determinate',
    size: 'md',
    color: 'error',
  },
};

export const Indeterminate: Story = {
  args: {
    mode: 'indeterminate',
    size: 'md',
    color: 'primary',
  },
};

export const WithLabel: Story = {
  args: {
    value: 65,
    mode: 'determinate',
    size: 'md',
    color: 'primary',
    showLabel: true,
  },
};

export const ProgressValues: Story = {
  args: {
    value: 0,
    mode: 'determinate',
    size: 'md',
    color: 'primary',
  },
  render: () => ({
    template: `
      <div class="space-y-4">
        <div>
          <div class="text-xs mb-1">0%</div>
          <uw-progress-bar [value]="0" />
        </div>
        <div>
          <div class="text-xs mb-1">25%</div>
          <uw-progress-bar [value]="25" />
        </div>
        <div>
          <div class="text-xs mb-1">50%</div>
          <uw-progress-bar [value]="50" />
        </div>
        <div>
          <div class="text-xs mb-1">75%</div>
          <uw-progress-bar [value]="75" />
        </div>
        <div>
          <div class="text-xs mb-1">100%</div>
          <uw-progress-bar [value]="100" color="success" />
        </div>
      </div>
    `,
  }),
};
