# Project: ERP SaaS — Frontend

> **Status:** draft constitucional para o bootstrap. Ajustar nome do produto, identidade visual e versões exatas na primeira change.
>
> **Documento de referência:** [`docs/briefing-frontend-saas.md`](../docs/briefing-frontend-saas.md)
>
> **Backend:** projeto Java em `back/` (API `/api/v1`).
>
> **Nome de trabalho:** ERP SaaS
> **Repositório:** frontend-only (sem monorepo, sem backend)

---

## 1. Visão Geral

Frontend SPA do ERP SaaS, construído em **Angular 21+**, com foco em:

- produtividade operacional (telas densas, teclado, baixa latência percebida);
- consistência visual via **design system**;
- biblioteca própria de componentes **`uw-ui`**;
- autenticação multi-tenant e seleção de empresa/filial;
- acessibilidade e i18n;
- testes e Storybook.

O design system, a estrutura de login/shell e a biblioteca de componentes são **herdados do projeto `congresso`**, com adaptações para o domínio de ERP.

---

## 2. Stack Tecnológica (Non-Negotiable)

| Camada | Tecnologia |
|---|---|
| Framework | **Angular 21+** (standalone components) |
| Linguagem | **TypeScript 5.9+**, `strict: true`, zero `any` |
| Estado | **Signals** + services (sem NgRx) |
| Estilo | **Tailwind CSS 4** + design tokens |
| Componentes | **`uw-ui`** (biblioteca própria, prefixo `uw-`) |
| Ícones | **Material Symbols** |
| i18n | **`@ngx-translate/core`** (pt-BR default; en/es opcional) |
| Gráficos | **`@swimlane/ngx-charts`** |
| Formulários | Reactive Forms + validators; Signal Forms quando estável |
| HTTP | `HttpClient` + interceptors + repositories |
| Testes | **Jest + `jest-preset-angular` + Playwright** |
| Documentação | **Storybook** |
| Lint/format | **ESLint + Prettier** |
| Build | Angular CLI + Docker/nginx |

> **Proibido:** bibliotecas de UI de terceiros (Angular Material, PrimeNG, Bootstrap, Tailwind UI) diretamente. Use `uw-ui` e os tokens do design system.

---

## 3. Estrutura do Projeto

```text
src/
├── app/
│   ├── config/                 # Providers, i18n, environment
│   ├── core/
│   │   ├── guards/             # auth, tenant, role/permission
│   │   ├── interceptors/       # auth, tenant, error, no-cache
│   │   ├── models/             # modelos globais
│   │   ├── repositories/       # HTTP base/global
│   │   └── services/           # auth, session, menu, notification, context
│   ├── data/
│   │   ├── models/             # contratos por feature
│   │   └── repositories/       # HTTP por feature
│   ├── features/
│   │   ├── auth/login/
│   │   ├── home/
│   │   └── <modulo>/<feature>/ # pages, components, services
│   ├── layout/                 # root layout, shell
│   └── shared/
│       ├── components/         # componentes compartilhados não-uw-ui
│       ├── pipes/
│       └── uw-ui/              # biblioteca própria (uw-*)
├── assets/
├── environments/
└── styles/
    ├── tokens/                 # palette, colors, typography, borders
    └── theme.css
```

Regras:

- **Feature-first** em `features/`.
- `core/` contém singletons e infraestrutura de app.
- `data/` contém contratos e repositórios HTTP.
- `shared/uw-ui/` contém apenas componentes reutilizáveis e genéricos.
- Nada de regra de negócio em componente presentational.

---

## 4. Design System (Non-Negotiable)

Fonte da verdade: [`docs/design-system.md`](../docs/design-system.md) e tokens em [`docs/design-tokens/`](../docs/design-tokens/).

- **Tokens em 2 camadas:** palette (`--color-{family}-{shade}`) → semânticos (`--color-{role}`).
- **Tipografia:** `--font-family-display`, `--font-family-body`, `--font-family-mono`.
- **Raios:** `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`.
- **Layout:** sidebar fixa de 240px, conteúdo fluido, grid 12 colunas, ritmo 8px.
- **Superfícies:** sólidas, bordas 1px, sem glassmorphism/sombras dramáticas.
- **Componentes:** `uw-*` com Storybook; estados default/hover/focus/disabled/loading/error.
- **Proibido:** cores hardcoded, `border-radius` fora dos tokens, bibliotecas de UI externas.

---

## 5. Autenticação e Tenancy

### 5.1 Login

- Tenant + e-mail + senha.
- Tenant pode vir do subdomínio (`acme.app.exemplo.com`) ou de um campo no login.
- Mensagens de erro genéricas para credenciais inválidas.
- Rate limit/lockout tratados com UX clara.

### 5.2 Sessão

- **Access token em memória** (signal/serviço).
- **Refresh token em cookie HttpOnly/Secure/SameSite** (contrato alvo).
- Renovação automática em 401, com fila para evitar múltiplos refreshes.
- Logout limpa sessão, contexto e cache.
- Nunca armazenar refresh token em `localStorage`.

### 5.3 Contexto

