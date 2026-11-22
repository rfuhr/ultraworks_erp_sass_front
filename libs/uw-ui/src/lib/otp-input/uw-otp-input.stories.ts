import type { Meta, StoryObj } from '@storybook/angular';
import { UwOtpInputComponent } from './uw-otp-input.component';

const meta: Meta<UwOtpInputComponent> = {
  title: 'UW-UI/Form/OtpInput',
  component: UwOtpInputComponent,
  tags: ['autodocs'],
  argTypes: {
    length: { control: 'number', description: 'Número de dígitos' },
    type: { control: 'radio', options: ['number', 'alphanumeric'], description: 'Tipo de input' },
    disabled: { control: 'boolean', description: 'Desabilitado' },
  },
};

export default meta;
type Story = StoryObj<UwOtpInputComponent>;

export const Default: Story = {
  args: {
    length: 6,
    type: 'number',
    disabled: false,
  },
};

export const FourDigits: Story = {
  args: {
    length: 4,
    type: 'number',
    disabled: false,
  },
};

export const SixDigits: Story = {
  args: {
    length: 6,
    type: 'number',
    disabled: false,
  },
};

export const EightDigits: Story = {
  args: {
    length: 8,
    type: 'number',
    disabled: false,
  },
};

export const Alphanumeric: Story = {
  args: {
    length: 6,
    type: 'alphanumeric',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    length: 6,
    type: 'number',
    disabled: true,
  },
};
