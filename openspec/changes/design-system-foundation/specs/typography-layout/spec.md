## ADDED Requirements

### Requirement: Tipografia

O sistema MUST usar três famílias: display, body e mono.

#### Scenario: Título de página

- **GIVEN** um título de página
- **WHEN** ele é renderizado
- **THEN** MUST usar `var(--font-family-display)`
- **AND** o peso MUST ser 700

#### Scenario: Corpo de texto

- **GIVEN** um parágrafo
- **WHEN** ele é renderizado
- **THEN** MUST usar `var(--font-family-body)`

#### Scenario: Metadados

- **GIVEN** um ID/timestamp
- **WHEN** ele é renderizado
- **THEN** MUST usar `var(--font-family-mono)`

### Requirement: Layout de sidebar

O sistema MUST usar sidebar fixa de 240px e conteúdo fluido.

#### Scenario: Desktop

- **GIVEN** uma viewport de desktop
- **WHEN** o shell renderiza
- **THEN** a sidebar MUST ter 240px
- **AND** o conteúdo MUST ocupar o restante

#### Scenario: Mobile

- **GIVEN** uma viewport mobile
- **WHEN** o shell renderiza
- **THEN** a sidebar MUST ser colapsável/oculta
- **AND** o conteúdo MUST ocupar a largura disponível

### Requirement: Espaçamento e grid

O sistema MUST usar ritmo de 8px e grid de 12 colunas.

#### Scenario: Seções

- **GIVEN** duas seções distintas
- **WHEN** elas são espaçadas
- **THEN** MUST usar múltiplos de 8px
- **AND** NÃO MUST usar valores arbitrários

### Requirement: Ícones

O sistema MUST usar Material Symbols.

#### Scenario: Ícone de menu

- **GIVEN** um item de menu
- **WHEN** ele é renderizado
- **THEN** MUST usar um ícone Material Symbols
- **AND** o tamanho MUST seguir o token de ícone
