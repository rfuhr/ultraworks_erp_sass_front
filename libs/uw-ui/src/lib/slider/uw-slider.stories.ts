import type { Meta, StoryObj } from '@storybook/angular';
import { UwSliderComponent } from './uw-slider.component';

const meta: Meta<UwSliderComponent> = {
  title: 'UW-UI/Form/Slider',
  component: UwSliderComponent,
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
      description: 'Valor mínimo',
    },
    max: {
      control: 'number',
      description: 'Valor máximo',
    },
    step: {
      control: 'number',
      description: 'Incremento',
    },
    range: {
      control: 'boolean',
      description: 'Modo range (dois handles)',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitado',
    },
  },
};

export default meta;
type Story = StoryObj<UwSliderComponent>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
  },
};

export const WithSteps: Story = {
  args: {
    min: 0,
    max: 100,
    step: 10,
  },
};

export const Range: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    range: true,
  },
};

export const CustomRange: Story = {
  args: {
    min: 0,
    max: 1000,
    step: 50,
  },
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: true,
  },
};

export const SmallRange: Story = {
  args: {
    min: 0,
    max: 10,
    step: 1,
  },
};
