## ADDED Requirements

### Requirement: Resolução de tenant no login

O sistema MUST resolver o tenant por subdomínio ou campo de tenant.

#### Scenario: Subdomínio

- **GIVEN** o acesso em `acme.app.exemplo.com`
- **WHEN** a tela de login carrega
- **THEN** o tenant MUST ser identificado como `acme`
- **AND** o campo de tenant MAY ser ocultado

#### Scenario: Campo de tenant

- **GIVEN** acesso por domínio genérico
- **WHEN** o usuário informa o tenant
- **THEN** o login MUST usar o tenant informado
- **AND** MUST validar o formato do slug

### Requirement: Seleção de empresa/filial

O sistema MUST permitir selecionar empresa/filial quando houver mais de uma.

#### Scenario: Múltiplas opções

- **GIVEN** um usuário com múltiplas empresas/filiais
- **WHEN** o login conclui
- **THEN** MUST abrir o seletor de contexto
- **AND** NÃO MUST navegar para `/app/home` antes da seleção

#### Scenario: Opção única

- **GIVEN** um usuário com uma única empresa/filial
- **WHEN** o login conclui
- **THEN** o contexto MUST ser selecionado automaticamente
- **AND** MUST navegar para `/app/home`

### Requirement: Headers de contexto

O sistema MUST enviar os headers de contexto nas requisições autenticadas.

#### Scenario: Requisição após seleção

- **GIVEN** um contexto ativo
- **WHEN** uma requisição é feita
- **THEN** MUST enviar `X-Tenant-Id`, `X-Empresa-Id` e `X-Empresa-Filial-Id`
- **AND** os valores MUST corresponder ao contexto selecionado

#### Scenario: Contexto ausente

- **GIVEN** uma requisição sem contexto
- **WHEN** o endpoint exige contexto
- **THEN** o sistema MUST bloquear a requisição
- **AND** MUST solicitar a seleção

### Requirement: Troca de contexto

O sistema MUST permitir trocar empresa/filial sem perder a sessão.

#### Scenario: Troca

- **GIVEN** um usuário autenticado
- **WHEN** ele troca a empresa/filial
- **THEN** o contexto MUST ser atualizado
- **AND** as requisições seguintes MUST usar o novo contexto
- **AND** a tela MUST refletir a mudança
