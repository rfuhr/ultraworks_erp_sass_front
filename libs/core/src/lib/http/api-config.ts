import { InjectionToken, type Provider } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

export function provideApiUrl(apiUrl: string): Provider {
  return { provide: API_URL, useValue: apiUrl };
}
