import type { Meta, StoryObj } from '@storybook/angular';
import { UwToastComponent } from './uw-toast.component';
import { ToastService } from './toast.service';

const meta: Meta<UwToastComponent> = {
  title: 'UW-UI/Feedback/Toast',
  component: UwToastComponent,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<UwToastComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    moduleMetadata: {
      providers: [ToastService],
    },
    template: `
      <div class="p-4">
        <p class="mb-4 text-sm text-gray-600">Toasts são gerenciados pelo ToastService. Use os métodos do serviço para exibir toasts.</p>
        <uw-toast />
      </div>
    `,
  }),
};

export const WithService: Story = {
  args: {},
  render: (args) => ({
    props: {
      ...args,
      showSuccess: () => {
        const service = new ToastService();
        service.show('Operação realizada com sucesso!', 'success');
      },
      showError: () => {
        const service = new ToastService();
        service.show('Erro ao processar a requisição.', 'error');
      },
      showWarning: () => {
        const service = new ToastService();
        service.show('Atenção: verifique os dados informados.', 'warning');
      },
      showInfo: () => {
        const service = new ToastService();
        service.show('Informação importante para o usuário.', 'info');
      },
    },
    moduleMetadata: {
      providers: [ToastService],
    },
    template: `
      <div class="p-4 space-y-2">
        <uw-toast />
        <button (click)="showSuccess()" class="px-4 py-2 bg-green-500 text-white rounded">Success Toast</button>
        <button (click)="showError()" class="px-4 py-2 bg-red-500 text-white rounded ml-2">Error Toast</button>
        <button (click)="showWarning()" class="px-4 py-2 bg-yellow-500 text-white rounded ml-2">Warning Toast</button>
        <button (click)="showInfo()" class="px-4 py-2 bg-blue-500 text-white rounded ml-2">Info Toast</button>
      </div>
    `,
  }),
};
