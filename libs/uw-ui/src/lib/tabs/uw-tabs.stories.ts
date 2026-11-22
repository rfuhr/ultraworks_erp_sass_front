import type { Meta, StoryObj } from '@storybook/angular';
import { UwTabsComponent } from './uw-tabs.component';

const meta: Meta<UwTabsComponent> = {
  title: 'UW-UI/Navigation/Tabs',
  component: UwTabsComponent,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array de tabs com label e value',
    },
    activeTab: {
      control: 'text',
      description: 'Valor da tab ativa',
    },
  },
};

export default meta;
type Story = StoryObj<UwTabsComponent>;

const defaultTabs = [
  { label: 'Geral', value: 'geral' },
  { label: 'Detalhes', value: 'detalhes' },
  { label: 'Configurações', value: 'configuracoes' },
];

const tabsWithIcons = [
  { label: 'Dashboard', value: 'dashboard', icon: 'dashboard' },
  { label: 'Usuários', value: 'usuarios', icon: 'people' },
  { label: 'Relatórios', value: 'relatorios', icon: 'assessment' },
];

export const Default: Story = {
  args: {
    tabs: defaultTabs,
    activeTab: 'geral',
  },
};

export const WithIcons: Story = {
  args: {
    tabs: tabsWithIcons,
    activeTab: 'dashboard',
  },
};

export const FirstTabActive: Story = {
  args: {
    tabs: defaultTabs,
    activeTab: 'geral',
  },
};

export const LastTabActive: Story = {
  args: {
    tabs: defaultTabs,
    activeTab: 'configuracoes',
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', value: 'tab1' },
      { label: 'Tab 2', value: 'tab2' },
      { label: 'Tab 3', value: 'tab3' },
      { label: 'Tab 4', value: 'tab4' },
      { label: 'Tab 5', value: 'tab5' },
      { label: 'Tab 6', value: 'tab6' },
    ],
    activeTab: 'tab1',
  },
};
