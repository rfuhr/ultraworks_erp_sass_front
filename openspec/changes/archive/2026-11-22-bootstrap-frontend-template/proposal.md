## Why

Este repositório está sendo reiniciado como um **bootstrap genérico de frontend Angular**, reutilizável como base para projetos futuros. Hoje `openspec/project.md` e `openspec/config.yaml` descrevem um ERP específico e referenciam documentos que não existem; não há agentes, skills, design system nem biblioteca `uw-ui`. Sem uma base única, cada novo projeto recriaria padrões e divergiria do design system já validado no projeto `congresso`.

## What Changes

- **BREAKING** Substituir a constituição ERP-específica (`openspec/project.md` e `openspec/config.yaml`) por versões genéricas, com uma seção **“Especificação do Frontend”** reservada para preenchimento na primeira change de produto.
- Criar o workspace Angular CLI multi-project com app padrão (`apps/frontend`) e libs `tokens`, `uw-ui`, `core`, `data` e `i18n`, incluindo aliases, ambientes, rota inicial e página 404.
- Importar do `congresso` a documentação do design system e os tokens visuais (palette → semânticos, tipografia, bordas e theme).
- Portar a biblioteca `uw-ui` com triagem explícita: entram os componentes genéricos; ficam fora os componentes de domínio do congresso (evento, certificado, pagamento, notificações, scheduler). Onde a documentação divergir do código, **o código e as telas/protótipos em `docs/design/prototypes/` prevalecem**.
- Importar para `.agents/` os agentes/subagentes de frontend (`frontend`, `design`, `testing`, `security`, `requirements`, `architect`) e as skills correlatas, com um placeholder de domínio no lugar de `event-domain`.
- Criar `AGENTS.md` com a regra de delegação e o fluxo obrigatório **design → frontend**.
- Configurar a base de qualidade: ESLint, Prettier, Jest, Playwright, Storybook, CI e Docker/nginx.
- Estabelecer baseline de i18n (pt-BR padrão, en/es opcional) e acessibilidade (WCAG 2.1 AA), sem conteúdo de produto.
- Remover `erp` e `platform-admin` como apps fixos; a criação de um segundo app passa a exigir ADR.

## Escopo

- **Apps:** `apps/frontend` (novo app padrão do template). `erp` e `platform-admin` deixam de existir como apps fixos.
- **Libs:** `tokens`, `uw-ui`, `core`, `data`, `i18n`.
- **Capabilities:** `bootstrap-workspace`, `design-system-foundation`, `uw-ui-library`, `agent-toolkit`, `project-constitution`, `frontend-quality-gates`.

## Capabilities

### New Capabilities

- `bootstrap-workspace`: workspace Angular multi-project executável, com app padrão, libs, aliases, ambientes, rota inicial e 404.
- `design-system-foundation`: tokens em duas camadas, tipografia, bordas, theme, layout e documentação do design system.
- `uw-ui-library`: biblioteca própria `uw-*` com componentes genéricos, catálogo, Storybook, testes e regra de componentização.
- `agent-toolkit`: agentes, subagentes, skills de frontend e regras de delegação disponíveis em `.agents/` e `AGENTS.md`.
- `project-constitution`: constituição genérica do template (`project.md` + `config.yaml`) com a seção aberta de especificação do frontend.
- `frontend-quality-gates`: lint, typecheck, testes, cobertura, acessibilidade, i18n, build e entrega contínua.

### Modified Capabilities

Nenhuma — `openspec/specs/` está vazio; esta change define a base inicial do template.

## Non-goals

- Telas de produto, login real, shell/menu de negócio.
- Backend, contratos de API reais, autenticação e multi-tenancy de produto.
- Componentes de domínio do congresso e componentes específicos de ERP.
- Segundo app, microfrontends, temas por tenant e dark mode.
- Deploy em infraestrutura real.

## Decisões em aberto (resolver no design)

- **Nome do app padrão:** `apps/frontend` (recomendado) vs. `apps/web`.
- **Abrangência da `uw-ui`:** portar todos os componentes genéricos (recomendado, com spec e story) vs. subconjunto inicial.
- **Profundidade de `libs/core` e `libs/data`:** esqueleto com contratos e placeholders (recomendado) vs. implementação de auth/HTTP já na base.

## Impact

- **Arquivos:** `package.json`, `angular.json`, `tsconfig*.json`, configs de ESLint/Prettier/Jest/Playwright/Storybook, `Dockerfile`, `nginx.conf`, workflow de CI.
- **Diretórios:** `apps/frontend/`, `libs/{tokens,uw-ui,core,data,i18n}/`, `.agents/`, `docs/design/`, `adr/`.
- **Docs:** `openspec/project.md`, `openspec/config.yaml`, `AGENTS.md`, `docs/design/design-system.md`, `docs/design-tokens/`.
- **Dependências:** Angular 21+, Tailwind CSS 4, Jest, Playwright, Storybook, ESLint, Prettier.
- **Auth/tenancy:** não implementa — apenas deixa estrutura e contratos. **i18n/acessibilidade:** baseline definido. **API:** nenhum endpoint consumido.
- **Sem mudança de contrato de API.**
