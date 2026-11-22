## ADDED Requirements

### Requirement: Menu por permissões

O sistema MUST montar o menu conforme permissões/features do usuário.

#### Scenario: Permissão presente

- **GIVEN** um usuário com permissão de estoque
- **WHEN** o menu renderiza
- **THEN** o item “Estoque” MUST aparecer

#### Scenario: Permissão ausente

- **GIVEN** um usuário sem permissão de financeiro
- **WHEN** o menu renderiza
- **THEN** o item “Financeiro” NÃO MUST aparecer
- **AND** a rota MUST ser protegida

### Requirement: Submenus

O sistema MUST suportar submenus.

#### Scenario: Expandir

- **GIVEN** um item com submenu
- **WHEN** o usuário clica
- **THEN** o submenu MUST expandir/colapsar
- **AND** o estado MUST ser acessível por teclado

### Requirement: Rota ativa

O sistema MUST indicar a rota ativa.

#### Scenario: Navegação

- **GIVEN** o usuário em `/app/estoque/saldos`
- **WHEN** o menu renderiza
- **THEN** “Estoque” e “Saldos” MUST estar destacados

### Requirement: Colapso

O sistema MUST permitir colapsar/expandir a sidebar.

#### Scenario: Colapso

- **GIVEN** a sidebar expandida
- **WHEN** o usuário colapsa
- **THEN** os ícones MUST permanecer visíveis
- **AND** o estado MUST ser persistido na sessão
