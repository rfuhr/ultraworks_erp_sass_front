# Project: ERP SaaS — Frontend

> **Status:** draft constitucional para o bootstrap. Ajustar nome do produto, identidade visual e versões exatas na primeira change.
>
> **Documento de referência:** [`docs/briefing-frontend-saas.md`](../docs/briefing-frontend-saas.md)
>
> **Backend:** projeto Java em `back/` (API `/api/v1`).
>
> **Nome de trabalho:** ERP SaaS
> **Repositório:** monorepo frontend-only — `apps/erp` (tenant) + `apps/platform-admin` (plataforma), sem backend

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
| Workspace | **Angular CLI multi-project** — 2 apps + libs source-mapped (`@erp/*`) |
| Linguagem | **TypeScript 5.9+**, `strict: true`, zero `any` |
| Estado | **Signals** + services (sem NgRx) |
| Estilo | **Tailwind CSS 4** + design tokens |
| Componentes | **`uw-ui`** (biblioteca própria, prefixo `uw-`) |
| Ícones | **Material Symbols** |
| i18n | **`@ngx-translate/core`** (pt-BR default; en/es opcional) |
| Gráficos | **`@swimlane/ngx-charts`** |
| Formulários | Reactive Forms + validators; Signal Forms quando estável |
| HTTP | `HttpClient` + interceptors + repositories |
| Testes | **Jest + `jest-preset-angular` + Playwright**, por projeto |
| Documentação | **Storybook** (projeto único em `libs/uw-ui`) |
| Lint/format | **ESLint + Prettier** |
| Build | Angular CLI + Docker/nginx |

> **Proibido:** bibliotecas de UI de terceiros (Angular Material, PrimeNG, Bootstrap, Tailwind UI) diretamente. Use `uw-ui` e os tokens do design system.

---

## 3. Estrutura do Projeto

```text
apps/
├── erp/                          # ERP operacional (tenant) — erp.<dominio>
│   ├── src/app/
│   │   ├── app.config.ts         # providers do produto
│   │   ├── app.routes.ts         # rotas do produto
│   │   ├── features/             # telas do produto
│   │   └── layout/               # shell e menu do produto
│   ├── src/environments/
│   ├── src/styles.css            # Tailwind + @source das libs
│   └── e2e/
└── platform-admin/               # gestão de clientes SaaS — admin.<dominio>
    └── (mesma estrutura do erp)

libs/
├── tokens/                       # tokens CSS (palette → semânticos)
├── uw-ui/                        # componentes uw-* + Storybook único
│   ├── src/lib/<componente>/
│   └── .storybook/
├── core/                         # auth, sessão, contexto, HTTP, erros, guards
├── data/                         # models + repositories por domínio
└── i18n/                         # catálogo base pt-BR/en/es
```

Regras:

- **Feature-first** em `apps/<app>/src/app/features/`.
- `libs/core` contém a infraestrutura compartilhada de app (auth, sessão, contexto tenant/empresa/filial, interceptors, guards, erros).
- `libs/data` contém contratos e repositórios HTTP por domínio.
- `libs/uw-ui` contém apenas componentes genéricos e reutilizáveis: **não conhece domínio, auth ou HTTP**.
- Nada de regra de negócio em componente presentational.
- Shell, menu e rotas vivem no app, nunca em lib.
- Imports cruzados usam os aliases `@erp/*`; proibido caminho relativo atravessando `apps/` ou `libs/`.
- **Regra dos 3 consumidores:** código só sobe para `libs/` quando há dois consumidores reais (ou ADR justificando).
- **App não importa app.** Direção permitida: `tokens ← uw-ui`, `tokens ← core ← data ← apps/*`, `i18n ← apps/*`.

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

- Tenant + e-mail + senha no app `erp`; a equipe da plataforma usa e-mail + senha sem tenant no app `platform-admin`.
- Na fase 1 o tenant do ERP vem de um **campo no login** (o app roda em `erp.<dominio>`). Subdomínio por tenant (`<tenant>.erp.<dominio>`) é evolução futura (ADR-0011).
- Mensagens de erro genéricas para credenciais inválidas.
- Rate limit/lockout tratados com UX clara.

### 5.2 Sessão

- **Access token em memória** (signal/serviço), por app.
- **Refresh token em cookie HttpOnly/Secure/SameSite** com `Domain=.<dominio>` (ADR-0011).
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
erp.<dominio>                    # apps/erp
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

admin.<dominio>                  # apps/platform-admin
/platform/login
/platform/tenants
/platform/tenants/:id
/platform/plans
/platform/usage
/platform/audit
/platform/settings
/403
/404
/error
```

- `/app` usa o **shell do ERP** (`uw-admin-layout` + menu de módulos de ERP).
- `/platform` usa o **shell do Platform Admin** (mesmas primitivas de layout, menu e breadcrumb próprios).
- Rotas lazy-loaded.
- Menus derivados de permissões/features do backend, não hardcoded por usuário.
- Cada app tem sua própria página de 403/404/erro (destino de retorno é diferente).
- Guards: `authGuard`/`tenantGuard` no ERP; `authGuard` + `platformRoleGuard` no Platform Admin.
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
- **Projetos:** cada app e cada lib tem seu projeto de teste (`pnpm test:erp`, `pnpm test:platform`, `pnpm test:libs`).
- **Componentes:** Jest + TestBed (Angular Testing Library quando disponível).
- **E2E:** Playwright por app — `apps/erp/e2e` (porta 4200) e `apps/platform-admin/e2e` (porta 4201).
- **Visual:** Storybook único em `libs/uw-ui`.
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
- Um terceiro app no monorepo sem ADR e change própria.
- Microfrontends.
- Aplicativo mobile nativo.
- Billing/checkout.
- Módulos de ERP além do shell/home iniciais.
- Temas por tenant (fase futura).

---

## 12. Definition of Done

Uma change só está pronta quando:

- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` passam **por projeto afetado** (erp, platform-admin, libs).
- [ ] Testes unitários, de componente e E2E do fluxo no app afetado.
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
