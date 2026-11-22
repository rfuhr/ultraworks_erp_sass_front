import type { Meta, StoryObj } from '@storybook/angular';
import { UwPopoverComponent } from './uw-popover.component';

const meta: Meta<UwPopoverComponent> = {
  title: 'UW-UI/Utility/Popover',
  component: UwPopoverComponent,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'radio',
      options: ['bottom-end', 'bottom-start', 'top-end', 'top-start'],
      description: 'Posição do popover',
    },
  },
};

export default meta;
type Story = StoryObj<UwPopoverComponent>;

export const BottomEnd: Story = {
  args: {
    position: 'bottom-end',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8">
        <button #trigger class="px-4 py-2 bg-primary text-white rounded">
          Abrir Popover
        </button>
        <uw-popover #popover [position]="position">
          <div class="p-4 bg-white border rounded-lg shadow-lg w-64">
            <h3 class="font-semibold mb-2">Título do Popover</h3>
            <p class="text-sm text-gray-600">Conteúdo do popover vai aqui.</p>
          </div>
        </uw-popover>
      </div>
    `,
  }),
};

export const BottomStart: Story = {
  args: {
    position: 'bottom-start',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8">
        <button #trigger class="px-4 py-2 bg-primary text-white rounded">
          Abrir Popover
        </button>
        <uw-popover #popover [position]="position">
          <div class="p-4 bg-white border rounded-lg shadow-lg w-64">
            <h3 class="font-semibold mb-2">Menu</h3>
            <ul class="space-y-2">
              <li class="text-sm hover:bg-gray-100 p-2 rounded cursor-pointer">Opção 1</li>
              <li class="text-sm hover:bg-gray-100 p-2 rounded cursor-pointer">Opção 2</li>
              <li class="text-sm hover:bg-gray-100 p-2 rounded cursor-pointer">Opção 3</li>
            </ul>
          </div>
        </uw-popover>
      </div>
    `,
  }),
};

export const TopEnd: Story = {
  args: {
    position: 'top-end',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 mt-32">
        <button #trigger class="px-4 py-2 bg-primary text-white rounded">
          Abrir Popover (Top)
        </button>
        <uw-popover #popover [position]="position">
          <div class="p-4 bg-white border rounded-lg shadow-lg w-64">
            <h3 class="font-semibold mb-2">Notificações</h3>
            <div class="space-y-2">
              <div class="text-sm p-2 border-b">Nova mensagem recebida</div>
              <div class="text-sm p-2 border-b">Atualização disponível</div>
              <div class="text-sm p-2">Tarefa concluída</div>
            </div>
          </div>
        </uw-popover>
      </div>
    `,
  }),
};

export const TopStart: Story = {
  args: {
    position: 'top-start',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8 mt-32">
        <button #trigger class="px-4 py-2 bg-primary text-white rounded">
          Abrir Popover (Top Start)
        </button>
        <uw-popover #popover [position]="position">
          <div class="p-4 bg-white border rounded-lg shadow-lg w-64">
            <h3 class="font-semibold mb-2">Filtros</h3>
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" /> Opção 1
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" /> Opção 2
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input type="checkbox" /> Opção 3
              </label>
            </div>
          </div>
        </uw-popover>
      </div>
    `,
  }),
};

export const WithForm: Story = {
  args: {
    position: 'bottom-start',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-8">
        <button #trigger class="px-4 py-2 bg-primary text-white rounded">
          Login Rápido
        </button>
        <uw-popover #popover [position]="position">
          <div class="p-4 bg-white border rounded-lg shadow-lg w-80">
            <h3 class="font-semibold mb-3">Login</h3>
            <div class="space-y-3">
              <input type="email" placeholder="Email" class="w-full px-3 py-2 border rounded text-sm" />
              <input type="password" placeholder="Senha" class="w-full px-3 py-2 border rounded text-sm" />
              <button class="w-full px-4 py-2 bg-primary text-white rounded text-sm">Entrar</button>
            </div>
          </div>
        </uw-popover>
      </div>
    `,
  }),
};
