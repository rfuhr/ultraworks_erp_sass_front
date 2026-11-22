import type { Meta, StoryObj } from '@storybook/angular';
import { UwCopyFieldComponent } from './uw-copy-field.component';

const meta: Meta<UwCopyFieldComponent> = {
  title: 'UW-UI/Utility/CopyField',
  component: UwCopyFieldComponent,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'Valor a ser exibido e copiado' },
    label: { control: 'text', description: 'Label opcional acima do campo' },
  },
};

export default meta;
type Story = StoryObj<UwCopyFieldComponent>;

export const Default: Story = {
  args: {
    value: 'contato@evento.com.br',
    label: 'Chave PIX',
  },
};

export const SemLabel: Story = {
  args: {
    value: '00020126580014br.gov.bcb.pix0136contato@evento.com.br',
  },
};

export const ChaveLarga: Story = {
  args: {
    value: '00020126580014br.gov.bcb.pix0136contato@evento.com.br0212Pagamento20265204000053039865404150.005802BR5913Organizador ABC6008Brasilia62070503***6304ABCD',
    label: 'Chave PIX Copia e Cola',
  },
};
