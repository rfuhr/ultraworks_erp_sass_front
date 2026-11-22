import type { Meta, StoryObj } from '@storybook/angular';
import { UwSectionHeadingComponent } from './uw-section-heading.component';

const meta: Meta<UwSectionHeadingComponent> = {
  title: 'UW-UI/Data/SectionHeading',
  component: UwSectionHeadingComponent,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Texto do cabeçalho',
    },
    icon: {
      control: 'text',
      description: 'Nome do ícone',
    },
    variant: {
      control: 'radio',
      options: ['default', 'primary', 'secondary', 'success', 'danger'],
      description: 'Variante visual',
    },
  },
};

export default meta;
type Story = StoryObj<UwSectionHeadingComponent>;

export const Default: Story = {
  args: {
    text: 'Informações Gerais',
  },
};

export const WithIcon: Story = {
  args: {
    text: 'Dados Pessoais',
    icon: 'person',
  },
};

export const Underline: Story = {
  args: {
    text: 'Configurações',
    icon: 'settings',
    variant: 'primary',
  },
};

export const InContext: Story = {
  args: {
    text: 'Participantes',
    icon: 'people',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="space-y-4">
        <uw-section-heading text="Participantes" icon="people" />
        <div class="p-4 bg-gray-50 rounded">
          <p class="text-sm text-gray-600">Conteúdo da seção aqui...</p>
        </div>
      </div>
    `,
  }),
};

export const MultipleSections: Story = {
  args: {
    text: 'Seção 1',
  },
  render: () => ({
    template: `
      <div class="space-y-6">
        <div>
          <uw-section-heading text="Informações do Evento" icon="event" />
          <div class="mt-2 p-4 bg-gray-50 rounded text-sm">Conteúdo da seção 1</div>
        </div>
        <div>
          <uw-section-heading text="Participantes" icon="people" />
          <div class="mt-2 p-4 bg-gray-50 rounded text-sm">Conteúdo da seção 2</div>
        </div>
        <div>
          <uw-section-heading text="Avaliações" icon="rate_review" variant="primary" />
          <div class="mt-2 p-4 bg-gray-50 rounded text-sm">Conteúdo da seção 3</div>
        </div>
      </div>
    `,
  }),
};
