import type { Meta, StoryObj } from '@storybook/angular';
import { FormFieldComponent } from './uw-form-field';

const meta: Meta<FormFieldComponent> = {
  title: 'UW-UI/Form/FormField',
  component: FormFieldComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label do campo' },
    required: { control: 'boolean', description: 'Campo obrigatório' },
    hint: { control: 'text', description: 'Texto de ajuda' },
  },
};

export default meta;
type Story = StoryObj<FormFieldComponent>;

export const Default: Story = {
  args: {
    label: 'Nome',
    required: false,
    hint: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-form-field [label]="label" [required]="required" [hint]="hint">
        <input type="text" class="w-full px-3 py-2 border rounded text-sm" placeholder="Digite seu nome" />
      </uw-form-field>
    `,
  }),
};

export const Required: Story = {
  args: {
    label: 'Email',
    required: true,
    hint: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-form-field [label]="label" [required]="required" [hint]="hint">
        <input type="email" class="w-full px-3 py-2 border rounded text-sm" placeholder="seu@email.com" />
      </uw-form-field>
    `,
  }),
};

export const WithHint: Story = {
  args: {
    label: 'Senha',
    required: true,
    hint: 'Mínimo 8 caracteres, incluindo números e letras',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-form-field [label]="label" [required]="required" [hint]="hint">
        <input type="password" class="w-full px-3 py-2 border rounded text-sm" placeholder="Digite sua senha" />
      </uw-form-field>
    `,
  }),
};

export const WithSelect: Story = {
  args: {
    label: 'País',
    required: false,
    hint: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-form-field [label]="label" [required]="required" [hint]="hint">
        <select class="w-full px-3 py-2 border rounded text-sm">
          <option>Selecione um país</option>
          <option>Brasil</option>
          <option>Estados Unidos</option>
          <option>Portugal</option>
        </select>
      </uw-form-field>
    `,
  }),
};

export const WithTextarea: Story = {
  args: {
    label: 'Descrição',
    required: false,
    hint: 'Máximo 500 caracteres',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-form-field [label]="label" [required]="required" [hint]="hint">
        <textarea rows="3" class="w-full px-3 py-2 border rounded text-sm" placeholder="Digite uma descrição"></textarea>
      </uw-form-field>
    `,
  }),
};

export const WithCheckbox: Story = {
  args: {
    label: 'Aceito os termos',
    required: true,
    hint: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-form-field [label]="label" [required]="required" [hint]="hint">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" />
          <span>Li e aceito os termos de uso</span>
        </label>
      </uw-form-field>
    `,
  }),
};

export const FormExample: Story = {
  args: {
    label: 'Campo',
    required: false,
    hint: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <form class="space-y-4 max-w-md">
        <uw-form-field label="Nome" [required]="true">
          <input type="text" class="w-full px-3 py-2 border rounded text-sm" placeholder="Digite seu nome" />
        </uw-form-field>
        <uw-form-field label="Email" [required]="true" hint="Usaremos este email para contato">
          <input type="email" class="w-full px-3 py-2 border rounded text-sm" placeholder="seu@email.com" />
        </uw-form-field>
        <uw-form-field label="Telefone" [required]="false">
          <input type="tel" class="w-full px-3 py-2 border rounded text-sm" placeholder="(11) 99999-9999" />
        </uw-form-field>
        <uw-form-field label="Mensagem" [required]="false" hint="Máximo 500 caracteres">
          <textarea rows="3" class="w-full px-3 py-2 border rounded text-sm" placeholder="Digite sua mensagem"></textarea>
        </uw-form-field>
        <div class="flex gap-2 justify-end">
          <button type="button" class="px-4 py-2 text-sm border rounded hover:bg-gray-50">Cancelar</button>
          <button type="submit" class="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark">Enviar</button>
        </div>
      </form>
    `,
  }),
};
