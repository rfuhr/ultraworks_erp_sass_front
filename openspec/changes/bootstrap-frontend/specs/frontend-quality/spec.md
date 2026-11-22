## ADDED Requirements

### Requirement: Lint e formatação

O sistema MUST ter ESLint e Prettier configurados e MUST falhar em código fora do padrão.

#### Scenario: Código fora do padrão

- **GIVEN** um arquivo com formatação incorreta
- **WHEN** `pnpm lint`/`pnpm format --check` executam
- **THEN** o comando MUST falhar
- **AND** o arquivo MUST ser corrigível

#### Scenario: Código válido

- **GIVEN** código no padrão
- **WHEN** `pnpm lint` executa
- **THEN** o comando MUST concluir com sucesso

### Requirement: Typecheck

O sistema MUST validar tipos com `tsc --noEmit` e `strictTemplates`.

#### Scenario: Erro de tipo

- **GIVEN** um componente com input incompatível
- **WHEN** `pnpm typecheck` executa
- **THEN** o comando MUST falhar
- **AND** o erro MUST indicar o arquivo/linha

### Requirement: Testes unitários

O sistema MUST executar testes unitários com Jest.

#### Scenario: Teste de fumaça

- **GIVEN** o app criado
- **WHEN** `pnpm test` executa
- **THEN** os testes MUST passar
- **AND** o relatório de cobertura MUST ser gerado

### Requirement: E2E de fumaça

O sistema MUST ter um teste E2E mínimo com Playwright.

#### Scenario: App carrega

- **GIVEN** o app em execução
- **WHEN** o Playwright acessa a rota inicial
- **THEN** a página MUST renderizar
- **AND** o teste MUST passar

### Requirement: CI

O sistema MUST ter pipeline que executa lint, typecheck, testes e build.

#### Scenario: PR válido

- **GIVEN** um pull request válido
- **WHEN** o pipeline executa
- **THEN** lint, typecheck, test e build MUST passar
- **AND** o merge MUST ser permitido

#### Scenario: PR com falha

- **GIVEN** um pull request com teste quebrado
- **WHEN** o pipeline executa
- **THEN** o merge MUST ser bloqueado
