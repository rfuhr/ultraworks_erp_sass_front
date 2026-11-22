import type { AppEnvironment } from './environment.model';

export const environment: AppEnvironment = {
  name: 'local',
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
};
