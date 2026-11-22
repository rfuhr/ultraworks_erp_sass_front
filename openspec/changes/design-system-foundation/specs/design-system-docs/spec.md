## ADDED Requirements

### Requirement: Documentação de tokens

O sistema MUST documentar os tokens no Storybook.

#### Scenario: Cores

- **GIVEN** o Storybook aberto
- **WHEN** a story de cores é acessada
- **THEN** MUST exibir palette e tokens semânticos
- **AND** MUST mostrar o nome e o valor de cada token

#### Scenario: Tipografia

- **GIVEN** a story de tipografia
- **WHEN** ela é acessada
- **THEN** MUST exibir as três famílias e a escala
- **AND** MUST indicar o uso de cada uma

#### Scenario: Bordas e espaçamento

- **GIVEN** as stories de bordas/espaçamento
- **WHEN** elas são acessadas
- **THEN** MUST exibir os raios e o ritmo de 8px

### Requirement: Fonte única da verdade

O sistema MUST manter `docs/design-system.md` e os tokens sincronizados.

#### Scenario: Token novo

- **GIVEN** um token adicionado
- **WHEN** o PR é revisado
- **THEN** MUST estar documentado
- **AND** MUST ter story/exemplo

#### Scenario: Token removido

- **GIVEN** um token removido
- **WHEN** o PR é revisado
- **THEN** MUST remover referências e aliases
- **AND** MUST atualizar a documentação

### Requirement: Regra de uso

O sistema MUST documentar o que é proibido no design system.

#### Scenario: Proibições

- **GIVEN** a documentação
- **WHEN** um desenvolvedor consulta
- **THEN** MUST encontrar a lista de proibições
- **AND** MUST saber usar tokens corretamente
