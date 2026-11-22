# Reuse Map — Congresso → ERP SaaS Frontend

Fonte: `C:\Rodrigo\Projetos\congresso\apps\frontend`.
Destino: novo repositório `frontend/`.

Legenda: **Copiar** (pode copiar e adaptar), **Referenciar** (usar como referência, sem copiar), **Não usar**.

---

## 1. Design system

| Origem | Destino | Ação |
|---|---|---|
| `docs/design/design-system.md` | `docs/design-system.md` | Copiar + adaptar narrativa |
| `src/styles/tokens/palette.css` | `src/styles/tokens/palette.css` | Copiar |
| `src/styles/tokens/colors.css` | `src/styles/tokens/colors.css` | Copiar |
| `src/styles/tokens/typography.css` | `src/styles/tokens/typography.css` | Copiar |
| `src/styles/tokens/borders.css` | `src/styles/tokens/borders.css` | Copiar |
| `src/styles/theme.css` | `src/styles/theme.css` | Copiar + revisar aliases |
| `docs/design/images/*` | `src/assets/brand/*` | Adaptar marca |

---

## 2. Login

| Origem | Destino | Ação |
|---|---|---|
| `src/app/features/login/auth/pages/login/login-page.component.ts` | `src/app/features/auth/login/login-page.component.ts` | Copiar + adaptar |
| `src/app/features/login/auth/pages/login/login-page.component.html` | idem `.html` | Copiar + adaptar |
| `src/app/features/login/auth/pages/login/login-page.component.spec.ts` | idem `.spec.ts` | Copiar + adaptar |
| `src/app/shared/components/ui-card.component.ts` | `src/app/shared/uw-ui/card/` | Migrar para `uw-card` |
| `src/app/core/services/auth/auth.service.ts` | `src/app/core/services/auth/auth.service.ts` | Reescrever para JWT/tenant |
| `src/app/core/repositories/auth/auth.repository.ts` | `src/app/data/repositories/auth/` | Adaptar contrato |
| `src/app/core/guards/auth.guard.ts` | `src/app/core/guards/` | Copiar + adaptar |
| `src/app/core/guards/role.guard.ts` | `src/app/core/guards/` | Copiar + adaptar para permissions |

> O login do congresso usa perfil + organizador; o ERP usa tenant + e-mail + senha. Ver `docs/login-and-shell.md`.

---

## 3. Shell / layout / menu

| Origem | Destino | Ação |
|---|---|---|
| `src/app/layout/root-layout.component.ts` | `src/app/layout/root-layout.component.ts` | Copiar + adaptar |
| `src/app/shared/uw-ui/layout/**` | `src/app/shared/uw-ui/layout/**` | Copiar |
| `src/app/core/services/menu-config/menu-config.service.ts` | `src/app/core/services/menu-config/` | Reescrever menu ERP |
| `src/app/core/services/sidebar-state/sidebar-state.service.ts` | `src/app/core/services/sidebar-state/` | Copiar |
| `src/app/shared/uw-ui/page-header/**` | `src/app/shared/uw-ui/page-header/**` | Copiar |
| `src/app/shared/uw-ui/layout/subheader/**` | idem | Copiar (breadcrumb) |
| `src/app/core/models/portal.model.ts` | `src/app/core/models/nav.model.ts` | Adaptar `NavItem` |

---

## 4. Componentes `uw-ui`

| Origem | Destino | Ação |
|---|---|---|
| `src/app/shared/uw-ui/**` | `src/app/shared/uw-ui/**` | Copiar seletivamente (ver `component-inventory.md`) |
| `src/app/shared/components/**` | `src/app/shared/components/**` | Avaliar caso a caso |
| `src/app/shared/uw-ui/help/**` | `src/app/shared/uw-ui/help/**` | Copiar (ajuda contextual) |
| `src/app/shared/uw-ui/table/**` | `src/app/shared/uw-ui/table/**` | Copiar |
| `src/app/shared/uw-ui/button/**` | `src/app/shared/uw-ui/button/**` | Copiar |
| `src/app/shared/uw-ui/input/**` | `src/app/shared/uw-ui/input/**` | Copiar |
| `src/app/shared/uw-ui/select/**` | `src/app/shared/uw-ui/select/**` | Copiar |
| `src/app/shared/uw-ui/modal/**` | `src/app/shared/uw-ui/modal/**` | Copiar |
| `src/app/shared/uw-ui/toast/**` | `src/app/shared/uw-ui/toast/**` | Copiar |

