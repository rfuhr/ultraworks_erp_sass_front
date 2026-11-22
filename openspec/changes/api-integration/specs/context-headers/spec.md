## ADDED Requirements

### Requirement: Header de autenticação

O sistema MUST enviar `Authorization: Bearer <accessToken>` em rotas autenticadas.

#### Scenario: Requisição autenticada

- **GIVEN** um access token em memória
- **WHEN** uma requisição é feita
- **THEN** o header MUST ser enviado
- **AND** NÃO MUST ser enviado em rotas públicas

### Requirement: Headers de contexto

O sistema MUST enviar `X-Tenant-Id`, `X-Empresa-Id` e `X-Empresa-Filial-Id`.

#### Scenario: Contexto ativo

- **GIVEN** um contexto selecionado
- **WHEN** uma requisição é feita
- **THEN** os três headers MUST ser enviados
- **AND** MUST corresponder ao contexto atual

#### Scenario: Contexto ausente

- **GIVEN** uma requisição que exige contexto
- **WHEN** o contexto não está selecionado
- **THEN** o sistema MUST bloquear/solicitar seleção

### Requirement: Request ID

O sistema MUST enviar `X-Request-Id` em todas as requisições.

#### Scenario: Correlação

- **GIVEN** uma requisição
- **WHEN** ela é enviada
- **THEN** o header MUST conter um UUID
- **AND** o mesmo ID MUST aparecer em erros/logs

### Requirement: No-cache

O sistema MUST permitir desabilitar cache em requisições sensíveis.

#### Scenario: Requisição sem cache

- **GIVEN** um endpoint sensível
- **WHEN** a requisição é feita
- **THEN** headers de no-cache MUST ser enviados
