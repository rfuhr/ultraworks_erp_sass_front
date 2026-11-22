## ADDED Requirements

### Requirement: Página 403

O sistema MUST exibir uma página de acesso negado.

#### Scenario: Sem permissão

- **GIVEN** um usuário sem permissão
- **WHEN** acessa uma rota protegida
- **THEN** MUST exibir `/403`
- **AND** MUST oferecer voltar para a home

### Requirement: Página 404

O sistema MUST exibir uma página de não encontrado.

#### Scenario: Rota inexistente

- **GIVEN** uma URL inexistente
- **WHEN** o usuário acessa
- **THEN** MUST exibir `/404`
- **AND** MUST oferecer voltar

### Requirement: Página de erro

O sistema MUST exibir uma página de erro genérico.

#### Scenario: Erro inesperado

- **GIVEN** um erro 500
- **WHEN** a página é exibida
- **THEN** MUST mostrar mensagem amigável
- **AND** MUST exibir `traceId` para suporte
- **AND** MUST oferecer retry/voltar

### Requirement: Acessibilidade

As páginas de erro MUST ser acessíveis.

#### Scenario: Leitor de tela

- **GIVEN** a página de erro
- **WHEN** um leitor de tela acessa
- **THEN** o título e a mensagem MUST ser anunciados
- **AND** as ações MUST ser focáveis
