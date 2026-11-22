import type { Meta, StoryObj } from '@storybook/angular';
import { UwRatingComponent } from './uw-rating.component';

const meta: Meta<UwRatingComponent> = {
  title: 'UW-UI/Form/Rating',
  component: UwRatingComponent,
  tags: ['autodocs'],
  argTypes: {
    max: {
      control: 'number',
      description: 'Número máximo de estrelas',
    },
    half: {
      control: 'boolean',
      description: 'Permite meia estrela',
    },
    readonly: {
      control: 'boolean',
      description: 'Somente leitura',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitado',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho das estrelas',
    },
    showLabel: {
      control: 'boolean',
      description: 'Mostrar label com valor',
    },
  },
};

export default meta;
type Story = StoryObj<UwRatingComponent>;

export const Default: Story = {
  args: {
    max: 5,
  },
};

export const WithValue: Story = {
  args: {
    max: 5,
  },
  render: (args) => ({
    props: args,
    template: `<uw-rating [max]="max" />`,
  }),
};

export const HalfStars: Story = {
  args: {
    max: 5,
    half: true,
  },
};

export const Readonly: Story = {
  args: {
    max: 5,
    readonly: true,
  },
};

export const Disabled: Story = {
  args: {
    max: 5,
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    max: 5,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    max: 5,
    size: 'lg',
  },
};

export const TenStars: Story = {
  args: {
    max: 10,
  },
};

export const WithLabel: Story = {
  args: {
    max: 5,
    showLabel: true,
  },
};
