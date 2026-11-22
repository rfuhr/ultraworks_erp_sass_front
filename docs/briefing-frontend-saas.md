# Briefing — Novo Frontend SaaS (Angular)

> **Como usar:** este é o documento de contexto do frontend. Ele complementa `openspec/project.md` e as changes. O backend Java está em `back/`.

---

## 1. Contexto

O novo ERP SaaS terá um frontend SPA em **Angular 21+**, separado do backend Java. O objetivo é reutilizar do projeto `congresso`:

- o **design system** (tokens, tipografia, layout, padrões visuais);
- a **estrutura de login**;
- a **estrutura da página principal/shell**;
- a **biblioteca de componentes `uw-ui`**;
- o **processo** (OpenSpec, agentes, skills, ADRs, Storybook, testes).

O que **não** será reaproveitado:

- regras de negócio de eventos/congressos;
- features específicas (`eventos`, `inscrições`, `certificados`, `avaliador`, `participante`);
- modelos e contratos do domínio de eventos;
- backend NestJS/Drizzle do congresso.

---

## 2. Objetivos

- Login multi-tenant (tenant + e-mail + senha) com seleção de empresa/filial.
- Shell administrativo com sidebar, header, breadcrumb e menu por permissões.
- Home/dashboard inicial com indicadores e atalhos.
- Biblioteca `uw-ui` consistente e documentada no Storybook.
- Design system aplicado (tokens, tipografia, espaçamento, bordas).
- Integração com a API Java (`/api/v1`) com erros RFC 7807.
- Acessibilidade WCAG 2.1 AA e i18n pt-BR/en/es.
- Testes unitários, de componente e E2E.

---

## 3. Stack

| Área | Decisão |
|---|---|
| Framework | Angular 21+ standalone |
| Linguagem | TypeScript 5.9+ strict |
| Estado | Signals + services (sem NgRx) |
| Estilo | Tailwind CSS 4 + tokens |
| Componentes | `uw-ui` (própria) |
| Ícones | Material Symbols |
| i18n | `@ngx-translate/core` |
| Gráficos | `@swimlane/ngx-charts` |
| Testes | Jest + `jest-preset-angular` + Playwright |
| Documentação | Storybook |
| Lint | ESLint + Prettier |
| Build/deploy | Angular CLI + Docker/nginx |

---

## 4. Estrutura

```text
src/app/
├── config/          # providers, i18n, environment
├── core/            # guards, interceptors, models, repositories, services
├── data/            # models e repositories por feature
├── features/        # auth/login, home, módulos do ERP
├── layout/          # root layout/shell
└── shared/
    ├── components/  # compartilhados não-uw-ui
    └── uw-ui/       # biblioteca própria
```

Sem monorepo. Sem `apps/packages/shared`. Contratos ficam em `data/models`/`core/models`.

---

## 5. Design system

Fonte da verdade:

- `docs/design-system.md`
- `docs/design-tokens/` (`palette.css`, `colors.css`, `typography.css`, `borders.css`, `theme.css`)

Características:

- **Modern Corporate**, inspirado em Stripe/GitHub.
- Tokens em 2 camadas (palette → semânticos).
- Tipografia tri-font (display/body/mono).
- Sidebar fixa de 240px, conteúdo fluido, grid 12 colunas, ritmo 8px.
- Superfícies sólidas, bordas 1px, sem glassmorphism.
- Componentes `uw-*` com Storybook.
- Proibido: cores hardcoded, bibliotecas de UI de terceiros, raios fora dos tokens.

---

## 6. Login

### 6.1 Estrutura visual reaproveitada

Do congresso:

- card centralizado;
- logo e subtítulo;
- formulário com labels, erros inline, botão primário;
- estados de loading/erro;
- layout responsivo.

### 6.2 Adaptação para ERP SaaS

- Campos: **tenant** (slug/subdomínio), **e-mail**, **senha**.
- “Lembrar tenant” (persistir slug, nunca senha).
- “Esqueci minha senha”.
- Erros genéricos para credenciais inválidas.
- Tratamento de tenant suspenso, lockout (429/423), rede.
- Após login:
  - se houver uma única empresa/filial → ir para `/app/home`;
  - se houver múltiplas → abrir seletor de contexto;
  - se não houver membership ativo → mensagem de acesso negado.

### 6.3 Sessão

- Access token em memória (signal).
- Refresh token em cookie HttpOnly/Secure/SameSite (contrato alvo).
- Refresh automático em 401 com fila.
- Logout limpa sessão/contexto/cache.
- Nunca usar `localStorage` para refresh token.

---

## 7. Shell e página principal

### 7.1 Shell

Reaproveitar:

- `shared/uw-ui/layout` (admin layout, header, sidebar, subheader/breadcrumb);
- `layout/root-layout.component.ts`;
- `core/services/menu-config`.

