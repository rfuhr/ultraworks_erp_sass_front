import type { Meta, StoryObj } from '@storybook/angular';
import { UwInputTagComponent } from './uw-input-tag.component';

const meta: Meta<UwInputTagComponent> = {
  title: 'UW-UI/Form/InputTag',
  component: UwInputTagComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text', description: 'Texto placeholder' },
    maxTags: { control: 'number', description: 'Máximo de tags' },
    disabled: { control: 'boolean', description: 'Desabilitado' },
  },
};

export default meta;
type Story = StoryObj<UwInputTagComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Adicionar tag e pressionar Enter...',
    maxTags: Infinity,
    disabled: false,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Digite e pressione Enter...',
    maxTags: Infinity,
    disabled: false,
  },
};

export const MaxTags: Story = {
  args: {
    placeholder: 'Máximo 3 tags...',
    maxTags: 3,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Adicionar tag...',
    maxTags: Infinity,
    disabled: true,
  },
};

export const FiveTagsLimit: Story = {
  args: {
    placeholder: 'Máximo 5 tags...',
    maxTags: 5,
    disabled: false,
  },
};

export const TenTagsLimit: Story = {
  args: {
    placeholder: 'Máximo 10 tags...',
    maxTags: 10,
    disabled: false,
  },
};
