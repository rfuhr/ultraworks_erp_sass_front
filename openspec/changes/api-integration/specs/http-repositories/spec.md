## ADDED Requirements

### Requirement: Repository por feature

O sistema MUST encapsular HTTP em repositories.

#### Scenario: Chamada de listagem

- **GIVEN** uma feature com repository
- **WHEN** o service chama `listar`
- **THEN** o repository MUST fazer `GET` no endpoint correto
- **AND** MUST retornar dados tipados

#### Scenario: Componente não chama HttpClient

- **GIVEN** um componente
- **WHEN** ele precisa de dados
- **THEN** MUST usar um service/repository
- **AND** NÃO MUST injetar `HttpClient` diretamente

### Requirement: Base URL

O sistema MUST usar `environment.apiUrl` como base.

#### Scenario: Ambiente

- **GIVEN** o environment local
- **WHEN** uma requisição é feita
- **THEN** a URL MUST ser `apiUrl + path`
- **AND** NÃO MUST hardcodar domínio

### Requirement: Testes de repository

O sistema MUST testar repositories com `HttpTestingController`.

#### Scenario: Teste

- **GIVEN** um repository
- **WHEN** o teste executa
- **THEN** MUST validar método, URL e body
- **AND** MUST verificar que não há requests pendentes
