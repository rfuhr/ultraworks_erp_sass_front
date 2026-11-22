## ADDED Requirements

### Requirement: Página inicial

O sistema MUST exibir uma home com indicadores, gráficos e atalhos.

#### Scenario: Carregamento

- **GIVEN** um usuário autenticado
- **WHEN** acessa `/app/home`
- **THEN** a home MUST renderizar
- **AND** MUST exibir stat cards, gráficos e atalhos

#### Scenario: Loading

- **GIVEN** dados ainda carregando
- **WHEN** a home renderiza
- **THEN** MUST exibir skeleton/spinner
- **AND** NÃO MUST quebrar o layout

#### Scenario: Empty

- **GIVEN** sem dados no período
- **WHEN** a home renderiza
- **THEN** MUST exibir empty state
- **AND** MUST sugerir ação

#### Scenario: Error

- **GIVEN** falha ao carregar dados
- **WHEN** a home renderiza
- **THEN** MUST exibir erro com retry
- **AND** MUST registrar `traceId` (quando houver)

### Requirement: Indicadores

O sistema MUST exibir indicadores do tenant.

#### Scenario: Stat cards

- **GIVEN** indicadores disponíveis
- **WHEN** a home renderiza
- **THEN** MUST exibir rótulo, valor e variação
- **AND** MUST respeitar o design system

### Requirement: Gráficos

O sistema MUST exibir gráficos quando houver dados.

#### Scenario: Gráfico

- **GIVEN** dados de série
- **WHEN** o gráfico renderiza
- **THEN** MUST ser legível e acessível
- **AND** MUST ter legenda/tooltip

### Requirement: Atalhos

O sistema MUST exibir atalhos para módulos permitidos.

#### Scenario: Atalho

- **GIVEN** um módulo permitido
- **WHEN** o usuário clica no atalho
- **THEN** MUST navegar para a rota correspondente
