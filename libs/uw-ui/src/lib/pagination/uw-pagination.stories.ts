import type { Meta, StoryObj } from '@storybook/angular';
import { UwPaginationComponent } from './uw-pagination.component';

const meta: Meta<UwPaginationComponent> = {
  title: 'UW-UI/Data/Pagination',
  component: UwPaginationComponent,
  tags: ['autodocs'],
  argTypes: {
    page: {
      control: 'number',
      description: 'Página atual (0-indexed)',
    },
    pageSize: {
      control: 'number',
      description: 'Itens por página',
    },
    totalElements: {
      control: 'number',
      description: 'Total de elementos',
    },
    entityLabel: {
      control: 'text',
      description: 'Label da entidade',
    },
  },
};

export default meta;
type Story = StoryObj<UwPaginationComponent>;

export const Default: Story = {
  args: {
    page: 0,
    pageSize: 10,
    totalElements: 100,
    entityLabel: 'registros',
  },
};

export const FirstPage: Story = {
  args: {
    page: 0,
    pageSize: 10,
    totalElements: 50,
  },
};

export const MiddlePage: Story = {
  args: {
    page: 4,
    pageSize: 10,
    totalElements: 100,
  },
};

export const LastPage: Story = {
  args: {
    page: 9,
    pageSize: 10,
    totalElements: 100,
  },
};

export const ManyPages: Story = {
  args: {
    page: 50,
    pageSize: 10,
    totalElements: 1000,
  },
};

export const FewItems: Story = {
  args: {
    page: 0,
    pageSize: 10,
    totalElements: 5,
  },
};

export const CustomEntityLabel: Story = {
  args: {
    page: 0,
    pageSize: 20,
    totalElements: 200,
    entityLabel: 'participantes',
  },
};

export const Empty: Story = {
  args: {
    page: 0,
    pageSize: 10,
    totalElements: 0,
  },
};
