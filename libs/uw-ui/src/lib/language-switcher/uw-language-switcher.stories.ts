import type { Meta, StoryObj } from '@storybook/angular';
import { UwLanguageSwitcherComponent, LanguageOption } from './uw-language-switcher.component';

const meta: Meta<UwLanguageSwitcherComponent> = {
  title: 'UW-UI/Form/LanguageSwitcher',
  component: UwLanguageSwitcherComponent,
  tags: ['autodocs'],
  argTypes: {
    languages: { control: 'object', description: 'Lista de idiomas disponíveis' },
    initialLang: { control: 'text', description: 'Idioma inicial' },
  },
};

export default meta;
type Story = StoryObj<UwLanguageSwitcherComponent>;

const defaultLanguages: LanguageOption[] = [
  { code: 'pt-br', label: 'Português (BR)', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

export const Default: Story = {
  args: {
    languages: defaultLanguages,
    initialLang: 'pt-br',
  },
};

export const EnglishDefault: Story = {
  args: {
    languages: defaultLanguages,
    initialLang: 'en',
  },
};

export const SpanishDefault: Story = {
  args: {
    languages: defaultLanguages,
    initialLang: 'es',
  },
};

export const TwoLanguages: Story = {
  args: {
    languages: [
      { code: 'pt-br', label: 'Português', flag: '🇧🇷' },
      { code: 'en', label: 'English', flag: '🇺🇸' },
    ],
    initialLang: 'pt-br',
  },
};

export const ManyLanguages: Story = {
  args: {
    languages: [
      { code: 'pt-br', label: 'Português (BR)', flag: '🇧🇷' },
      { code: 'en', label: 'English', flag: '🇺🇸' },
      { code: 'es', label: 'Español', flag: '🇪🇸' },
      { code: 'fr', label: 'Français', flag: '🇫🇷' },
      { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
      { code: 'it', label: 'Italiano', flag: '🇮🇹' },
      { code: 'ja', label: '日本語', flag: '🇯🇵' },
      { code: 'zh', label: '中文', flag: '🇨🇳' },
    ],
    initialLang: 'pt-br',
  },
};

export const WithoutFlags: Story = {
  args: {
    languages: [
      { code: 'pt-br', label: 'Português', flag: '' },
      { code: 'en', label: 'English', flag: '' },
      { code: 'es', label: 'Español', flag: '' },
    ],
    initialLang: 'pt-br',
  },
};

export const InHeader: Story = {
  args: {
    languages: defaultLanguages,
    initialLang: 'pt-br',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center justify-between p-4 bg-white border-b">
        <div class="flex items-center gap-4">
          <uw-icon name="event" size="lg" />
          <h1 class="text-xl font-semibold">UltraEventos</h1>
        </div>
        <div class="flex items-center gap-4">
          <uw-language-switcher [languages]="languages" [initialLang]="initialLang" />
          <uw-avatar initials="US" size="sm" />
        </div>
      </div>
    `,
  }),
};
