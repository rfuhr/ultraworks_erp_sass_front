import type { Meta, StoryObj } from '@storybook/angular';
import { UwHelpComponent, HelpContent } from './uw-help.component';

const meta: Meta<UwHelpComponent> = {
  title: 'UW-UI/Utility/Help',
  component: UwHelpComponent,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'object', description: 'Conteúdo de ajuda' },
  },
};

export default meta;
type Story = StoryObj<UwHelpComponent>;

const sampleContent: HelpContent = {
  title: 'Como usar o sistema',
  sections: [
    {
      id: 'getting-started',
      title: 'Começando',
      body: 'Para começar a usar o sistema, siga os passos abaixo:',
      rules: [
        'Faça login com suas credenciais',
        'Acesse o dashboard principal',
        'Configure seu perfil',
      ],
    },
    {
      id: 'creating-events',
      title: 'Criando eventos',
      body: 'Para criar um novo evento:',
      rules: [
        'Clique em "Novo Evento" no menu principal',
        'Preencha as informações básicas',
        'Configure as datas e horários',
        'Adicione os participantes',
        'Salve o evento',
      ],
    },
    {
      id: 'managing-participants',
      title: 'Gerenciando participantes',
      body: 'Você pode gerenciar participantes de várias formas:',
      rules: [
        'Importar lista de participantes via CSV',
        'Adicionar participantes manualmente',
        'Enviar convites por email',
        'Aprovar ou rejeitar inscrições',
      ],
    },
  ],
};

export const Default: Story = {
  args: {
    content: sampleContent,
  },
};

export const SingleSection: Story = {
  args: {
    content: {
      title: 'Ajuda rápida',
      sections: [
        {
          id: 'quick-help',
          title: 'Informação importante',
          body: 'Esta é uma mensagem de ajuda rápida com informações importantes sobre o uso do sistema.',
          rules: [
            'Primeira regra importante',
            'Segunda regra importante',
            'Terceira regra importante',
          ],
        },
      ],
    },
  },
};

export const MultipleSections: Story = {
  args: {
    content: {
      title: 'Guia completo',
      sections: [
        {
          id: 'section-1',
          title: 'Seção 1',
          body: 'Conteúdo da primeira seção.',
          rules: ['Regra 1.1', 'Regra 1.2'],
        },
        {
          id: 'section-2',
          title: 'Seção 2',
          body: 'Conteúdo da segunda seção.',
          rules: ['Regra 2.1', 'Regra 2.2', 'Regra 2.3'],
        },
        {
          id: 'section-3',
          title: 'Seção 3',
          body: 'Conteúdo da terceira seção.',
          rules: ['Regra 3.1'],
        },
        {
          id: 'section-4',
          title: 'Seção 4',
          body: 'Conteúdo da quarta seção.',
          rules: ['Regra 4.1', 'Regra 4.2'],
        },
      ],
    },
  },
};

export const WithLongContent: Story = {
  args: {
    content: {
      title: 'Documentação completa',
      sections: [
        {
          id: 'intro',
          title: 'Introdução',
          body: 'Esta documentação fornece todas as informações necessárias para utilizar o sistema de forma eficiente. Leia cada seção cuidadosamente para entender todas as funcionalidades disponíveis.',
          rules: [
            'Leia toda a documentação antes de começar',
            'Teste as funcionalidades em um ambiente de teste',
            'Entre em contato com o suporte em caso de dúvidas',
          ],
        },
        {
          id: 'features',
          title: 'Funcionalidades principais',
          body: 'O sistema oferece diversas funcionalidades para gerenciar seus eventos de forma completa.',
          rules: [
            'Criação e edição de eventos',
            'Gerenciamento de participantes',
            'Envio de notificações',
            'Geração de relatórios',
            'Integração com sistemas externos',
            'Exportação de dados',
          ],
        },
        {
          id: 'tips',
          title: 'Dicas e truques',
          body: 'Aqui estão algumas dicas para aproveitar melhor o sistema.',
          rules: [
            'Use atalhos de teclado para navegar mais rápido',
            'Configure notificações para não perder eventos importantes',
            'Faça backup regular dos seus dados',
            'Use filtros para encontrar informações rapidamente',
          ],
        },
      ],
    },
  },
};

export const EmptyRules: Story = {
  args: {
    content: {
      title: 'Ajuda simples',
      sections: [
        {
          id: 'simple',
          title: 'Informação básica',
          body: 'Esta é uma seção de ajuda sem regras específicas, apenas com texto explicativo.',
          rules: [],
        },
      ],
    },
  },
};
