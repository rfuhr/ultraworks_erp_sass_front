import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { errorInterceptor, provideApiUrl } from '@app/core';
import { provideI18n } from '@app/i18n';
import { environment } from '../environments/environment';
import { validateEnvironment } from '../environments/environment.validation';
import { routes } from './app.routes';

validateEnvironment(environment);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideApiUrl(environment.apiUrl),
    provideI18n(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
  ],
};
