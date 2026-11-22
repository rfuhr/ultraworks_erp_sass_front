import type { Meta, StoryObj } from '@storybook/angular';
import { UwChartLegendComponent } from './uw-chart-legend.component';

const meta: Meta<UwChartLegendComponent> = {
  title: 'UW-UI/Data/Chart Legend',
  component: UwChartLegendComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UwChartLegendComponent>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Pagas e confirmadas', value: 642, color: 'var(--color-chart-4)' },
      { label: 'Aguardando pagamento', value: 87, color: 'var(--color-chart-5)' },
      { label: 'Canceladas', value: 14, color: 'var(--color-surface-dim)' },
    ],
  },
};
