import type { Meta, StoryObj } from '@storybook/angular';
import { UwEmptyStateComponent } from './uw-empty-state.component';

const meta: Meta<UwEmptyStateComponent> = {
  title: 'UW-UI/Feedback/EmptyState',
  component: UwEmptyStateComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Nome do ícone',
    },
    title: {
      control: 'text',
      description: 'Título do estado vazio',
    },
    description: {
      control: 'text',
      description: 'Descrição do estado vazio',
    },
    actionLabel: {
      control: 'text',
      description: 'Label do botão de ação',
    },
    actionIcon: {
      control: 'text',
      description: 'Ícone do botão de ação',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do estado vazio',
    },
  },
};

export default meta;
type Story = StoryObj<UwEmptyStateComponent>;

export const Default: Story = {
  args: {
    icon: 'inbox',
    title: 'Nenhum registro encontrado',
    description: 'Não há registros para exibir no momento.',
  },
};

export const WithAction: Story = {
  args: {
    icon: 'add_circle',
    title: 'Nenhum participante cadastrado',
    description: 'Comece adicionando o primeiro participante do evento.',
    actionLabel: 'Adicionar participante',
    actionIcon: 'add',
  },
};

export const SearchEmpty: Story = {
  args: {
    icon: 'search_off',
    title: 'Nenhum resultado',
    description: 'Não encontramos resultados para sua busca. Tente outros termos.',
  },
};

export const Small: Story = {
  args: {
    icon: 'info',
    title: 'Sem dados',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    icon: 'cloud_off',
    title: 'Sem conexão',
    description: 'Verifique sua conexão com a internet e tente novamente.',
    actionLabel: 'Tentar novamente',
    actionIcon: 'refresh',
    size: 'lg',
  },
};

export const ErrorState: Story = {
  args: {
    icon: 'error_outline',
    title: 'Algo deu errado',
    description: 'Ocorreu um erro ao carregar os dados. Por favor, tente novamente.',
    actionLabel: 'Recarregar',
    actionIcon: 'refresh',
  },
};