Adaptar:

- menu por módulos de ERP: Dashboard, Cadastros, Estoque, Comercial, Compras, Agrícola, Financeiro, Fiscal, Configurações, Administração.
- menu derivado de permissões/features do backend.
- seletor de empresa/filial no header.
- perfil: configurações, plano/assinatura, sair.
- notificações (opcional na fase 1).

### 7.2 Home

- stat cards (indicadores do tenant);
- gráficos (ngx-charts);
- atividades recentes;
- atalhos para módulos;
- estados de loading/empty/error.

### 7.3 Rotas

```text
/auth/login
/auth/forgot-password
/auth/reset-password
/app/home
/app/<modulo>/<feature>
/403
/404
/error
```

Rotas lazy-loaded; `/app` protegido por `authGuard` + `tenantGuard`.

---

## 8. Componentes

Reutilizar do congresso (ver `docs/component-inventory.md`):

- Form: button, input, select, checkbox, textarea, radio, date-picker, file-upload, search-field, form-field, input-tag, autocomplete, pick-list, otp-input, slider, rating, toggle, toggle-card.
- Data: table, card, stat-card, avatar, avatar-group, pagination, progress-bar, progress-track, chart-card, chart-legend, timeline, section-heading.
- Navigation: tabs, stepper, accordion, breadcrumb, filter-pills.
- Feedback: alert, toast, spinner, skeleton, confirmation, empty-state.
- Layout: admin-layout, header, sidebar, subheader, page-header, panel, modal, drawer, divider.
- Utility: icon, tag, chip, badge, tooltip, copy-field, export-menu, language-switcher.

Criar/adaptar para ERP:

- `uw-tenant-switcher`
- `uw-company-switcher` (empresa/filial)
- `uw-context-badge`
- `uw-plan-badge`
- `uw-quota-meter`
- `uw-feature-gate`
- `uw-confirm-dialog` (se necessário)
- `uw-data-table` (se a tabela atual não atender)

---

## 9. API e erros

- Base `/api/v1`, `environment.apiUrl`.
- Headers: `Authorization`, `X-Tenant-Id`, `X-Empresa-Id`, `X-Empresa-Filial-Id`.
- Erros RFC 7807 (`type`, `title`, `status`, `detail`, `instance`, `traceId`, `errors[]`).
- 401 → refresh; 403 → acesso negado; 404 → não encontrado; 422 → erros de campo; 429 → `Retry-After`; 500 → página de erro com `traceId`.
- Paginação `page`/`pageSize`, ordenação e filtros explícitos.
- Repositories por feature; services com signals.

Detalhes em `docs/api-contract.md`.

---

## 10. i18n e acessibilidade

- pt-BR default; en/es opcional.
- Nenhuma string visível hardcoded.
- Datas/números/moeda por locale.
- WCAG 2.1 AA: teclado, foco visível, aria, contraste, `prefers-reduced-motion`.
- Testes de teclado e leitor de tela nos fluxos críticos.

---

## 11. Testes

- Unitários: Jest + `jest-preset-angular`.
- Componentes: TestBed (Angular Testing Library quando disponível).
- E2E: Playwright.
- Visual: Storybook.
- Cobertura: 80% `core`/`data`, 70% `features`, 100% `shared` pipes/directives.

---

## 12. Changes iniciais

| # | Change | Objetivo |
|---|---|---|
| 1 | `bootstrap-frontend` | Scaffold, Tailwind, lint, testes, Storybook, CI, Docker |
| 2 | `design-system-foundation` | Tokens, tipografia, layout, tema, docs |
| 3 | `component-library-core` | Componentes `uw-ui` essenciais + ERP |
| 4 | `auth-login-flow` | Login, sessão, guards, contexto, reset |
| 5 | `app-shell-home` | Shell, menu, rotas, home, 403/404 |
| 6 | `api-integration` | Repositories, interceptors, erros, paginação |
| 7 | `i18n-accessibility` | pt-BR/en/es, a11y, responsividade |

---

## 13. Critérios de aceite da fase 1

- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` passam.
- [ ] Login com tenant/e-mail/senha funciona; refresh e logout funcionam.
- [ ] Seleção de empresa/filial funciona.
- [ ] Shell com sidebar/header/breadcrumb renderiza.
- [ ] Home com stat cards/gráficos/atividades.
- [ ] 403/404/erro tratados.
- [ ] Componentes `uw-ui` documentados no Storybook.
- [ ] Acessibilidade revisada.
- [ ] i18n aplicado.
- [ ] CI verde.

---

## 14. Fora de escopo

- Backend.
- Monorepo.
- Microfrontends.
- Mobile nativo.
- Billing/checkout.
- Módulos de ERP além de shell/home na fase 1.
- Temas por tenant (fase futura).
