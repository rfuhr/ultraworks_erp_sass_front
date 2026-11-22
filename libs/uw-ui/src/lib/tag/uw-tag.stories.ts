import type { Meta, StoryObj } from '@storybook/angular';
import { UwTagComponent } from './uw-tag.component';

const meta: Meta<UwTagComponent> = {
  title: 'UW-UI/Data/Tag',
  component: UwTagComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto da tag',
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'neutral', 'soft'],
      description: 'Variante visual da tag',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
      description: 'Tamanho da tag',
    },
    removable: {
      control: 'boolean',
      description: 'Pode ser removida',
    },
  },
};

export default meta;
type Story = StoryObj<UwTagComponent>;

export const Primary: Story = {
  args: {
    label: 'Angular',
    value: 'angular',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    label: 'Ativo',
    value: 'ativo',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    label: 'Pendente',
    value: 'pendente',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    label: 'Excluído',
    value: 'excluido',
    variant: 'danger',
  },
};

export const Info: Story = {
  args: {
    label: 'Info',
    value: 'info',
    variant: 'soft',
  },
};

export const Neutral: Story = {
  args: {
    label: 'Rascunho',
    value: 'rascunho',
    variant: 'neutral',
  },
};

export const Small: Story = {
  args: {
    label: 'Small',
    value: 'small',
    variant: 'primary',
    size: 'sm',
  },
};

export const NotRemovable: Story = {
  args: {
    label: 'Fixo',
    value: 'fixo',
    variant: 'primary',
    removable: false,
  },
};

export const MultipleTags: Story = {
  args: {
    label: 'Tag',
    value: 'tag',
    variant: 'primary',
  },
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-2">
        <uw-tag label="Angular" value="angular" variant="primary" />
        <uw-tag label="TypeScript" value="typescript" variant="soft" />
        <uw-tag label="Storybook" value="storybook" variant="success" />
        <uw-tag label="Tailwind" value="tailwind" variant="warning" />
      </div>
    `,
  }),
};
