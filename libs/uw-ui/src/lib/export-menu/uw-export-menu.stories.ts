import type { Meta, StoryObj } from '@storybook/angular';
import { UwExportMenuComponent } from './uw-export-menu.component';

const meta: Meta<UwExportMenuComponent> = {
  title: 'UW-UI/Form/Export Menu',
  component: UwExportMenuComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UwExportMenuComponent>;

export const Default: Story = {
  args: {
    label: 'Exportar',
    csvLabel: 'Exportar CSV',
    xlsxLabel: 'Exportar Excel',
    pdfLabel: 'Exportar PDF',
  },
};

export const Carregando: Story = {
  args: {
    label: 'Exportar',
    csvLabel: 'Exportar CSV',
    xlsxLabel: 'Exportar Excel',
    pdfLabel: 'Exportar PDF',
    loading: true,
  },
};

export const Desabilitado: Story = {
  args: {
    label: 'Exportar',
    csvLabel: 'Exportar CSV',
    xlsxLabel: 'Exportar Excel',
    pdfLabel: 'Exportar PDF',
    disabled: true,
  },
};