- Após login, se houver múltiplas empresas/filiais, abrir seletor de contexto.
- Headers: `X-Tenant-Id`, `X-Empresa-Id`, `X-Empresa-Filial-Id`.
- Contexto persistido por sessão; troca exige novo token/refresh quando aplicável.

### 5.4 Guards

- `authGuard`: exige sessão.
- `tenantGuard`: exige tenant ativo.
- `permissionGuard`/`roleGuard`: valida `permissions`/`roles` do token.
- Rotas 403/404/erro.

---

## 6. API e Erros

- Base URL por ambiente (`environment.apiUrl`), prefixo `/api/v1`.
- Repositories por feature; services com signals para estado.
- Interceptors:
  - `authInterceptor`: `Authorization: Bearer`.
  - `contextInterceptor`: `X-Tenant-Id`, `X-Empresa-Id`, `X-Empresa-Filial-Id`.
  - `errorInterceptor`: RFC 7807, 401/403/404/422/429/500.
  - `noCacheInterceptor`: quando necessário.
- Erros:
  - 401 → tentar refresh; se falhar, login.
  - 403 → página/serviço de acesso negado.
  - 404 → página de não encontrado.
  - 422 → erros por campo no formulário.
  - 429 → mensagem com `Retry-After`.
  - 500 → página de erro com `traceId`.
- Paginação: `page`, `pageSize`, `sort`, filtros explícitos.
- Nunca montar URL com PII.

---

## 7. Rotas e Shell

```text
/auth/login
/auth/forgot-password
/auth/reset-password
/app
  ├── /app/home
  ├── /app/<modulo>/<feature>
  ├── /app/configuracoes
  └── /app/admin (quando aplicável)
/403
/404
/error
```

- `/app` usa o **shell autenticado** (`uw-admin-layout`): sidebar, header, breadcrumb, conteúdo.
- Rotas lazy-loaded.
- Menu derivado de permissões/features do backend, não hardcoded por usuário.
- Breadcrumb por rota.
- Home: stat cards, gráficos, atividades recentes, atalhos.

---

## 8. i18n e Acessibilidade

### 8.1 i18n

- pt-BR default; en/es opcional.
- `@ngx-translate/core` com arquivos `i18n/pt-br.json`, `i18n/en.json`, `i18n/es.json`.
- Nenhuma string visível hardcoded.
- Datas/números/moeda por locale.
- Preferência persistida no usuário/localStorage.

### 8.2 Acessibilidade

- WCAG 2.1 AA.
- Navegação por teclado, foco visível, ordem lógica.
- `aria-*`, `role`, labels associados.
- Contraste mínimo 4.5:1.
- `prefers-reduced-motion`.
- Testes de teclado e leitor de tela nos fluxos críticos.

---

## 9. Testes e Qualidade

- **Unitários:** Jest + `jest-preset-angular` para services, repositories, guards, pipes.
- **Componentes:** Jest + TestBed (Angular Testing Library quando disponível).
- **E2E:** Playwright para login, shell, CRUD e fluxos críticos.
- **Visual:** Storybook para `uw-ui`.
- **Cobertura:** 80% em `core/` e `data/`, 70% em `features/`, 100% em `shared/` pipes/directives.
- **Qualidade:** ESLint, Prettier, `tsc --noEmit`, zero `any`, zero `console.log`.
- **Performance:** lazy routes, OnPush, signals, `NgOptimizedImage`, budgets.

---

## 10. Segurança

- Sem segredos no frontend.
- Tokens conforme §5.
- Sanitização de HTML (evitar `innerHTML` não confiável).
- CSP compatível com o build.
- CORS/CSP coordenados com o backend.
- Não logar PII/tokens.
- Dependências auditadas no CI.

---

## 11. Fora de Escopo (por enquanto)

- Backend.
- Monorepo.
- Microfrontends.
- Aplicativo mobile nativo.
- Billing/checkout.
- Módulos de ERP além do shell/home iniciais.
- Temas por tenant (fase futura).

---

## 12. Definition of Done

Uma change só está pronta quando:

- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` passam.
- [ ] Testes unitários, de componente e E2E do fluxo.
- [ ] Acessibilidade revisada (teclado, foco, aria, contraste).
- [ ] Responsivo nos breakpoints definidos.
- [ ] i18n aplicado (sem string hardcoded).
- [ ] Storybook atualizado para componentes novos/alterados.
- [ ] Sem `any`, sem `console.log`, sem segredo.
- [ ] `openspec validate <change> --strict` passa.

---

## 13. Referências

- [`docs/briefing-frontend-saas.md`](../docs/briefing-frontend-saas.md)
- [`docs/design-system.md`](../docs/design-system.md)
- [`docs/component-inventory.md`](../docs/component-inventory.md)
- [`docs/login-and-shell.md`](../docs/login-and-shell.md)
- [`docs/api-contract.md`](../docs/api-contract.md)
- [`adr/`](../adr/)
- [`AGENTS.md`](../AGENTS.md)

---

*Este arquivo é a constituição técnica do frontend. Telas, componentes e regras de domínio são definidos incrementalmente nas specs de cada change. Decisões arquiteturais significativas viram ADRs.*
