# Project — Frontend Template

> **Status:** template de bootstrap. A especificação do produto é preenchida na
> primeira change de produto, na seção [Especificação do Frontend](#13-especificação-do-frontend).
>
> **Documento de referência:** [`docs/design/design-system.md`](../docs/design/design-system.md)
>
> **Repositório:** monorepo frontend-only — `apps/frontend` + `libs/*`.

---

## 1. Visão Geral

Template de frontend Angular para novos produtos. Fornece:

- workspace Angular multi-project;
- design system com tokens e documentação;
- biblioteca própria de componentes `uw-ui`;
- agentes, subagentes e skills de frontend;
- quality gates (lint, testes, Storybook, build, CI e Docker);
- constituição e workflow OpenSpec.

O template **não** define domínio, telas de negócio, autenticação ou contratos
de API. Essas decisões pertencem à change de produto.

---

## 2. Stack Tecnológica (Non-Negotiable)

| Camada | Tecnologia |
|---|---|
| Framework | **Angular 21+** (standalone components) |
| Workspace | **Angular CLI multi-project** — app + libs source-mapped |
| Linguagem | **TypeScript 5.9+**, `strict: true`, zero `any` em código novo |
| Estado | **Signals** + services (sem NgRx) |
| Estilo | **Tailwind CSS 4** + design tokens |
| Componentes | **`uw-ui`** (biblioteca própria, prefixo `uw-`) |
| Ícones | **Material Symbols** self-hosted |
| i18n | **`@ngx-translate/core`** (pt-BR default; en/es opcional) |
| Formulários | Reactive Forms + validators; Signal Forms quando estável |
| HTTP | `HttpClient` + interceptors + repositories |
| Testes | **Jest + `jest-preset-angular` + Playwright** |
| Documentação | **Storybook** em `libs/uw-ui` |
| Lint/format | **ESLint + Prettier** |
| Build | Angular CLI + Docker/nginx |

> **Proibido:** bibliotecas de UI de terceiros. Use `uw-ui` e os tokens do
> design system. `@angular/cdk` só é permitido encapsulado pela `uw-ui`.

---

## 3. Estrutura do Projeto

```text
apps/
└── frontend/                     # app padrão do template
    ├── src/app/
    │   ├── app.config.ts         # providers
    │   ├── app.routes.ts         # rotas
    │   ├── features/             # telas e funcionalidades
    │   ├── layout/               # shell e menu
    │   └── shared/               # componentes de página
    ├── src/environments/         # local, staging, production
    ├── src/styles.scss           # tokens + Tailwind + globais
    └── e2e/                      # Playwright

libs/
├── tokens/                       # tokens CSS + fontes
├── uw-ui/                        # componentes uw-* + Storybook
├── core/                         # auth, erros, HTTP, guards
├── data/                         # models e repositories
└── i18n/                         # catálogos pt-BR/en/es
```

### Regras

- Feature-first em `apps/frontend/src/app/features/`.
- `libs/core` contém infraestrutura (auth, sessão, erros, interceptors).
- `libs/data` contém models e repositories por domínio.
- `libs/uw-ui` é apresentação pura: não conhece domínio, auth, HTTP ou i18n.
- Shell, menu e rotas vivem no app, nunca em lib.
- Imports cruzados usam `@app/*`; proibido caminho relativo atravessando apps/libs.
- Regra dos três consumidores antes de promover código para `libs/`.
- App nunca importa app.
- Um segundo app exige ADR.

**Direção de dependência:**

```
tokens ← uw-ui ← apps/*
tokens ← core ← data ← apps/*
i18n   ← apps/*
```

---

## 4. Design System (Non-Negotiable)

Fonte da verdade: [`docs/design/design-system.md`](../docs/design/design-system.md)
e tokens em [`libs/tokens/src/styles/`](../libs/tokens/src/styles/).

- Tokens em 2 camadas: palette → semânticos.
- Tipografia: `--font-family-display`, `--font-family-body`, `--font-family-mono`.
- Raios: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`.
- Layout: sidebar 240px, conteúdo fluido, grid 12 colunas, ritmo 8px.
- Superfícies sólidas, bordas 1px, sem glassmorphism.
- Componentes `uw-*` com Storybook e estados default/hover/focus/disabled/loading/error.
- Proibido: cores hardcoded, raios fora dos tokens, bibliotecas de UI externas.
- Catálogo: [`docs/design/uw-ui-catalog.md`](../docs/design/uw-ui-catalog.md).

---

## 5. Arquitetura e Padrões

### Standalone + Signals

- Todos os componentes são `standalone: true`.
- `signal()`, `computed()`, `effect()` e `linkedSignal()` para estado.
- RxJS apenas para HTTP e streams assíncronos.
- Container vs Presentational: containers gerenciam estado; presentational recebem inputs/outputs.
- `OnPush` em componentes presentational.

### Repository Pattern

- Toda comunicação com API passa por um **Repository**.
- A URL vem de `environment.apiUrl` via `API_URL`.
- Repositories compartilhados ficam em `libs/data/src/lib/repositories/`.
- Nenhuma chamada HTTP direta em componentes ou services.

### Erros

- Interceptor global normaliza falhas em `AppError`.
- Erros exibidos ao usuário não contêm stack trace.
- Formato de erro concreto é definido na change de produto.

### Autenticação

- O template fornece apenas o esqueleto de sessão em `libs/core`.
- Estratégia de auth (JWT, cookie, OAuth) é definida na change de produto (ADR-0014).
- Nunca armazenar refresh token em `localStorage`/`sessionStorage`.

---

## 6. Rotas e Shell

```text
/                 → rota inicial de exemplo
/404              → página não encontrada
/**               → página não encontrada
```

- Rotas lazy-loaded.
- Shell do produto em `apps/frontend/src/app/layout/`.
- `uw-admin-layout` é presentational e recebe menu/usuário por inputs.
- Breadcrumb por rota.
- Páginas 403/404/erro definidas na change de produto.

---

## 7. i18n e Acessibilidade

### i18n

- pt-BR default; en/es opcional.
- `@ngx-translate/core` com catálogos em `libs/i18n`.
- Nenhuma string visível hardcoded.
- Datas/números/moeda por locale.
- Preferência persistida.

### Acessibilidade

- WCAG 2.1 AA.
- Navegação por teclado, foco visível, ordem lógica.
- `aria-*`, `role`, labels associados.
- Contraste mínimo 4.5:1.
- `prefers-reduced-motion`.
- Testes de teclado e foco nos fluxos críticos.

---

## 8. Testes e Qualidade

- **Unitários:** Jest + `jest-preset-angular` para services, repositories, guards e pipes.
- **Componentes:** TestBed + Jest.
- **E2E:** Playwright em `apps/frontend/e2e`.
- **Visual:** Storybook em `libs/uw-ui`.
- **Cobertura:** 80% `core`/`data`, 70% `features`, 100% `shared` pipes/diretivas.
- **Qualidade:** ESLint, Prettier, `tsc --noEmit`, zero `any` em código novo.
- **Performance:** lazy routes, OnPush, signals, `NgOptimizedImage`, budgets.

---

## 9. Segurança

- Sem segredos no frontend.
- Tokens conforme a change de produto.
- Sanitização de HTML (evitar `innerHTML` não confiável).
- CSP compatível com o build.
- Não logar PII/tokens.
- Dependências auditadas no CI.

---

## 10. Entrega

- Build de produção com Angular CLI.
- Docker multi-stage (Node 22 → nginx).
- nginx com fallback SPA, cache de assets e headers de segurança.
- Configuração de API por ambiente.
- CI com lint, typecheck, test, build e build do Storybook.

---

## 11. Agentes e Skills

O repositório inclui agentes em `.agents/` e o guia em
[`AGENTS.md`](../AGENTS.md). O fluxo padrão é:

1. `requirements` → levanta escopo.
2. `architect` → decide estrutura e ADRs.
3. `design` → prototipa a tela.
4. `frontend` → implementa.
5. `security` → revisa auth/dados sensíveis.
6. `testing` → cobre cada camada.

---

## 12. Workflow OpenSpec

- Schema: `intent-driven`.
- Sequência: `proposal → specs/design → adr → tasks → apply`.
- Artefatos em português brasileiro.
- Decisões arquiteturais em `adr/` (imutáveis; revisão via `Supersedes`).
- Definition of Done: lint, typecheck, test, build e Storybook verdes;
  acessibilidade, i18n e responsividade revisadas; `openspec validate --strict`.

---

## 13. Especificação do Frontend

> **Esta é a única seção específica de produto neste documento.**
> Preencha na primeira change de produto. Mantenha as demais seções genéricas.

- **Produto:** `<nome do produto>`
- **Domínio de negócio:** `<o que o produto faz>`
- **Público e perfis:** `<quem usa e quais permissões>`
- **Módulos e telas:** `<lista de módulos e telas>`
- **Identidade visual / marca:** `<marca, logo, cores>`
- **API e integrações:** `<base URL, autenticação, contratos>`
- **Idiomas:** `<pt-BR, en, es...>`
- **Requisitos regulatórios:** `<LGPD, acessibilidade, auditoria...>`
- **Segundo app (se houver):** `<app e ADR que o justifica>`

---

## 14. Referências

- [`docs/design/design-system.md`](../docs/design/design-system.md)
- [`docs/design/design-tokens.md`](../docs/design/design-tokens.md)
- [`docs/design/uw-ui-catalog.md`](../docs/design/uw-ui-catalog.md)
- [`docs/design/uw-ui-extending.md`](../docs/design/uw-ui-extending.md)
- [`docs/design/prototypes/README.md`](../docs/design/prototypes/README.md)
- [`docs/domain/README.md`](../docs/domain/README.md)
- [`adr/`](../adr/)
- [`AGENTS.md`](../AGENTS.md)

---

*Este arquivo é a constituição técnica do template. Produto, telas e regras de
domínio são definidos incrementalmente nas specs de cada change.*
