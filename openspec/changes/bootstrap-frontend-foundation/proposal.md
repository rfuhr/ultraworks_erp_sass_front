## Why

Dois frontends distintos vão consumir os mesmos componentes, o mesmo design system e o mesmo ferramental de agentes/skills. Hoje este repositório tem apenas o arcabouço OpenSpec amarrado a um único produto de ERP (`apps/erp`, `apps/platform-admin`, aliases `@erp/*`, backend em `back/`), sem agentes, sem design system e sem a biblioteca `uw-ui`. Sem uma base genérica e reutilizável, cada frontend nasceria duplicando componentes, tokens e regras — e o design system divergiria já no primeiro mês. É preciso montar essa fundação agora, antes de definir quais frontends serão construídos.

## What Changes

- **BREAKING** — Reescrever `openspec/project.md` como constituição **genérica** de frontend: stacks, limites de camadas, regras de design system, qualidade e DoD válidos para qualquer frontend do workspace (remove ERP, tenancy, `apps/erp`/`apps/platform-admin` e `back/` como premissas).
- **BREAKING** — Reescrever `openspec/config.yaml` com contexto e regras genéricos e corrigir a regra de `tasks` que hoje é ignorada pelo CLI (`Rules for 'tasks' must be an array of strings`).
- Fixar o workspace como **monorepo Angular CLI multi-project** (um repositório, um workspace, `apps/<frontend>` criados sob demanda, `libs/*` source-mapped).
- Portar do projeto `congresso` o ferramental de IA: subagentes de frontend (`frontend`, `design`) em `.agents/` e as skills de frontend/processo em `.agents/skills/`, **desacoplados do domínio UltraEventos**.
- Portar o **design system** como fonte única da verdade: `docs/design/design-system.md` + tokens CSS em camadas (palette → semânticos), e corrigir a divergência atual em que a skill `design-system` do congresso contradiz o documento (cores e raios diferentes).
- Portar a biblioteca **`uw-ui`** (~80 componentes standalone + diretivas + Storybook) para `libs/uw-ui`, ajustando imports de `@shared/uw-ui/*` para o alias de lib do workspace.
- Definir o esquema de aliases e a direção de dependência entre `tokens → uw-ui → core → data → apps/*`.
- Adicionar o tooling raiz do workspace (scripts por projeto, Jest, Playwright, Storybook, ESLint, Prettier, Tailwind 4 com `@source` para as libs).
- Criar o esqueleto de `libs/core`, `libs/data` e `libs/i18n` (contratos e estrutura, sem regra de negócio).
- Deixar `apps/` **vazio por decisão**: nenhum frontend de produto é criado nesta change.

### Decisão de workspace (monorepo)

Monorepo com Angular CLI multi-project, e não dois repositórios. Justificativa: `uw-ui`, tokens e skills são compartilhados por definição; um monorepo permite refactor atômico nos dois consumidores, um único Storybook, um único lockfile e CI com pipeline por projeto afetado. Dois repositórios exigiriam versionar/publicar `uw-ui` e sincronizar tokens manualmente — exatamente o mecanismo que produz drift visual. Alternativas descartadas: (a) dois repositórios com pacote versionado; (b) monorepo pnpm workspaces + turbo (mais camadas de tooling do que o necessário para dois apps sem releases independentes).

## Escopo

- **Apps:** nenhum app de produto nesta change — apenas o workspace e a criação futura de `apps/<frontend>`
- **Libs:** `tokens`, `uw-ui`, `core`, `data`, `i18n` (as três últimas apenas como esqueleto/contrato)
- **Capabilities:** `workspace-bootstrap`, `agent-tooling`, `design-system-foundation`, `uw-ui-library`, `frontend-governance`

## Capabilities

### New Capabilities

- `workspace-bootstrap`: estrutura do monorepo, projetos Angular, aliases, limites de camada, scripts raiz, tooling de build/teste e o fluxo para adicionar um novo frontend em `apps/`.
- `agent-tooling`: disponibilidade, escopo e wiring dos subagentes e skills de frontend portados do congresso, incluindo quais skills cada agente carrega e a regra de que nenhum artefato referencia domínio de UltraEventos.
- `design-system-foundation`: tokens em duas camadas, tipografia, raios, layout e regras invioláveis; documento canônico e forma de evolução de tokens/componentes.
- `uw-ui-library`: contrato de consumo da biblioteca (standalone, prefixo `uw-`, sem domínio/auth/HTTP), inventário de componentes, exigência de Storybook e política de alteração de componente compartilhado.
- `frontend-governance`: regras que todo frontend do workspace deve cumprir — constituição `project.md`, regras do `config.yaml`, DoD, i18n, acessibilidade WCAG 2.1 AA e a regra dos três consumidores antes de promover código para `libs/`.

### Modified Capabilities

- Nenhuma. Não existe `openspec/specs/` com capabilities vigentes neste repositório; toda a base é nova.

## Impact

- **Arquivos:** `openspec/project.md`, `openspec/config.yaml` (reescritos); `.agents/**`, `.agents/skills/**`, `docs/design/**`, `libs/{tokens,uw-ui,core,data,i18n}/**`, `angular.json`, `package.json`, `tsconfig*.json`, `eslint.config.js`, `jest.config.ts`, `playwright.config.ts`, `.storybook/**` (novos).
- **Dependências:** Angular 21.x, TypeScript 5.9, Tailwind 4, `@angular/cdk`, `@ngx-translate/core`, `@swimlane/ngx-charts`, Storybook 9, Jest 30 + `jest-preset-angular`, Playwright, ESLint + Prettier. Sem biblioteca de UI de terceiros.
- **APIs/backend:** nenhuma. A change não consome endpoints; os contratos HTTP ficam para as changes de cada frontend.
- **Auth/tenancy:** não afetados nesta change. A constituição genérica define apenas o padrão-alvo (access token em memória, refresh em cookie HttpOnly) a ser implementado por frontend.
- **i18n:** estrutura de `libs/i18n` e a regra "nenhuma string visível hardcoded" entram na fundação; catálogos de produto ficam para depois.
- **Acessibilidade:** WCAG 2.1 AA passa a ser requisito de DoD para todo componente `uw-ui` portado ou criado.
- **Risco principal:** o port trouxe ~80 componentes e um design system já evoluído no congresso; a divergência entre skill e documento precisa ser resolvida na fundação para não propagar valores errados para os dois frontends.

## Non-goals

- Criar `apps/erp`, `apps/platform-admin` ou qualquer frontend de produto.
- Modelar domínio, telas, rotas ou contratos de API de produto.
- Portar backend, banco, observabilidade ou skills de backend/database.
- Portar protótipos e telas específicas do UltraEventos (`docs/design/prototypes/`).
- Publicar `uw-ui` em registry privado ou configurar releases independentes por app.
- Temas por tenant, microfrontends ou app mobile nativo.
- Migrar dados, histórico de git ou o pipeline de CI do projeto congresso.
