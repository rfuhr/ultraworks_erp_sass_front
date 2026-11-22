## ADDED Requirements

### Requirement: Paginação

O sistema MUST suportar paginação por `page`/`pageSize`.

#### Scenario: Listagem paginada

- **GIVEN** uma listagem
- **WHEN** o usuário navega para a página 2
- **THEN** a requisição MUST enviar `page=2`
- **AND** a resposta MUST atualizar `data` e `meta`

#### Scenario: Limite de página

- **GIVEN** `pageSize` acima de 100
- **WHEN** a requisição é montada
- **THEN** MUST ser limitado a 100
- **AND** MUST notificar/ajustar

### Requirement: Ordenação

O sistema MUST suportar ordenação.

#### Scenario: Ordenar por coluna

- **GIVEN** uma tabela
- **WHEN** o usuário clica no header
- **THEN** `sort` MUST ser enviado
- **AND** a lista MUST ser reordenada

### Requirement: Filtros

O sistema MUST suportar filtros explícitos.

#### Scenario: Busca

- **GIVEN** um campo de busca
- **WHEN** o usuário digita
- **THEN** a requisição MUST enviar o filtro
- **AND** MUST aplicar debounce

#### Scenario: Filtro vazio

- **GIVEN** filtro vazio
- **WHEN** a requisição é montada
- **THEN** o filtro NÃO MUST ser enviado
- **AND** a listagem MUST permanecer consistente

### Requirement: Estados

O sistema MUST refletir loading/empty/error na listagem.

#### Scenario: Loading

- **GIVEN** requisição em andamento
- **WHEN** a tabela renderiza
- **THEN** MUST exibir loading

#### Scenario: Empty

- **GIVEN** resultado vazio
- **WHEN** a tabela renderiza
- **THEN** MUST exibir empty state

#### Scenario: Error

- **GIVEN** falha na requisição
- **WHEN** a tabela renderiza
- **THEN** MUST exibir erro com retry
