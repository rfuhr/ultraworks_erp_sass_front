import type { Meta, StoryObj } from '@storybook/angular';
import { UwConfirmationDialogComponent } from './confirmation-dialog.component';

const meta: Meta<UwConfirmationDialogComponent> = {
  title: 'UW-UI/Feedback/Confirmation',
  component: UwConfirmationDialogComponent,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Dados do diálogo de confirmação',
    },
  },
};

export default meta;
type Story = StoryObj<UwConfirmationDialogComponent>;

export const Danger: Story = {
  args: {
    data: {
      type: 'danger',
      title: 'Excluir registro',
      message: 'Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.',
      confirmLabel: 'Excluir',
      cancelLabel: 'Cancelar',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4 border rounded-lg">
        <div class="flex items-start gap-3">
          <div class="text-red-500">
            <uw-icon name="warning" size="lg" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-lg mb-2">{{ data.title }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ data.message }}</p>
            <div class="flex gap-2 justify-end">
              <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">{{ data.cancelLabel }}</button>
              <button class="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600">{{ data.confirmLabel }}</button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Warning: Story = {
  args: {
    data: {
      type: 'warning',
      title: 'Atenção',
      message: 'Esta ação pode afetar outros registros. Deseja continuar?',
      confirmLabel: 'Continuar',
      cancelLabel: 'Voltar',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4 border rounded-lg">
        <div class="flex items-start gap-3">
          <div class="text-yellow-500">
            <uw-icon name="warning_amber" size="lg" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-lg mb-2">{{ data.title }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ data.message }}</p>
            <div class="flex gap-2 justify-end">
              <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">{{ data.cancelLabel }}</button>
              <button class="px-4 py-2 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">{{ data.confirmLabel }}</button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Success: Story = {
  args: {
    data: {
      type: 'success',
      title: 'Operação concluída',
      message: 'A operação foi realizada com sucesso. Deseja continuar?',
      confirmLabel: 'Continuar',
      cancelLabel: 'Fechar',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4 border rounded-lg">
        <div class="flex items-start gap-3">
          <div class="text-green-500">
            <uw-icon name="check_circle" size="lg" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-lg mb-2">{{ data.title }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ data.message }}</p>
            <div class="flex gap-2 justify-end">
              <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">{{ data.cancelLabel }}</button>
              <button class="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600">{{ data.confirmLabel }}</button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const PromptRejeicao: Story = {
  args: {
    data: {
      type: 'danger',
      title: 'Confirmar Rejeição',
      message: 'Informe o motivo da rejeição do documento.',
      confirmLabel: 'Rejeitar',
      cancelLabel: 'Cancelar',
      input: {
        label: 'Motivo da rejeição',
        placeholder: 'Descreva o motivo da rejeição',
        required: true,
        maxLength: 500,
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4 border rounded-lg">
        <div class="flex items-start gap-3">
          <div class="text-red-500">
            <uw-icon name="warning" size="lg" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-lg mb-2">{{ data.title }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ data.message }}</p>
            <label class="block text-xs font-bold uppercase text-gray-500 mb-1">
              {{ data.input.label }} *
            </label>
            <textarea
              class="w-full min-h-18 p-3 text-sm border rounded"
              [placeholder]="data.input.placeholder"
              [attr.maxlength]="data.input.maxLength"
            ></textarea>
            <div class="flex gap-2 justify-end mt-4">
              <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">{{ data.cancelLabel }}</button>
              <button class="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600">{{ data.confirmLabel }}</button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Info: Story = {
  args: {
    data: {
      type: 'info',
      title: 'Informação importante',
      message: 'Esta é uma mensagem informativa. Deseja prosseguir?',
      confirmLabel: 'Entendi',
      cancelLabel: 'Cancelar',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-4 border rounded-lg">
        <div class="flex items-start gap-3">
          <div class="text-blue-500">
            <uw-icon name="info" size="lg" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-lg mb-2">{{ data.title }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ data.message }}</p>
            <div class="flex gap-2 justify-end">
              <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">{{ data.cancelLabel }}</button>
              <button class="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">{{ data.confirmLabel }}</button>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
