## ADDED Requirements

### Requirement: Configuração por ambiente

O sistema MUST ter configuração de ambiente para `local`, `staging` e `prod`, com `apiUrl` distinto.

#### Scenario: Ambiente local

- **GIVEN** o build local
- **WHEN** a aplicação inicia
- **THEN** `environment.apiUrl` MUST apontar para o backend local
- **AND** nenhuma URL de produção MUST estar hardcoded

#### Scenario: Build de produção

- **GIVEN** `pnpm build --configuration production`
- **WHEN** o build termina
- **THEN** o `apiUrl` de produção MUST ser usado
- **AND** source maps MUST seguir a política do ambiente

### Requirement: Headers de contexto

O sistema MUST definir os headers de tenant/contexto usados pela API.

#### Scenario: Configuração de headers

- **GIVEN** o ambiente
- **WHEN** a configuração é inspecionada
- **THEN** MUST existir `tenantHeader` (`X-Tenant-Id`)
- **AND** MUST existir `requestIdHeader` (`X-Request-Id`)

### Requirement: Sem segredos no frontend

O sistema MUST NOT conter segredos, tokens ou chaves privadas no código/build.

#### Scenario: Inspeção do bundle

- **GIVEN** o build de produção
- **WHEN** o bundle é inspecionado
- **THEN** NÃO MUST conter segredos
- **AND** apenas variáveis públicas de ambiente MUST estar presentes
