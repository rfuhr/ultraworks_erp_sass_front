export interface AppEnvironment {
  readonly name: 'local' | 'staging' | 'production';
  readonly production: boolean;
  readonly apiUrl: string;
}
