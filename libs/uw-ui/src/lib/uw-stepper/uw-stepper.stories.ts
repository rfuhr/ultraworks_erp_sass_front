import type { Meta, StoryObj } from '@storybook/angular';
import { UwStepperComponent } from './uw-stepper.component';
import { UwStepperStepDirective } from './uw-stepper-step.directive';

const meta: Meta<UwStepperComponent> = {
  title: 'UW-UI/Navigation/Stepper',
  component: UwStepperComponent,
  tags: ['autodocs'],
  argTypes: {
    steps: { control: 'object', description: 'Configuração dos steps' },
    completedSteps: { control: 'object', description: 'Set de steps completados' },
    navigationMode: { control: 'radio', options: ['click-and-buttons', 'dots-and-buttons', 'buttons-only'], description: 'Modo de navegação' },
    showCompletedIcon: { control: 'boolean', description: 'Mostrar ícone de completado' },
    lastStepLabel: { control: 'text', description: 'Label do último step' },
  },
};

export default meta;
type Story = StoryObj<UwStepperComponent>;

const mockSteps = [
  { id: 'personal', label: 'Dados Pessoais' },
  { id: 'address', label: 'Endereço' },
  { id: 'payment', label: 'Pagamento' },
  { id: 'confirm', label: 'Confirmação' },
];

export const Default: Story = {
  args: {
    steps: mockSteps,
    completedSteps: new Set(),
    navigationMode: 'click-and-buttons',
    showCompletedIcon: true,
    lastStepLabel: 'Concluir',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [UwStepperStepDirective],
    },
    template: `
      <uw-stepper [steps]="steps" [completedSteps]="completedSteps" [navigationMode]="navigationMode" [showCompletedIcon]="showCompletedIcon" [lastStepLabel]="lastStepLabel">
        <ng-template uwStepperStep="personal">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">Dados Pessoais</h3>
            <p class="text-sm text-gray-600">Conteúdo do step de dados pessoais.</p>
          </div>
        </ng-template>
        <ng-template uwStepperStep="address">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">Endereço</h3>
            <p class="text-sm text-gray-600">Conteúdo do step de endereço.</p>
          </div>
        </ng-template>
        <ng-template uwStepperStep="payment">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">Pagamento</h3>
            <p class="text-sm text-gray-600">Conteúdo do step de pagamento.</p>
          </div>
        </ng-template>
        <ng-template uwStepperStep="confirm">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">Confirmação</h3>
            <p class="text-sm text-gray-600">Conteúdo do step de confirmação.</p>
          </div>
        </ng-template>
      </uw-stepper>
    `,
  }),
};

export const WithCompletedSteps: Story = {
  args: {
    steps: mockSteps,
    completedSteps: new Set(['personal', 'address']),
    navigationMode: 'click-and-buttons',
    showCompletedIcon: true,
    lastStepLabel: 'Concluir',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [UwStepperStepDirective],
    },
    template: `
      <uw-stepper [steps]="steps" [completedSteps]="completedSteps" [navigationMode]="navigationMode" [showCompletedIcon]="showCompletedIcon" [lastStepLabel]="lastStepLabel">
        <ng-template uwStepperStep="personal">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">Dados Pessoais</h3>
            <p class="text-sm text-gray-600">Step completado.</p>
          </div>
        </ng-template>
        <ng-template uwStepperStep="address">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">Endereço</h3>
            <p class="text-sm text-gray-600">Step completado.</p>
          </div>
        </ng-template>
        <ng-template uwStepperStep="payment">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">Pagamento</h3>
            <p class="text-sm text-gray-600">Step atual.</p>
          </div>
        </ng-template>
        <ng-template uwStepperStep="confirm">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">Confirmação</h3>
            <p class="text-sm text-gray-600">Step pendente.</p>
          </div>
        </ng-template>
      </uw-stepper>
    `,
  }),
};

export const DotsAndButtons: Story = {
  args: {
    steps: mockSteps,
    completedSteps: new Set(),
    navigationMode: 'dots-and-buttons',
    showCompletedIcon: true,
    lastStepLabel: 'Concluir',
  },
};

export const ButtonsOnly: Story = {
  args: {
    steps: mockSteps,
    completedSteps: new Set(),
    navigationMode: 'buttons-only',
    showCompletedIcon: true,
    lastStepLabel: 'Concluir',
  },
};

export const ThreeSteps: Story = {
  args: {
    steps: [
      { id: 'step1', label: 'Step 1' },
      { id: 'step2', label: 'Step 2' },
      { id: 'step3', label: 'Step 3' },
    ],
    completedSteps: new Set(),
    navigationMode: 'click-and-buttons',
    showCompletedIcon: true,
    lastStepLabel: 'Finalizar',
  },
};
