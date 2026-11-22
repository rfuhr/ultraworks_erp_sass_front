import type { Meta, StoryObj } from '@storybook/angular';
import { UwModalComponent } from './uw-modal.component';

const meta: Meta<UwModalComponent> = {
  title: 'UW-UI/Utility/Modal',
  component: UwModalComponent,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Estado do modal (aberto/fechado)' },
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'fullscreen'], description: 'Tamanho do modal' },
    closeOnOverlay: { control: 'boolean', description: 'Fechar ao clicar no overlay' },
    closeOnEscape: { control: 'boolean', description: 'Fechar ao pressionar Escape' },
    showCloseButton: { control: 'boolean', description: 'Mostrar botão de fechar' },
    title: { control: 'text', description: 'Título do modal' },
  },
};

export default meta;
type Story = StoryObj<UwModalComponent>;

export const Default: Story = {
  args: {
    open: true,
    size: 'md',
    closeOnOverlay: true,
    closeOnEscape: true,
    showCloseButton: true,
    title: 'Modal Padrão',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-modal [open]="open" [size]="size" [closeOnOverlay]="closeOnOverlay" [closeOnEscape]="closeOnEscape" [showCloseButton]="showCloseButton" [title]="title">
        <div class="p-4">
          <p class="text-sm text-gray-600">Conteúdo do modal vai aqui.</p>
        </div>
        <ng-template #footer>
          <div class="flex gap-2 justify-end p-4 border-t">
            <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">Cancelar</button>
            <button class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark">Confirmar</button>
          </div>
        </ng-template>
      </uw-modal>
    `,
  }),
};

export const Small: Story = {
  args: {
    open: true,
    size: 'sm',
    closeOnOverlay: true,
    closeOnEscape: true,
    showCloseButton: true,
    title: 'Modal Pequeno',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-modal [open]="open" [size]="size" [closeOnOverlay]="closeOnOverlay" [closeOnEscape]="closeOnEscape" [showCloseButton]="showCloseButton" [title]="title">
        <div class="p-4">
          <p class="text-sm text-gray-600">Este é um modal pequeno.</p>
        </div>
        <ng-template #footer>
          <div class="flex gap-2 justify-end p-4 border-t">
            <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">Cancelar</button>
            <button class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark">OK</button>
          </div>
        </ng-template>
      </uw-modal>
    `,
  }),
};

export const Large: Story = {
  args: {
    open: true,
    size: 'lg',
    closeOnOverlay: true,
    closeOnEscape: true,
    showCloseButton: true,
    title: 'Modal Grande',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-modal [open]="open" [size]="size" [closeOnOverlay]="closeOnOverlay" [closeOnEscape]="closeOnEscape" [showCloseButton]="showCloseButton" [title]="title">
        <div class="p-4">
          <p class="text-sm text-gray-600 mb-4">Este é um modal grande com mais espaço para conteúdo.</p>
          <div class="space-y-2">
            <input type="text" placeholder="Campo 1" class="w-full px-3 py-2 border rounded text-sm" />
            <input type="text" placeholder="Campo 2" class="w-full px-3 py-2 border rounded text-sm" />
            <input type="text" placeholder="Campo 3" class="w-full px-3 py-2 border rounded text-sm" />
          </div>
        </div>
        <ng-template #footer>
          <div class="flex gap-2 justify-end p-4 border-t">
            <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">Cancelar</button>
            <button class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark">Salvar</button>
          </div>
        </ng-template>
      </uw-modal>
    `,
  }),
};

export const ExtraLarge: Story = {
  args: {
    open: true,
    size: 'lg',
    closeOnOverlay: true,
    closeOnEscape: true,
    showCloseButton: true,
    title: 'Modal Grande',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-modal [open]="open" [size]="size" [closeOnOverlay]="closeOnOverlay" [closeOnEscape]="closeOnEscape" [showCloseButton]="showCloseButton" [title]="title">
        <div class="p-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h3 class="font-semibold mb-2">Coluna 1</h3>
              <p class="text-sm text-gray-600">Conteúdo da primeira coluna.</p>
            </div>
            <div>
              <h3 class="font-semibold mb-2">Coluna 2</h3>
              <p class="text-sm text-gray-600">Conteúdo da segunda coluna.</p>
            </div>
          </div>
        </div>
        <ng-template #footer>
          <div class="flex gap-2 justify-end p-4 border-t">
            <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">Cancelar</button>
            <button class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark">Confirmar</button>
          </div>
        </ng-template>
      </uw-modal>
    `,
  }),
};

export const FullScreen: Story = {
  args: {
    open: true,
    size: 'fullscreen',
    closeOnOverlay: false,
    closeOnEscape: true,
    showCloseButton: true,
    title: 'Modal Tela Cheia',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-modal [open]="open" [size]="size" [closeOnOverlay]="closeOnOverlay" [closeOnEscape]="closeOnEscape" [showCloseButton]="showCloseButton" [title]="title">
        <div class="p-4 h-full">
          <p class="text-sm text-gray-600">Este modal ocupa a tela inteira.</p>
        </div>
        <ng-template #footer>
          <div class="flex gap-2 justify-end p-4 border-t">
            <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">Fechar</button>
          </div>
        </ng-template>
      </uw-modal>
    `,
  }),
};

export const NoCloseButton: Story = {
  args: {
    open: true,
    size: 'md',
    closeOnOverlay: false,
    closeOnEscape: false,
    showCloseButton: false,
    title: 'Modal Sem Botão de Fechar',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-modal [open]="open" [size]="size" [closeOnOverlay]="closeOnOverlay" [closeOnEscape]="closeOnEscape" [showCloseButton]="showCloseButton" [title]="title">
        <div class="p-4">
          <p class="text-sm text-gray-600 mb-4">Este modal não tem botão de fechar. Use os botões abaixo.</p>
        </div>
        <ng-template #footer>
          <div class="flex gap-2 justify-end p-4 border-t">
            <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">Cancelar</button>
            <button class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark">Confirmar</button>
          </div>
        </ng-template>
      </uw-modal>
    `,
  }),
};

export const WithForm: Story = {
  args: {
    open: true,
    size: 'md',
    closeOnOverlay: true,
    closeOnEscape: true,
    showCloseButton: true,
    title: 'Formulário',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-modal [open]="open" [size]="size" [closeOnOverlay]="closeOnOverlay" [closeOnEscape]="closeOnEscape" [showCloseButton]="showCloseButton" [title]="title">
        <div class="p-4">
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Nome</label>
              <input type="text" class="w-full px-3 py-2 border rounded text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input type="email" class="w-full px-3 py-2 border rounded text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Mensagem</label>
              <textarea rows="3" class="w-full px-3 py-2 border rounded text-sm"></textarea>
            </div>
          </form>
        </div>
        <ng-template #footer>
          <div class="flex gap-2 justify-end p-4 border-t">
            <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">Cancelar</button>
            <button class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark">Enviar</button>
          </div>
        </ng-template>
      </uw-modal>
    `,
  }),
};