> Não copiar componentes específicos de eventos: `event-context`, `certificate-layout-preview`, `doc-viewer` (avaliar), `scheduler` (avaliar), `score-badge` (avaliar).

---

## 5. Core / HTTP / erros

| Origem | Destino | Ação |
|---|---|---|
| `src/app/core/interceptors/auth.interceptor.ts` | `src/app/core/interceptors/auth.interceptor.ts` | Reescrever para Bearer + refresh |
| `src/app/core/interceptors/error.interceptor.ts` | `src/app/core/interceptors/error.interceptor.ts` | Adaptar RFC 7807 |
| `src/app/core/interceptors/no-cache.interceptor.ts` | idem | Copiar |
| `src/app/core/services/session/session.service.ts` | `src/app/core/services/session/` | Adaptar |
| `src/app/core/services/notification/notification.service.ts` | `src/app/core/services/notification/` | Copiar |
| `src/app/core/services/dialog/dialog.service.ts` | `src/app/core/services/dialog/` | Copiar |
| `src/app/core/models/lazy-params.models.ts` | `src/app/core/models/lazy-params.model.ts` | Copiar/adaptar |
| `src/app/core/services/error-monitoring/error-monitoring.service.ts` | `src/app/core/services/error-monitoring/` | Adaptar (web-vitals) |

---

## 6. Config / build / testes

| Origem | Destino | Ação |
|---|---|---|
| `apps/frontend/angular.json` | `angular.json` | Referenciar/adaptar |
| `apps/frontend/package.json` | `package.json` | Referenciar versões |
| `apps/frontend/tsconfig.json` | `tsconfig.json` | Copiar paths adaptados |
| `apps/frontend/eslint.config.js` | `eslint.config.js` | Copiar |
| `apps/frontend/jest.config.ts` | `jest.config.ts` | Copiar |
| `apps/frontend/setup-jest.ts` | `setup-jest.ts` | Copiar |
| `apps/frontend/playwright.config.ts` | `playwright.config.ts` | Copiar |
| `apps/frontend/proxy.conf.js` | `proxy.conf.js` | Adaptar URL do backend |
| `apps/frontend/src/app/app.config.ts` | `src/app/config/app.config.ts` | Adaptar providers |
| `apps/frontend/src/app/app.routes.ts` | `src/app/app.routes.ts` | Reescrever rotas ERP |

---

## 7. Skills

Copiadas para `front/.agents/skills/`:

- `angular-developer`
- `design-system` (adaptada)
- `uw-ui-usage` (adaptada)
- `testing-patterns`
- `testing-patterns-angular`
- `contextual-help`
- `stitch-prototyping`
- `gherkin-authoring`
- `requirements-documentation`
- `grill-me`
- `architectural-decision-records`
- `c4-diagrams`
- `openspec-git-discipline`
- `naming-conventions`
- `error-handling`
- `webapp-testing`

Não copiadas:

- `frontend-design` (conflita com o design system: evita Inter/roxo; o design system usa essa base).
- Skills de backend/database.
- Skills específicas de eventos.

---

## 8. O que NÃO trazer

- `features/administrativo/**` (eventos, inscrições, certificados).
- `features/participante/**`.
- `features/avaliador/**`.
- `features/publico/**`.
- `features/notificacoes/**` (avaliar; notificações ERP são diferentes).
- Modelos e serviços de eventos.
- Rotas/menus de eventos.
- `apps/packages/shared` (não há monorepo).

---

## 9. Checklist de adaptação

- [ ] Trocar “UltraEventos” pela marca do ERP.
- [ ] Trocar login de perfil/organizador por tenant/e-mail/senha.
- [ ] Trocar cookie de sessão por access token em memória + refresh HttpOnly.
- [ ] Trocar menu de eventos por módulos de ERP.
- [ ] Criar seletor de empresa/filial.
- [ ] Adaptar erros para RFC 7807 do backend Java.
- [ ] Remover features de eventos.
- [ ] Revisar design system para a marca do ERP.
- [ ] Atualizar Storybook e testes.
