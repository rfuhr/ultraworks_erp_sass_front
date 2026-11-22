## ADDED Requirements

### Requirement: Navegação por teclado

O sistema MUST permitir operar as telas por teclado.

#### Scenario: Login

- **GIVEN** a tela de login
- **WHEN** o usuário navega por Tab/Enter
- **THEN** MUST preencher e submeter
- **AND** o foco MUST ser visível

#### Scenario: Menu

- **GIVEN** o menu lateral
- **WHEN** o usuário navega por teclado
- **THEN** MUST expandir/colapsar e navegar
- **AND** MUST haver `aria-expanded`

### Requirement: Foco

O sistema MUST gerenciar foco em modais/drawers.

#### Scenario: Modal

- **GIVEN** um modal aberto
- **WHEN** ele abre
- **THEN** o foco MUST ir para o primeiro elemento
- **AND** MUST ficar preso no modal
- **AND** MUST retornar ao gatilho ao fechar

### Requirement: ARIA e labels

O sistema MUST usar labels e aria corretos.

#### Scenario: Formulário

- **GIVEN** um campo obrigatório
- **WHEN** ele é renderizado
- **THEN** MUST ter label associado
- **AND** erro MUST ser anunciado (`aria-describedby`/`role=alert`)

#### Scenario: Ícone

- **GIVEN** um botão somente com ícone
- **WHEN** ele é renderizado
- **THEN** MUST ter `aria-label`

### Requirement: Contraste

O sistema MUST atender contraste mínimo.

#### Scenario: Texto

- **GIVEN** texto sobre superfície
- **WHEN** o contraste é medido
- **THEN** MUST ser ≥ 4.5:1 (texto normal)
- **AND** ≥ 3:1 para texto grande

### Requirement: Movimento reduzido

O sistema MUST respeitar `prefers-reduced-motion`.

#### Scenario: Animação

- **GIVEN** usuário com movimento reduzido
- **WHEN** uma animação ocorre
- **THEN** MUST ser reduzida/desativada
