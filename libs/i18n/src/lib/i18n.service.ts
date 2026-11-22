import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const SUPPORTED_LANGUAGES = [
  { code: 'pt-br', label: 'Português (BR)', flag: '🇧🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
] as const;

const STORAGE_KEY = 'app.lang';
const DEFAULT_LANGUAGE = 'pt-br';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly translate = inject(TranslateService);

  readonly languages = SUPPORTED_LANGUAGES;
  readonly currentLanguage = signal(DEFAULT_LANGUAGE);

  init(): void {
    const saved = this.readSavedLanguage();
    this.use(saved ?? DEFAULT_LANGUAGE);
  }

  use(language: string): void {
    const normalized = this.languages.some((item) => item.code === language)
      ? language
      : DEFAULT_LANGUAGE;

    this.translate.use(normalized);
    this.currentLanguage.set(normalized);
    this.persist(normalized);
  }

  private readSavedLanguage(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEY);
  }

  private persist(language: string): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, language);
  }
}
