import type { Meta, StoryObj } from '@storybook/angular';
import { UwTableComponent } from './uw-table.component';
import { UwColTplDirective } from './uw-col-tpl.directive';

const meta: Meta<UwTableComponent<any>> = {
  title: 'UW-UI/Data/Table',
  component: UwTableComponent,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'object', description: 'Definição das colunas' },
    data: { control: 'object', description: 'Dados da tabela' },
    lazy: { control: 'boolean', description: 'Modo lazy loading' },
    totalRecords: { control: 'number', description: 'Total de registros (modo lazy)' },
    loading: { control: 'boolean', description: 'Estado de carregamento' },
    selectionMode: { control: 'radio', options: ['none', 'single', 'multiple'], description: 'Modo de seleção' },
    rowSize: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Tamanho das linhas' },
    emptyMessage: { control: 'text', description: 'Mensagem quando não há dados' },
  },
};

export default meta;
type Story = StoryObj<UwTableComponent<any>>;

const mockColumns = [
  { key: 'id', header: 'ID', sortable: true, width: '80px' },
  { key: 'name', header: 'Nome', sortable: true, filterable: true },
  { key: 'email', header: 'Email', sortable: true, filterable: true },
  { key: 'status', header: 'Status', sortable: true },
];

const mockData = [
  { id: 1, name: 'João Silva', email: 'joao@example.com', status: 'Ativo' },
  { id: 2, name: 'Maria Santos', email: 'maria@example.com', status: 'Ativo' },
  { id: 3, name: 'Pedro Oliveira', email: 'pedro@example.com', status: 'Inativo' },
  { id: 4, name: 'Ana Costa', email: 'ana@example.com', status: 'Ativo' },
  { id: 5, name: 'Carlos Souza', email: 'carlos@example.com', status: 'Pendente' },
];

export const Default: Story = {
  args: {
    columns: mockColumns,
    data: mockData,
    rowSize: 'md',
    emptyMessage: 'Nenhum registro encontrado',
  },
};

export const Sortable: Story = {
  args: {
    columns: mockColumns,
    data: mockData,
    rowSize: 'md',
  },
};

export const Filterable: Story = {
  args: {
    columns: mockColumns,
    data: mockData,
    rowSize: 'md',
  },
};

export const Selectable: Story = {
  args: {
    columns: mockColumns,
    data: mockData,
    selectionMode: 'multiple',
    rowSize: 'md',
  },
};

export const SingleSelection: Story = {
  args: {
    columns: mockColumns,
    data: mockData,
    selectionMode: 'single',
    rowSize: 'md',
  },
};

export const Loading: Story = {
  args: {
    columns: mockColumns,
    data: [],
    loading: true,
    rowSize: 'md',
  },
};

export const Empty: Story = {
  args: {
    columns: mockColumns,
    data: [],
    loading: false,
    emptyMessage: 'Nenhum participante encontrado',
    rowSize: 'md',
  },
};

export const SmallRows: Story = {
  args: {
    columns: mockColumns,
    data: mockData,
    rowSize: 'sm',
  },
};

export const LargeRows: Story = {
  args: {
    columns: mockColumns,
    data: mockData,
    rowSize: 'lg',
  },
};

export const WithCustomTemplate: Story = {
  args: {
    columns: mockColumns,
    data: mockData,
    rowSize: 'md',
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [UwColTplDirective],
    },
    template: `
      <uw-table [columns]="columns" [data]="data" [rowSize]="rowSize">
        <ng-template uwColTpl="status" let-item>
          <span [class]="item.status === 'Ativo' ? 'text-green-600' : item.status === 'Inativo' ? 'text-red-600' : 'text-yellow-600'">
            {{ item.status }}
          </span>
        </ng-template>
      </uw-table>
    `,
  }),
};

export const LazyLoading: Story = {
  args: {
    columns: mockColumns,
    data: mockData,
    lazy: true,
    totalRecords: 100,
    rowSize: 'md',
  },
};
