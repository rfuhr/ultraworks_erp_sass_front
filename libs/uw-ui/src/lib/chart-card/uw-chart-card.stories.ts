import type { Meta, StoryObj } from '@storybook/angular';
import { UwChartCardComponent } from './uw-chart-card.component';

const meta: Meta<UwChartCardComponent> = {
  title: 'UW-UI/Data/Chart Card',
  component: UwChartCardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UwChartCardComponent>;

export const Default: Story = {
  args: {
    title: 'Recebimento por forma de pagamento',
    subtitle: 'Valor realizado no período',
    badge: 'R$ 184.320,00',
  },
  render: (args) => ({
    props: args,
    template: `
      <uw-chart-card [title]="title" [subtitle]="subtitle" [badge]="badge">
        <div style="height: 160px; display: grid; place-items: center; color: var(--color-on-surface-variant); font-size: 12px;">
          Conteúdo do gráfico
        </div>
      </uw-chart-card>
    `,
  }),
};
