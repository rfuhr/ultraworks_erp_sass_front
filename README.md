# Front — Seed do Novo Frontend SaaS (Angular)

Esta pasta contém o **seed de criação** do novo frontend do ERP SaaS, em **Angular 21+**, reutilizando o design system, a estrutura de login/shell e a biblioteca `uw-ui` do projeto `congresso`.

> **Importante:** isto não é o frontend implementado. É a estrutura de processo (OpenSpec, agentes, skills, ADRs) e as changes para o OpenSpec executar.
>
> **Guia passo a passo:** [`START_FROM_ZERO.md`](START_FROM_ZERO.md).
>
> **Funcionalidades detalhadas:** [`FUNCIONALIDADES.md`](FUNCIONALIDADES.md) — o que implementar, em que fase, com telas, ações, APIs e critérios de aceite.
>
> **Gestão de clientes SaaS:** [`GESTAO-CLIENTES-SAAS.md`](GESTAO-CLIENTES-SAAS.md) — especificação da área Platform Admin (tenants, provisionamento, planos, quotas, ciclo de vida, suporte).

---

## O que há aqui

```text
front/
├── AGENTS.md                         # Orquestrador + subagentes + skills
├── README.md                         # Este arquivo
├── FUNCIONALIDADES.md                # O que implementar, por fase, telas e APIs
├── GESTAO-CLIENTES-SAAS.md           # Spec da área Platform Admin (tenants)
├── START_FROM_ZERO.md                # Guia: pasta nova, Git, cópia e implementação
├── adr/                              # 9 ADRs iniciais
├── docs/
│   ├── briefing-frontend-saas.md     # Briefing completo
│   ├── design-system.md              # Design system herdado/adaptado
│   ├── design-tokens/                # Tokens CSS de referência
│   ├── component-inventory.md        # Componentes a reutilizar/adaptar/criar
│   ├── login-and-shell.md            # Estrutura de login e layout principal
│   ├── api-contract.md               # Contrato com o backend Java
│   └── reuse-map.md                  # Caminhos de origem no congresso
├── openspec/
│   ├── project.md                    # Constituição técnica do frontend
│   ├── config.yaml                   # Config do schema intent-driven
│   ├── schemas/intent-driven/        # Schema/templates copiados do congresso
│   └── changes/                      # 7 changes iniciais
└── .agents/
    ├── README.md                     # Subagentes
    └── skills/                       # Skills copiadas/adaptadas
```

---

## Stack (non-negotiable)

| Área | Decisão |
|---|---|
| Framework | Angular 21+ (standalone components) |
| Linguagem | TypeScript 5.9+ `strict`, zero `any` |
| Estado | Signals + services (sem NgRx) |
| Estilo | Tailwind CSS 4 + design tokens |
| Componentes | Biblioteca própria `uw-ui` (prefixo `uw-`) |
| Ícones | Material Symbols |
| i18n | `@ngx-translate/core` (pt-BR default; en/es opcional) |
| Gráficos | `@swimlane/ngx-charts` |
| Testes | Jest + `jest-preset-angular` + Playwright |
| Documentação visual | Storybook |
| Lint/format | ESLint + Prettier |
| Build | Angular CLI + Docker/nginx |

> **Não usar:** bibliotecas de UI de terceiros (Material, PrimeNG, Bootstrap) diretamente. Use `uw-ui`.

---

## Roadmap de changes

> Todas as **7 changes** já estão criadas neste seed. A ordem abaixo é a de implementação.

| # | Change | Objetivo |
|---|---|---|
| 1 | `bootstrap-frontend` | Scaffold Angular, Tailwind, lint, testes, Storybook, CI, Docker/nginx |
| 2 | `design-system-foundation` | Tokens, tipografia, layout, tema, documentação |
| 3 | `component-library-core` | Componentes `uw-ui` essenciais + componentes ERP |
| 4 | `auth-login-flow` | Login, sessão, refresh, guards, tenant/empresa/filial, reset |
| 5 | `app-shell-home` | Layout principal, menu, rotas, home/dashboard, 403/404 |
| 6 | `api-integration` | Repositories, interceptors, erros RFC 7807, paginação |
| 7 | `i18n-accessibility` | pt-BR/en/es, acessibilidade, responsividade |

A ordem recomendada é a da tabela. Cada change deve ser implementada, validada e arquivada antes da próxima.

---

## Reuso do congresso

O que será aproveitado:

- **Design system** (`docs/design-system.md` + tokens CSS).
- **Login** (`features/login/auth/pages/login`).
- **Shell/layout** (`layout/root-layout.component.ts` + `shared/uw-ui/layout`).
- **Menu** (`core/services/menu-config`).
- **Biblioteca `uw-ui`** (`shared/uw-ui`).
- **Padrões de API/erros/interceptors** (`core/interceptors`, `core/repositories`).
- **Skills** de Angular, design system, `uw-ui`, testes, Storybook, OpenSpec.

Os caminhos exatos estão em [`docs/reuse-map.md`](docs/reuse-map.md).

---

## Adaptações obrigatórias em relação ao congresso

1. **Login**: o congresso usa perfil (`administrativo`/`participante`/`avaliador`) + organizador. O ERP SaaS usa **tenant + e-mail + senha**, com seleção posterior de empresa/filial.
2. **Auth**: o congresso usa cookie de sessão; o backend Java emite access token JWT + refresh. Definir a estratégia em `ADR-0004`.
3. **Menu**: o congresso é orientado a eventos; o ERP SaaS é orientado a módulos de ERP (cadastros, estoque, comercial, compras, agrícola, financeiro, fiscal).
4. **Design system**: manter tokens e padrões; adaptar narrativa de marca e exemplos.
5. **Sem monorepo**: não há `apps/packages/shared`; modelos e schemas ficam em `src/app/data` / `src/app/core`.

---

## Próximo passo

1. Copie o conteúdo de `front/` para um repositório novo.
2. Siga `START_FROM_ZERO.md`.
3. Implemente `bootstrap-frontend`.
4. Siga a ordem das changes.

Consulte [`docs/briefing-frontend-saas.md`](docs/briefing-frontend-saas.md) para o detalhamento.
