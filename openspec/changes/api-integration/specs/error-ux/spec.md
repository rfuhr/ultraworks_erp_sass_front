## ADDED Requirements

### Requirement: Erros RFC 7807

O sistema MUST interpretar erros no formato RFC 7807.

#### Scenario: 422 validação

- **GIVEN** uma resposta 422 com `errors[]`
- **WHEN** o interceptor processa
- **THEN** os erros MUST ser mapeados por campo
- **AND** o formulário MUST exibir as mensagens

#### Scenario: 500 inesperado

- **GIVEN** uma resposta 500 com `traceId`
- **WHEN** o erro é exibido
- **THEN** MUST mostrar mensagem amigável
- **AND** MUST exibir `traceId` para suporte

### Requirement: Mapeamento por status

O sistema MUST tratar 400/401/403/404/409/422/429/500.

#### Scenario: 401

- **GIVEN** um 401
- **WHEN** o refresh falha
- **THEN** MUST redirecionar para login

#### Scenario: 403

- **GIVEN** um 403
- **WHEN** o usuário acessa um recurso sem permissão
- **THEN** MUST exibir acesso negado

#### Scenario: 404

- **GIVEN** um 404
- **WHEN** o recurso não existe
- **THEN** MUST exibir não encontrado

#### Scenario: 429

- **GIVEN** um 429 com `Retry-After`
- **WHEN** o erro é exibido
- **THEN** MUST informar o tempo de espera
- **AND** MUST desabilitar a ação temporariamente

### Requirement: Feedback consistente

O sistema MUST usar toast/alerta/página de forma consistente.

#### Scenario: Erro de formulário

- **GIVEN** erro de validação
- **WHEN** o usuário submete
- **THEN** MUST exibir inline no campo
- **AND** MUST focar o primeiro erro

#### Scenario: Erro de ação

- **GIVEN** erro em ação assíncrona
- **WHEN** a ação falha
- **THEN** MUST exibir toast persistente
- **AND** MUST permitir retry quando aplicável
