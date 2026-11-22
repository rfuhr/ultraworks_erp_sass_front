import type { Meta, StoryObj } from '@storybook/angular';
import { UwSelectComponent } from './uw-select.component';

const meta: Meta<UwSelectComponent> = {
  title: 'uw-ui/Select',
  component: UwSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    registros: { control: 'object', description: 'Lista de registros carregados via API' },
    totalRegistros: { control: 'number', description: 'Total de registros para paginação' },
    loading: { control: 'boolean', description: 'Indicador de carregamento' },
    placeholder: { control: 'text', description: 'Texto exibido quando nenhuma opção está selecionada' },
    optionLabel: { control: 'text', description: 'Campo usado como label das opções' },
    optionValue: { control: 'text', description: 'Campo usado como valor das opções' },
    clearable: { control: 'boolean', description: 'Exibe botão de limpar (X)' },
    disabled: { control: 'boolean', description: 'Desabilita o seletor' },
    pageSize: { control: 'number', description: 'Tamanho da página para lazy loading' },
    lazyLoad: { action: 'lazyLoad', description: 'Evento emitido ao buscar dados' },
    changeObject: { action: 'changeObject', description: 'Evento emitido ao selecionar ou limpar' },
  },
};

export default meta;
type Story = StoryObj<UwSelectComponent>;

const defaultRegistros = [
  { id: 1, nome: 'João Silva', email: 'joao@test.com' },
  { id: 2, nome: 'Maria Santos', email: 'maria@test.com' },
  { id: 3, nome: 'José Oliveira', email: 'jose@test.com' },
  { id: 4, nome: 'Ana Costa', email: 'ana@test.com' },
  { id: 5, nome: 'Pedro Alves', email: 'pedro@test.com' },
];

const filterFields = [
  { field: 'nome', fieldFilter: 'nome', labelFilter: 'Nome', matchMode: 'contains' as const, tipoField: 'text' as const },
  { field: 'email', fieldFilter: 'email', labelFilter: 'Email', matchMode: 'contains' as const, tipoField: 'text' as const },
];

export const Default: Story = {
  args: {
    registros: defaultRegistros,
    totalRegistros: 5,
    placeholder: 'Selecione um participante...',
  },
};

export const ComValor: Story = {
  args: {
    registros: defaultRegistros,
    totalRegistros: 5,
  },
};

export const Clearable: Story = {
  args: {
    registros: defaultRegistros,
    totalRegistros: 5,
    clearable: true,
  },
};

export const Disabled: Story = {
  args: {
    registros: defaultRegistros,
    totalRegistros: 5,
    disabled: true,
  },
};

export const ComBuscaMultiCampo: Story = {
  args: {
    registros: defaultRegistros,
    totalRegistros: 5,
    filtersSearch: filterFields,
    fieldSearchDefault: 'nome',
  },
};

export const Loading: Story = {
  args: {
    registros: [],
    totalRegistros: 0,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    registros: [],
    totalRegistros: 0,
    loading: false,
  },
};
