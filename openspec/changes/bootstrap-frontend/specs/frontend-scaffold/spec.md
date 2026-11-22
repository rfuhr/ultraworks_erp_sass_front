## ADDED Requirements

### Requirement: Aplicação Angular executável

O sistema MUST ser uma aplicação Angular 21+ standalone que compila e inicia localmente.

#### Scenario: Build reprodutível

- **GIVEN** Node 22 e pnpm instalados
- **WHEN** um desenvolvedor executa `pnpm install` e `pnpm build`
- **THEN** o build MUST concluir sem erros
- **AND** o artefato MUST ser gerado em `dist/`

#### Scenario: Execução local

- **GIVEN** o projeto instalado
- **WHEN** um desenvolvedor executa `pnpm dev`
- **THEN** a aplicação MUST servir em `http://localhost:4200`
- **AND** a rota inicial MUST renderizar

### Requirement: Estrutura feature-first

O sistema MUST organizar o código em `config`, `core`, `data`, `features`, `layout` e `shared/uw-ui`.

#### Scenario: Estrutura de pastas

- **GIVEN** o projeto criado
- **WHEN** a estrutura é inspecionada
- **THEN** os diretórios MUST existir
- **AND** nenhum módulo de feature MUST usar NgModule

#### Scenario: Rota 404

- **GIVEN** uma URL inexistente
- **WHEN** o usuário acessa
- **THEN** a página 404 MUST ser exibida
- **AND** MUST haver um caminho de volta para a rota inicial

### Requirement: TypeScript strict

O sistema MUST usar TypeScript strict e MUST NOT usar `any`.

#### Scenario: Código com any

- **GIVEN** um arquivo com `any`
- **WHEN** o lint/typecheck executa
- **THEN** a validação MUST falhar

#### Scenario: Tipos explícitos

- **GIVEN** um componente ou service
- **WHEN** ele é compilado
- **THEN** os tipos MUST ser explícitos
- **AND** `strictTemplates` MUST estar habilitado
