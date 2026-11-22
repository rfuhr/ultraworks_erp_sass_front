import type { Provider } from '@angular/core';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export function provideI18n(defaultLanguage = 'pt-br'): Provider[] {
  return provideTranslateService({
    lang: defaultLanguage,
    fallbackLang: defaultLanguage,
    useDefaultLang: true,
    loader: provideTranslateHttpLoader({
      prefix: '/i18n/',
      suffix: '.json',
    }),
  });
}
