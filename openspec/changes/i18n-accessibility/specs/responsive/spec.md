## ADDED Requirements

### Requirement: Breakpoints

O sistema MUST definir breakpoints para mobile, tablet e desktop.

#### Scenario: Mobile

- **GIVEN** viewport < 640px
- **WHEN** a tela renderiza
- **THEN** o layout MUST ser mobile-first
- **AND** a sidebar MUST virar drawer

#### Scenario: Tablet

- **GIVEN** viewport 640–1024px
- **WHEN** a tela renderiza
- **THEN** o layout MUST se adaptar
- **AND** conteúdos densos MUST ter scroll/colunas reduzidas

#### Scenario: Desktop

- **GIVEN** viewport > 1024px
- **WHEN** a tela renderiza
- **THEN** o layout MUST usar sidebar fixa e conteúdo fluido

### Requirement: Tabelas responsivas

O sistema MUST adaptar tabelas em telas pequenas.

#### Scenario: Tabela no mobile

- **GIVEN** uma tabela com muitas colunas
- **WHEN** a viewport é mobile
- **THEN** MUST permitir scroll horizontal ou ocultar colunas
- **AND** as ações MUST permanecer acessíveis

### Requirement: Formulários responsivos

O sistema MUST adaptar formulários.

#### Scenario: Formulário no mobile

- **GIVEN** um formulário
- **WHEN** a viewport é mobile
- **THEN** os campos MUST ocupar a largura disponível
- **AND** os botões MUST ser acessíveis

### Requirement: Conteúdo sem quebra

O sistema MUST evitar overflow/quebra de layout.

#### Scenario: Texto longo

- **GIVEN** um texto longo
- **WHEN** ele é exibido
- **THEN** MUST quebrar linha/truncar conforme o componente
- **AND** NÃO MUST causar scroll horizontal indesejado
