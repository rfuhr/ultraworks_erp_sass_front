## Why

O frontend precisa consumir a API Java de forma consistente, com headers de autenticação/contexto, tratamento de erros RFC 7807, paginação e repositories testáveis. Sem essa camada, cada feature criaria seu próprio padrão de HTTP/erro.

## What Changes

- Criar configuração de `apiUrl` e headers.
- Criar **repositories** por feature com `HttpClient`.
- Criar **interceptors**:
  - auth (`Bearer`);
  - contexto (`X-Tenant-Id`, `X-Empresa-Id`, `X-Empresa-Filial-Id`);
  - erro (RFC 7807);
  - request id;
  - no-cache.
- Implementar **refresh single-flight** em 401.
- Mapear erros 400/401/403/404/409/422/429/500 para UX.
- Implementar **paginação/filtros/ordenação**.
- Criar modelos de request/response.
- Cobrir com testes.

## Capabilities

### New Capabilities

- `http-repositories`: repositories HTTP por feature.
- `context-headers`: headers de autenticação, tenant e empresa/filial.
- `error-ux`: tratamento e apresentação de erros RFC 7807.
- `pagination`: paginação, filtros e ordenação.

### Modified Capabilities

Nenhuma — o bootstrap não define camada de API.

## Non-goals

- Regras de negócio de módulos.
- Endpoints de ERP além dos usados no login/shell.
- GraphQL.
- Cache offline.

## Impact

- **Core:** `interceptors`, `services/error`, `models`.
- **Data:** `repositories` por feature.
- **Features:** services stateful com signals.
- **Docs:** `docs/api-contract.md`.
