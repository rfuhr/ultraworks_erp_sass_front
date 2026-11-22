## ADDED Requirements

### Requirement: Seletor de tenant

O sistema MUST fornecer `uw-tenant-switcher` para alternar entre tenants disponíveis.

#### Scenario: Múltiplos tenants

- **GIVEN** um usuário com mais de um tenant
- **WHEN** ele abre o seletor
- **THEN** MUST listar apenas tenants com membership ativo
- **AND** MUST indicar o tenant atual

#### Scenario: Tenant único

- **GIVEN** um usuário com um único tenant
- **WHEN** o seletor é exibido
- **THEN** MUST permanecer oculto ou desabilitado
- **AND** NÃO MUST permitir troca inválida

### Requirement: Seletor de empresa/filial

O sistema MUST fornecer `uw-company-switcher` para selecionar empresa/filial.

#### Scenario: Múltiplas filiais

- **GIVEN** um tenant com múltiplas empresas/filiais
- **WHEN** o usuário seleciona
- **THEN** o contexto MUST ser atualizado
- **AND** as requisições seguintes MUST enviar `X-Empresa-Id`/`X-Empresa-Filial-Id`

#### Scenario: Única filial

- **GIVEN** um tenant com uma única empresa/filial
- **WHEN** o contexto é carregado
- **THEN** MUST selecionar automaticamente
- **AND** NÃO MUST exigir interação

### Requirement: Badge de contexto

O sistema MUST fornecer `uw-context-badge` com tenant/empresa/filial atual.

#### Scenario: Exibição

- **GIVEN** um contexto ativo
- **WHEN** o badge renderiza
- **THEN** MUST exibir tenant e empresa/filial
- **AND** MUST permitir abrir o seletor

### Requirement: Plano e quota

O sistema MUST fornecer `uw-plan-badge` e `uw-quota-meter`.

#### Scenario: Plano

- **GIVEN** um tenant com plano ativo
- **WHEN** o badge renderiza
- **THEN** MUST exibir nome do plano e status
- **AND** MUST distinguir trial/ativo/suspenso

#### Scenario: Quota

- **GIVEN** uso e limite de uma métrica
- **WHEN** o medidor renderiza
- **THEN** MUST exibir usado/limite e percentual
- **AND** MUST indicar quando estiver próximo/acima do limite

### Requirement: Feature gate

O sistema MUST fornecer `uw-feature-gate` para renderizar conforme entitlement.

#### Scenario: Feature habilitada

- **GIVEN** uma feature habilitada no plano/override
- **WHEN** o componente renderiza
- **THEN** o conteúdo MUST ser exibido

#### Scenario: Feature desabilitada

- **GIVEN** uma feature não habilitada
- **WHEN** o componente renderiza
- **THEN** o conteúdo NÃO MUST ser exibido
- **AND** MAY exibir fallback/upgrade
