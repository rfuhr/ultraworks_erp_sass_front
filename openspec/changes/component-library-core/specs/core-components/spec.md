## ADDED Requirements

### Requirement: Componentes de formulário

O sistema MUST fornecer componentes de formulário reutilizáveis.

#### Scenario: Botão

- **GIVEN** um formulário
- **WHEN** o usuário interage com `uw-button`
- **THEN** o componente MUST suportar variantes e estados (default, hover, focus, disabled, loading)
- **AND** MUST ser acessível por teclado

#### Scenario: Input e form-field

- **GIVEN** um campo obrigatório
- **WHEN** o valor é inválido
- **THEN** `uw-form-field` MUST exibir label, hint e erro
- **AND** o input MUST ter `aria-invalid` e `aria-describedby`

#### Scenario: Select

- **GIVEN** uma lista de opções
- **WHEN** o usuário abre `uw-select`
- **THEN** MUST permitir busca/teclado
- **AND** MUST respeitar o design system

### Requirement: Componentes de dados

O sistema MUST fornecer tabela, cards, stat cards e paginação.

#### Scenario: Tabela

- **GIVEN** uma listagem
- **WHEN** `uw-table` renderiza
- **THEN** MUST suportar colunas, ordenação, filtros e seleção
- **AND** MUST ter estado vazio e loading

#### Scenario: Stat card

- **GIVEN** um indicador
- **WHEN** `uw-stat-card` renderiza
- **THEN** MUST exibir rótulo, valor e variação (quando houver)

### Requirement: Feedback

O sistema MUST fornecer alert, toast, spinner, skeleton, confirmação e empty state.

#### Scenario: Erro de API

- **GIVEN** uma falha de API
- **WHEN** o erro é exibido
- **THEN** MUST usar `uw-alert`/`uw-toast`
- **AND** MUST seguir o padrão RFC 7807

#### Scenario: Confirmação

- **GIVEN** uma ação destrutiva
- **WHEN** o usuário aciona
- **THEN** `uw-confirmation` MUST pedir confirmação
- **AND** MUST permitir cancelar

### Requirement: Layout

O sistema MUST fornecer o shell e containers.

#### Scenario: Shell

- **GIVEN** uma rota autenticada
- **WHEN** `uw-admin-layout` renderiza
- **THEN** MUST exibir sidebar/header/subheader
- **AND** MUST ser responsivo

#### Scenario: Modal/drawer

- **GIVEN** um formulário/detalhe
- **WHEN** o modal/drawer abre
- **THEN** MUST prender o foco
- **AND** MUST fechar por ESC/botão

### Requirement: Storybook

Todo componente MUST ter story com estados principais.

#### Scenario: Story obrigatória

- **GIVEN** um componente novo/alterado
- **WHEN** o PR é revisado
- **THEN** MUST ter story no Storybook
- **AND** MUST cobrir default, disabled, loading e erro (quando aplicável)

### Requirement: Testes

Todo componente MUST ter teste de inputs/outputs e acessibilidade básica.

#### Scenario: Teste de componente

- **GIVEN** um componente
- **WHEN** `pnpm test` executa
- **THEN** MUST validar renderização e interação principal
- **AND** MUST validar teclado/foco quando interativo
