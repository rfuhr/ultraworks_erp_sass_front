import type { Meta, StoryObj } from '@storybook/angular';
import { UwTextareaComponent } from './uw-textarea.component';

const meta: Meta<UwTextareaComponent> = {
  title: 'UW-UI/Form/Textarea',
  component: UwTextareaComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto do label',
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
    },
    rows: {
      control: 'number',
      description: 'Número de linhas',
    },
    maxlength: {
      control: 'number',
      description: 'Comprimento máximo',
    },
    autoResize: {
      control: 'boolean',
      description: 'Redimensionamento automático',
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem de erro',
    },
    required: {
      control: 'boolean',
      description: 'Campo obrigatório',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilitado',
    },
    readonly: {
      control: 'boolean',
      description: 'Somente leitura',
    },
  },
};

export default meta;
type Story = StoryObj<UwTextareaComponent>;

export const Default: Story = {
  args: {
    label: 'Descrição',
    placeholder: 'Digite uma descrição...',
  },
};

export const WithRows: Story = {
  args: {
    label: 'Comentário',
    placeholder: 'Digite seu comentário...',
    rows: 5,
  },
};

export const WithMaxLength: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Fale sobre você...',
    maxlength: 200,
  },
};

export const AutoResize: Story = {
  args: {
    label: 'Mensagem',
    placeholder: 'Digite uma mensagem longa...',
    autoResize: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Descrição',
    placeholder: 'Digite...',
    errorMessage: 'Campo obrigatório',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Observações',
    placeholder: 'Desabilitado',
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    label: 'Notas',
    readonly: true,
  },
};
