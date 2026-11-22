import type { Meta, StoryObj } from '@storybook/angular';
import { UwDatePickerComponent } from './uw-date-picker.component';

const meta: Meta<UwDatePickerComponent> = {
  title: 'UW-UI/Form/DatePicker',
  component: UwDatePickerComponent,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'radio', options: ['date', 'date-range', 'time', 'datetime'], description: 'Modo do date picker' },
    minDate: { control: 'date', description: 'Data mínima' },
    maxDate: { control: 'date', description: 'Data máxima' },
    locale: { control: 'text', description: 'Locale (ex: pt-BR, en-US)' },
    placeholder: { control: 'text', description: 'Texto placeholder' },
    disabled: { control: 'boolean', description: 'Desabilitado' },
    invalid: { control: 'boolean', description: 'Estado inválido' },
    showIcon: { control: 'boolean', description: 'Mostrar ícone' },
    editable: { control: 'boolean', description: 'Permite edição manual' },
    showTime: { control: 'boolean', description: 'Mostrar seletor de hora' },
    hourFormat: { control: 'radio', options: ['24', '12'], description: 'Formato de hora' },
    showSeconds: { control: 'boolean', description: 'Mostrar segundos' },
    inline: { control: 'boolean', description: 'Modo inline (calendário sempre visível)' },
    monthNavigator: { control: 'boolean', description: 'Mostrar seletor de mês' },
    yearNavigator: { control: 'boolean', description: 'Mostrar seletor de ano' },
    yearRange: { control: 'text', description: 'Range de anos (ex: 2020:2030)' },
    numberOfMonths: { control: 'number', description: 'Número de meses visíveis' },
    showTodayButton: { control: 'boolean', description: 'Mostrar botão "Hoje"' },
    showClearButton: { control: 'boolean', description: 'Mostrar botão "Limpar"' },
  },
};

export default meta;
type Story = StoryObj<UwDatePickerComponent>;

export const Default: Story = {
  args: {
    mode: 'date',
    locale: 'pt-BR',
    placeholder: 'Selecionar data',
    disabled: false,
    invalid: false,
    showIcon: false,
    editable: false,
    showTime: false,
    inline: false,
    monthNavigator: false,
    yearNavigator: false,
    numberOfMonths: 1,
    showTodayButton: false,
    showClearButton: false,
  },
};

export const WithIcon: Story = {
  args: {
    mode: 'date',
    locale: 'pt-BR',
    placeholder: 'Selecionar data',
    showIcon: true,
  },
};

export const Editable: Story = {
  args: {
    mode: 'date',
    locale: 'pt-BR',
    placeholder: 'DD/MM/AAAA',
    editable: true,
    showIcon: true,
  },
};

export const WithTime: Story = {
  args: {
    mode: 'datetime',
    locale: 'pt-BR',
    placeholder: 'Selecionar data e hora',
    showIcon: true,
    showTime: true,
    hourFormat: '24',
  },
};

export const TimeOnly: Story = {
  args: {
    mode: 'time',
    locale: 'pt-BR',
    placeholder: 'Selecionar hora',
    showIcon: true,
    hourFormat: '24',
    showSeconds: false,
  },
};

export const DateRange: Story = {
  args: {
    mode: 'date-range',
    locale: 'pt-BR',
    placeholder: 'Selecionar período',
    showIcon: true,
    numberOfMonths: 2,
  },
};

export const WithMinMaxDate: Story = {
  args: {
    mode: 'date',
    locale: 'pt-BR',
    placeholder: 'Selecionar data',
    showIcon: true,
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2024, 11, 31),
  },
};

export const WithNavigators: Story = {
  args: {
    mode: 'date',
    locale: 'pt-BR',
    placeholder: 'Selecionar data',
    showIcon: true,
    monthNavigator: true,
    yearNavigator: true,
    yearRange: '2020:2030',
  },
};

export const Inline: Story = {
  args: {
    mode: 'date',
    locale: 'pt-BR',
    inline: true,
    monthNavigator: true,
    yearNavigator: true,
  },
};

export const WithButtons: Story = {
  args: {
    mode: 'date',
    locale: 'pt-BR',
    placeholder: 'Selecionar data',
    showIcon: true,
    showTodayButton: true,
    showClearButton: true,
  },
};

export const MultipleMonths: Story = {
  args: {
    mode: 'date',
    locale: 'pt-BR',
    placeholder: 'Selecionar data',
    showIcon: true,
    numberOfMonths: 2,
    monthNavigator: true,
    yearNavigator: true,
  },
};

export const Invalid: Story = {
  args: {
    mode: 'date',
    locale: 'pt-BR',
    placeholder: 'Selecionar data',
    showIcon: true,
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    mode: 'date',
    locale: 'pt-BR',
    placeholder: 'Selecionar data',
    showIcon: true,
    disabled: true,
  },
};

export const EnglishLocale: Story = {
  args: {
    mode: 'date',
    locale: 'en-US',
    placeholder: 'Select date',
    showIcon: true,
    monthNavigator: true,
    yearNavigator: true,
  },
};
