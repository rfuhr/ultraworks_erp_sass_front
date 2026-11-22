import type { Meta, StoryObj } from '@storybook/angular';
import { UwPageHeaderComponent } from './uw-page-header.component';

const meta: Meta<UwPageHeaderComponent> = {
  title: 'UW-UI/Layout/PageHeader',
  component: UwPageHeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título da página',
    },
    description: {
      control: 'text',
      description: 'Descrição da página',
    },
    backLabel: {
      control: 'text',
      description: 'Label do botão voltar',
    },
  },
};

export default meta;
type Story = StoryObj<UwPageHeaderComponent>;

export const Default: Story = {
  args: {
    title: 'Dashboard',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Participantes',
    description: 'Gerencie os participantes do evento',
  },
};

export const WithBackButton: Story = {
  args: {
    title: 'Detalhes do Participante',
    description: 'Visualize e edite as informações do participante',
    backLabel: 'Voltar para lista',
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Relatório de Atividades do Evento Acadêmico Internacional 2024',
    description: 'Visualize o relatório completo de atividades',
  },
};

export const InContext: Story = {
  args: {
    title: 'Usuários',
    description: 'Gerencie os usuários do sistema',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-6">
        <uw-page-header title="Usuários" description="Gerencie os usuários do sistema" />
        <div class="mt-6 p-4 bg-gray-100 rounded">
          <p class="text-sm text-gray-600">Conteúdo da página aqui...</p>
        </div>
      </div>
    `,
  }),
};
