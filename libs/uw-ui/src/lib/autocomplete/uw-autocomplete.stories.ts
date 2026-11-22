import type { Meta, StoryObj } from '@storybook/angular';
import { UwAutocompleteComponent } from './uw-autocomplete.component';

const meta: Meta<UwAutocompleteComponent> = {
  title: 'UW-UI/Form/Autocomplete',
  component: UwAutocompleteComponent,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object', description: 'Array de opções' },
    placeholder: { control: 'text', description: 'Texto placeholder' },
    disabled: { control: 'boolean', description: 'Desabilitado' },
    debounceMs: { control: 'number', description: 'Debounce para busca remota' },
  },
};

export default meta;
type Story = StoryObj<UwAutocompleteComponent>;

const mockOptions = [
  { label: 'Angular', value: 'angular' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt.js', value: 'nuxtjs' },
];

export const Default: Story = {
  args: {
    options: mockOptions,
    placeholder: 'Buscar tecnologia...',
    disabled: false,
    debounceMs: 300,
  },
};

export const WithPlaceholder: Story = {
  args: {
    options: mockOptions,
    placeholder: 'Digite para buscar...',
    disabled: false,
    debounceMs: 300,
  },
};

export const Disabled: Story = {
  args: {
    options: mockOptions,
    placeholder: 'Buscar...',
    disabled: true,
    debounceMs: 300,
  },
};

export const ManyOptions: Story = {
  args: {
    options: [
      ...mockOptions,
      { label: 'Node.js', value: 'nodejs' },
      { label: 'Express', value: 'express' },
      { label: 'NestJS', value: 'nestjs' },
      { label: 'Fastify', value: 'fastify' },
      { label: 'Koa', value: 'koa' },
      { label: 'Django', value: 'django' },
      { label: 'Flask', value: 'flask' },
      { label: 'Rails', value: 'rails' },
      { label: 'Laravel', value: 'laravel' },
      { label: 'Spring', value: 'spring' },
    ],
    placeholder: 'Buscar framework...',
    disabled: false,
    debounceMs: 300,
  },
};

export const FewOptions: Story = {
  args: {
    options: [
      { label: 'Opção 1', value: '1' },
      { label: 'Opção 2', value: '2' },
      { label: 'Opção 3', value: '3' },
    ],
    placeholder: 'Selecione...',
    disabled: false,
    debounceMs: 300,
  },
};
