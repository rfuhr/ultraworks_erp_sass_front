import type { Meta, StoryObj } from '@storybook/angular';
import { CustomInputComponent } from './uw-input.component';

const meta: Meta<CustomInputComponent> = {
  title: 'UW-UI/Form/Input',
  component: CustomInputComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'tel', 'number', 'password', 'cpf', 'cnpj', 'valor', 'cep', 'data', 'dataHora', 'decimal', 'telefone', 'celular', 'cartaoValidade', 'hora'],
      description: 'Tipo do input',
    },
    placeholder: {
      control: 'text',
      description: 'Texto placeholder',
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro',
    },
    icon: {
      control: 'text',
      description: 'Nome do ícone Material Symbols',
    },
    hint: {
      control: 'text',
      description: 'Texto de ajuda',
    },
    numeric: {
      control: 'boolean',
      description: 'Apenas números',
    },
    decimal: {
      control: 'boolean',
      description: 'Permite decimais (com numeric)',
    },
    allowNegative: {
      control: 'boolean',
      description: 'Permite negativos (com numeric)',
    },
    maxlength: {
      control: 'number',
      description: 'Comprimento máximo',
    },
    required: {
      control: 'boolean',
      description: 'Campo obrigatório',
    },
    uppercase: {
      control: 'boolean',
      description: 'Converter para maiúsculas',
    },
    prefix: {
      control: 'text',
      description: 'Prefixo do input (painel decorativo)',
    },
    prefixAlign: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Alinhamento do prefixo',
    },
    decimais: {
      control: 'number',
      description: 'Casas decimais (tipo decimal)',
    },
    milhar: {
      control: 'boolean',
      description: 'Exibir separador de milhar (tipo decimal)',
    },
    anoMin: {
      control: 'number',
      description: 'Ano mínimo (tipos data/dataHora)',
    },
    anoMax: {
      control: 'number',
      description: 'Ano máximo (tipos data/dataHora)',
    },
    autoSearch: {
      control: 'boolean',
      description: 'Emitir evento ao completar CEP',
    },
  },
};

export default meta;
type Story = StoryObj<CustomInputComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Digite seu nome...',
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: 'Buscar...',
    icon: 'search',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Email',
    error: 'Email inválido',
  },
};

export const WithHint: Story = {
  args: {
    placeholder: 'Senha',
    type: 'password',
    hint: 'Mínimo 8 caracteres',
  },
};

export const Numeric: Story = {
  args: {
    placeholder: 'Idade',
    numeric: true,
  },
};

export const WithPrefix: Story = {
  args: {
    placeholder: '0,00',
    prefix: 'R$',
    type: 'decimal',
  },
};

export const Uppercase: Story = {
  args: {
    placeholder: 'Código',
    uppercase: true,
  },
};

export const Required: Story = {
  args: {
    placeholder: 'Campo obrigatório',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Desabilitado',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input desabilitado via FormControl.',
      },
    },
  },
};

export const CPF: Story = {
  args: {
    type: 'cpf',
    placeholder: '000.000.000-00',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input CPF com máscara 000.000.000-00 e validação automática de dígitos verificadores.',
      },
    },
  },
};

export const CPFInvalid: Story = {
  args: {
    type: 'cpf',
    placeholder: '000.000.000-00',
    error: 'CPF inválido',
  },
};

export const CNPJ: Story = {
  args: {
    type: 'cnpj',
    placeholder: '00.000.000/0000-00',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input CNPJ alfanumérico com máscara SS.SSS.SSS/SSSS-00. Aceita tanto o formato antigo (somente dígitos) quanto o novo formato alfanumérico (válido a partir de julho/2026).',
      },
    },
  },
};

export const CNPJAlphanumerico: Story = {
  args: {
    type: 'cnpj',
    placeholder: '00.000.000/0000-00',
  },
  parameters: {
    docs: {
      description: {
        story: 'CNPJ no novo formato alfanumérico. Exemplo: 12ABC3450001AB',
      },
    },
  },
};

export const Valor: Story = {
  args: {
    type: 'valor',
    placeholder: 'R$ 0,00',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input de valor monetário BRL com lógica calculadora (digitação direita→esquerda). Prefixo R$ automático, 2 casas decimais fixas, separador de milhar.',
      },
    },
  },
};

export const CEP: Story = {
  args: {
    type: 'cep',
    placeholder: '00000-000',
    autoSearch: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input CEP com máscara 00000-000. Quando `autoSearch=true`, emite evento `(cepCompleto)` ao completar 8 dígitos.',
      },
    },
  },
};

export const Data: Story = {
  args: {
    type: 'data',
    placeholder: 'DD/MM/AAAA',
    anoMin: 1900,
    anoMax: 2024,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input de data com máscara DD/MM/AAAA e validação calendárica. Emite evento `(dataValida)` com objeto Date quando a data é completa e válida.',
      },
    },
  },
};

export const DataHora: Story = {
  args: {
    type: 'dataHora',
    placeholder: 'DD/MM/AAAA HH:mm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input de data e hora com máscara DD/MM/AAAA HH:mm. Valida dia, mês, ano, hora (0-23) e minuto (0-59). Emite evento `(dataHoraValida)` com objeto Date.',
      },
    },
  },
};

export const Decimal: Story = {
  args: {
    type: 'decimal',
    placeholder: '0,000',
    decimais: 3,
    milhar: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input decimal com 3 casas decimais e sem separador de milhar. Útil para quantidades fracionárias.',
      },
    },
  },
};

export const DecimalComMilhar: Story = {
  args: {
    type: 'decimal',
    placeholder: '0,00',
    decimais: 2,
    milhar: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input decimal com 2 casas decimais e separador de milhar ativado.',
      },
    },
  },
};

export const IconButton: Story = {
  args: {
    placeholder: 'Buscar...',
    icon: 'search',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ícone renderizado como button clicável. Emite evento `(iconClick)` ao ser pressionado. Acessível via teclado (Enter/Space).',
      },
    },
  },
};

export const PrefixDecorativo: Story = {
  args: {
    type: 'valor',
    prefix: 'R$',
  },
  parameters: {
    docs: {
      description: {
        story: 'Prefix renderizado como painel decorativo com fundo primary (opacidade 0.5) e texto on-primary. Não-clicável.',
      },
    },
  },
};

export const Telefone: Story = {
  args: {
    type: 'telefone',
    placeholder: '(00) 0000-0000',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input telefone fixo com máscara (00) 0000-0000. Caracteres especiais removidos automaticamente no valor do form control.',
      },
    },
  },
};

export const Celular: Story = {
  args: {
    type: 'celular',
    placeholder: '(00) 00000-0000',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input celular com máscara (00) 00000-0000. Caracteres especiais removidos automaticamente no valor do form control.',
      },
    },
  },
};

export const Hora: Story = {
  args: {
    type: 'hora',
    placeholder: 'HH:mm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input de hora com máscara HH:mm e validação de valores (hora 0-23, minuto 0-59).',
      },
    },
  },
};

export const CartaoValidade: Story = {
  args: {
    type: 'cartaoValidade',
    placeholder: 'MM/AA',
    maxlength: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Validade de cartão com máscara MM/AA e limite de 5 caracteres. A validação de mês e vencimento fica no domínio de pagamento.',
      },
    },
  },
};
