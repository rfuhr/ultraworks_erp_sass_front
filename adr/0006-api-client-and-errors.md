# 0006. Cliente HTTP, repositories e erros RFC 7807

- Status: accepted
- Date: 2026-11-20

## Context

O backend Java retorna erros no formato RFC 7807 (`ProblemDetail`) e usa headers de tenant/contexto. O frontend precisa de uma camada de acesso a dados consistente, com tratamento de 401/403/404/422/429/500 e paginação.

## Decision

Adotar:

- **Repository** por feature/recurso com `HttpClient`.
- **Service** stateful com signals para estado de tela.
- **Interceptors** globais:
  - `authInterceptor`: `Authorization: Bearer`.
  - `contextInterceptor`: `X-Tenant-Id`, `X-Empresa-Id`, `X-Empresa-Filial-Id`.
  - `errorInterceptor`: RFC 7807.
  - `noCacheInterceptor`: quando necessário.
- **Refresh single-flight** em 401.
- Erros 422 mapeados para formulários; 429 com `Retry-After`; 500 com `traceId`.
- Paginação `page`/`pageSize`, filtros explícitos.

## Consequences

- **Positivo:** contrato único e previsível.
- **Positivo:** UX de erro consistente.
- **Negativo:** exige disciplina para não chamar `HttpClient` direto em componentes.
- **Negativo:** interceptors precisam ser testados.

## Alternatives considered

- **HttpClient direto em componentes:** rejeitado por duplicação e baixo teste.
- **GraphQL:** fora do escopo; backend REST.
- **Tratamento de erro por tela:** rejeitado por inconsistência.
