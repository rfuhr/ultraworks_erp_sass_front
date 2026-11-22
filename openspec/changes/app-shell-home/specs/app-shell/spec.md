## ADDED Requirements

### Requirement: Shell autenticado

O sistema MUST exibir o shell com sidebar, header, breadcrumb e conteúdo.

#### Scenario: Rota autenticada

- **GIVEN** um usuário autenticado
- **WHEN** acessa `/app/home`
- **THEN** MUST renderizar sidebar, header, breadcrumb e conteúdo
- **AND** o item de menu ativo MUST ser destacado

#### Scenario: Rota não autenticada

- **GIVEN** nenhum usuário autenticado
- **WHEN** acessa `/app/home`
- **THEN** MUST redirecionar para `/auth/login`

### Requirement: Header e perfil

O sistema MUST exibir no header o contexto e o menu de perfil.

#### Scenario: Contexto

- **GIVEN** um tenant/empresa/filial ativo
- **WHEN** o header renderiza
- **THEN** MUST exibir o contexto atual
- **AND** MUST permitir abrir o seletor

#### Scenario: Perfil

- **GIVEN** um usuário autenticado
- **WHEN** ele abre o menu de perfil
- **THEN** MUST ver configurações, plano/assinatura e sair

### Requirement: Breadcrumb

O sistema MUST exibir breadcrumb por rota.

#### Scenario: Rota profunda

- **GIVEN** a rota `/app/estoque/saldos`
- **WHEN** a tela renderiza
- **THEN** o breadcrumb MUST refletir a hierarquia
- **AND** os itens navegáveis MUST funcionar

### Requirement: Responsividade

O shell MUST ser responsivo.

#### Scenario: Mobile

- **GIVEN** viewport mobile
- **WHEN** o shell renderiza
- **THEN** a sidebar MUST ficar em drawer/colapsada
- **AND** o conteúdo MUST ocupar a largura disponível
