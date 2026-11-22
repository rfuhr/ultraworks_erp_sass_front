## Context

O backend Java expõe `/api/v1`, exige headers de tenant/contexto e retorna erros RFC 7807. O frontend precisa de uma camada única de acesso a dados, testável e previsível.

## Goals / Non-Goals

**Goals:**

- Repositories por feature.
- Interceptors globais.
- Erros RFC 7807.
- Paginação/filtros/ordenação.
- Testes com `HttpTestingController`.

**Non-Goals:**

- Regras de negócio.
- Módulos completos.
- Offline/cache avançado.

## Decisions

### D1 — Repository + Service

Repository só fala HTTP; service mantém estado com signals. Componentes não chamam `HttpClient`.

### D2 — Interceptors

Ordem: requestId → auth → context → no-cache → error. Auth e context são funcionais.

### D3 — Refresh

Interceptors de auth tratam 401 com single-flight (ver `auth-login-flow`).

### D4 — Erros

`errorInterceptor` normaliza `ProblemDetail`; `ErrorService` decide UX (toast, página, campo). 422 mapeia `errors[]` para formulários.

### D5 — Paginação

Request `page`, `pageSize`, `sort`, `filters`; response `data` + `meta`. `pageSize` máximo 100.

### D6 — Request ID

Gerar `X-Request-Id` (UUID) por requisição e logar em erro.

### D7 — Testes

`HttpTestingController` para repositories/interceptors; testes de erro por status.

## Risks / Trade-offs

| Risco | Mitigação |
|---|---|
| Interceptor circular | Ordem explícita e testes |
| Refresh concorrente | Single-flight |
| Erro 422 mal mapeado | Contrato + testes |
| Paginação inconsistente | Modelo único |
| Request ID duplicado | Gerar no interceptor |

## Migration Plan

Greenfield. Rollback: remover interceptors e usar HTTP direto temporariamente.

## Open Questions

1. `page`/`pageSize` ou cursor?
2. Retry automático para GET?
3. Cache de curta duração?
4. `traceparent` além de `X-Request-Id`?
