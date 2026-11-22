## 1. Configuração

- [ ] 1.1 Confirmar `environment.apiUrl` por ambiente
- [ ] 1.2 Criar `ApiConfig`/constantes de headers
- [ ] 1.3 Criar modelos de paginação (`PageRequest`, `PageMeta`)
- [ ] 1.4 Criar modelo de erro (`ProblemDetail`)

## 2. Repositories

- [ ] 2.1 Criar repository base (opcional) com `HttpClient`
- [ ] 2.2 Criar `AuthRepository`
- [ ] 2.3 Criar `TenantRepository`
- [ ] 2.4 Criar `HomeRepository` (ou mocks)
- [ ] 2.5 Testar repositories com `HttpTestingController`

## 3. Interceptors

- [ ] 3.1 Criar `requestIdInterceptor`
- [ ] 3.2 Criar `authInterceptor`
- [ ] 3.3 Criar `contextInterceptor`
- [ ] 3.4 Criar `noCacheInterceptor`
- [ ] 3.5 Criar `errorInterceptor`
- [ ] 3.6 Registrar ordem em `app.config.ts`
- [ ] 3.7 Testar cada interceptor

## 4. Erros e UX

- [ ] 4.1 Criar `ErrorService` com mapeamento por status
- [ ] 4.2 Mapear 422 para formulários
- [ ] 4.3 Mapear 429 com `Retry-After`
- [ ] 4.4 Mapear 500 com `traceId`
- [ ] 4.5 Integrar toast/página de erro
- [ ] 4.6 Testes de erro

## 5. Paginação e filtros

- [ ] 5.1 Criar modelo de request
- [ ] 5.2 Criar modelo de response/meta
- [ ] 5.3 Integrar com `uw-table` lazy
- [ ] 5.4 Testar paginação/ordenação/filtros

## 6. Documentação e validação

- [ ] 6.1 Atualizar `docs/api-contract.md`
- [ ] 6.2 Documentar interceptors
- [ ] 6.3 Rodar `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`
- [ ] 6.4 Rodar `openspec validate api-integration --strict`
- [ ] 6.5 Atualizar `tasks.md`
