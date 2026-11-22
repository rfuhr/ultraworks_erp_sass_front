import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { UwAccordionComponent } from './uw-accordion.component';
import { UwAccordionItemComponent } from './uw-accordion-item.component';
import { UwAccordionTriggerComponent } from './uw-accordion-trigger.component';
import { UwAccordionContentComponent } from './uw-accordion-content.component';
import { UwIconComponent } from '../icon/uw-icon.component';

const meta: Meta<UwAccordionComponent> = {
  title: 'UW-UI/Navigation/Accordion',
  component: UwAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UwAccordionItemComponent,
        UwAccordionTriggerComponent,
        UwAccordionContentComponent,
        UwIconComponent,
      ],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Modo de expansão: single (apenas um aberto) ou multiple (vários abertos)',
    },
  },
};

export default meta;
type Story = StoryObj<UwAccordionComponent>;

export const SingleMode: Story = {
  args: {
    mode: 'single',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-accordion mode="single">
        <uw-accordion-item>
          <uw-accordion-trigger>Seção 1</uw-accordion-trigger>
          <uw-accordion-content>
            <div class="p-4 text-sm">Conteúdo da seção 1. Apenas uma seção pode estar aberta por vez.</div>
          </uw-accordion-content>
        </uw-accordion-item>
        <uw-accordion-item>
          <uw-accordion-trigger>Seção 2</uw-accordion-trigger>
          <uw-accordion-content>
            <div class="p-4 text-sm">Conteúdo da seção 2. Ao abrir esta, a seção 1 será fechada.</div>
          </uw-accordion-content>
        </uw-accordion-item>
        <uw-accordion-item>
          <uw-accordion-trigger>Seção 3</uw-accordion-trigger>
          <uw-accordion-content>
            <div class="p-4 text-sm">Conteúdo da seção 3.</div>
          </uw-accordion-content>
        </uw-accordion-item>
      </uw-accordion>
    `,
  }),
};

export const MultipleMode: Story = {
  args: {
    mode: 'multiple',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-accordion mode="multiple">
        <uw-accordion-item>
          <uw-accordion-trigger>Seção 1</uw-accordion-trigger>
          <uw-accordion-content>
            <div class="p-4 text-sm">Conteúdo da seção 1. Várias seções podem estar abertas simultaneamente.</div>
          </uw-accordion-content>
        </uw-accordion-item>
        <uw-accordion-item>
          <uw-accordion-trigger>Seção 2</uw-accordion-trigger>
          <uw-accordion-content>
            <div class="p-4 text-sm">Conteúdo da seção 2.</div>
          </uw-accordion-content>
        </uw-accordion-item>
        <uw-accordion-item>
          <uw-accordion-trigger>Seção 3</uw-accordion-trigger>
          <uw-accordion-content>
            <div class="p-4 text-sm">Conteúdo da seção 3.</div>
          </uw-accordion-content>
        </uw-accordion-item>
      </uw-accordion>
    `,
  }),
};

export const WithIcons: Story = {
  args: {
    mode: 'single',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-accordion mode="single">
        <uw-accordion-item>
          <uw-accordion-trigger>
            <div class="flex items-center gap-2">
              <uw-icon name="person" size="sm" />
              Informações Pessoais
            </div>
          </uw-accordion-trigger>
          <uw-accordion-content>
            <div class="p-4 text-sm">Dados pessoais do usuário.</div>
          </uw-accordion-content>
        </uw-accordion-item>
        <uw-accordion-item>
          <uw-accordion-trigger>
            <div class="flex items-center gap-2">
              <uw-icon name="location_on" size="sm" />
              Endereço
            </div>
          </uw-accordion-trigger>
          <uw-accordion-content>
            <div class="p-4 text-sm">Endereço de residência.</div>
          </uw-accordion-content>
        </uw-accordion-item>
        <uw-accordion-item>
          <uw-accordion-trigger>
            <div class="flex items-center gap-2">
              <uw-icon name="work" size="sm" />
              Profissional
            </div>
          </uw-accordion-trigger>
          <uw-accordion-content>
            <div class="p-4 text-sm">Informações profissionais.</div>
          </uw-accordion-content>
        </uw-accordion-item>
      </uw-accordion>
    `,
  }),
};
