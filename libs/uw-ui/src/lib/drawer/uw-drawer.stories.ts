import type { Meta, StoryObj } from '@storybook/angular';
import { UwDrawerComponent } from './uw-drawer.component';

const meta: Meta<UwDrawerComponent> = {
  title: 'UW-UI/Utility/Drawer',
  component: UwDrawerComponent,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Estado do drawer (aberto/fechado)' },
    position: { control: 'radio', options: ['right', 'left'], description: 'Posição do drawer' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Tamanho do drawer' },
    title: { control: 'text', description: 'Título do drawer' },
    showOverlay: { control: 'boolean', description: 'Mostrar overlay' },
  },
};

export default meta;
type Story = StoryObj<UwDrawerComponent>;

export const Default: Story = {
  args: {
    open: true,
    position: 'right',
    size: 'md',
    title: 'Drawer Padrão',
    showOverlay: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-drawer [open]="open" [position]="position" [size]="size" [title]="title" [showOverlay]="showOverlay">
        <div class="p-4">
          <p class="text-sm text-gray-600">Conteúdo do drawer vai aqui.</p>
        </div>
        <ng-template #footer>
          <div class="flex gap-2 justify-end p-4 border-t">
            <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">Cancelar</button>
            <button class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark">Confirmar</button>
          </div>
        </ng-template>
      </uw-drawer>
    `,
  }),
};

export const LeftPosition: Story = {
  args: {
    open: true,
    position: 'left',
    size: 'md',
    title: 'Menu Lateral',
    showOverlay: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-drawer [open]="open" [position]="position" [size]="size" [title]="title" [showOverlay]="showOverlay">
        <div class="p-4">
          <nav class="space-y-2">
            <a href="#" class="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Dashboard</a>
            <a href="#" class="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Perfil</a>
            <a href="#" class="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Configurações</a>
            <a href="#" class="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Sair</a>
          </nav>
        </div>
      </uw-drawer>
    `,
  }),
};

export const Small: Story = {
  args: {
    open: true,
    position: 'right',
    size: 'sm',
    title: 'Drawer Pequeno',
    showOverlay: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-drawer [open]="open" [position]="position" [size]="size" [title]="title" [showOverlay]="showOverlay">
        <div class="p-4">
          <p class="text-sm text-gray-600">Este é um drawer pequeno.</p>
        </div>
      </uw-drawer>
    `,
  }),
};

export const Large: Story = {
  args: {
    open: true,
    position: 'right',
    size: 'lg',
    title: 'Drawer Grande',
    showOverlay: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-drawer [open]="open" [position]="position" [size]="size" [title]="title" [showOverlay]="showOverlay">
        <div class="p-4">
          <p class="text-sm text-gray-600 mb-4">Este é um drawer grande com mais espaço para conteúdo.</p>
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
      </uw-drawer>
    `,
  }),
};

export const NoOverlay: Story = {
  args: {
    open: true,
    position: 'right',
    size: 'md',
    title: 'Drawer Sem Overlay',
    showOverlay: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-drawer [open]="open" [position]="position" [size]="size" [title]="title" [showOverlay]="showOverlay">
        <div class="p-4">
          <p class="text-sm text-gray-600">Este drawer não tem overlay.</p>
        </div>
      </uw-drawer>
    `,
  }),
};

export const WithForm: Story = {
  args: {
    open: true,
    position: 'right',
    size: 'md',
    title: 'Filtros',
    showOverlay: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-drawer [open]="open" [position]="position" [size]="size" [title]="title" [showOverlay]="showOverlay">
        <div class="p-4">
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Nome</label>
              <input type="text" class="w-full px-3 py-2 border rounded text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Status</label>
              <select class="w-full px-3 py-2 border rounded text-sm">
                <option>Todos</option>
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Data</label>
              <input type="date" class="w-full px-3 py-2 border rounded text-sm" />
            </div>
          </form>
        </div>
        <ng-template #footer>
          <div class="flex gap-2 justify-end p-4 border-t">
            <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">Limpar</button>
            <button class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark">Aplicar</button>
          </div>
        </ng-template>
      </uw-drawer>
    `,
  }),
};

export const CustomHeader: Story = {
  args: {
    open: true,
    position: 'right',
    size: 'lg',
    title: 'TRB-0091',
    showOverlay: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-drawer [open]="open" [position]="position" [size]="size" [title]="title" [showOverlay]="showOverlay">
        <ng-template #header>
          <div class="flex flex-col gap-2 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-[11px] text-gray-500">TRB-0091</span>
              <span class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 font-mono text-[11px] font-semibold text-amber-700">
                <span class="material-symbols-outlined text-[14px]">schedule</span>
                Pendente
              </span>
            </div>
            <h3 class="m-0 text-base font-bold leading-snug text-gray-900">
              O Papel da Análise de Sentimentos em Prontuários para o Acompanhamento de Pacientes Crônicos
            </h3>
          </div>
        </ng-template>

        <div class="p-4">
          <p class="text-sm text-gray-600">O cabeçalho customizado substitui título e subtítulo padrão, mantendo o botão de fechar.</p>
        </div>
      </uw-drawer>
    `,
  }),
};

export const WithDetails: Story = {
  args: {
    open: true,
    position: 'right',
    size: 'md',
    title: 'Detalhes do Usuário',
    showOverlay: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-drawer [open]="open" [position]="position" [size]="size" [title]="title" [showOverlay]="showOverlay">
        <div class="p-4 space-y-4">
          <div class="flex items-center gap-3">
            <uw-avatar initials="JS" size="lg" />
            <div>
              <h3 class="font-semibold">João Silva</h3>
              <p class="text-sm text-gray-600">joao@example.com</p>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Telefone:</span>
              <span>(11) 99999-9999</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Status:</span>
              <uw-tag label="Ativo" variant="success" />
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Cadastro:</span>
              <span>01/01/2024</span>
            </div>
          </div>
        </div>
        <ng-template #footer>
          <div class="flex gap-2 justify-end p-4 border-t">
            <button class="px-4 py-2 text-sm border rounded hover:bg-gray-50">Fechar</button>
            <button class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark">Editar</button>
          </div>
        </ng-template>
      </uw-drawer>
    `,
  }),
};
