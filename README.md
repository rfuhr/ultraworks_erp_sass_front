# Frontend Template

Template de bootstrap para aplicações frontend Angular, derivado do projeto de
referência `congresso` (commit `1ab9594`, 2026-11-18).

O objetivo é começar um novo produto com workspace, design system, biblioteca
`uw-ui`, agentes, skills e quality gates já configurados. A especificação do
produto é preenchida na primeira change, em
[`openspec/project.md`](./openspec/project.md#13-especificação-do-frontend).

## Pré-requisitos

- Node.js 24+
- pnpm 11+
- Docker (opcional, para build da imagem)

## Começando

```bash
pnpm install
pnpm start
```

A aplicação fica disponível em `http://localhost:4200` e exibe a rota inicial
de exemplo com os estados de loading, empty, error e success.

## Scripts

| Comando | Descrição |
|---|---|
| `pnpm start` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm test` | Testes unitários e de componente (Jest) |
| `pnpm test:coverage` | Testes com cobertura |
| `pnpm lint` | ESLint em apps e libs |
| `pnpm typecheck` | Verificação de tipos |
| `pnpm e2e` | Playwright |
| `pnpm storybook` | Storybook em `http://localhost:6006` |
| `pnpm build-storybook` | Build estático do Storybook |

## Estrutura

```text
apps/frontend/          # app padrão
libs/tokens/            # tokens CSS e fontes
libs/uw-ui/             # componentes uw-* + Storybook
libs/core/              # auth, erros, HTTP, guards
libs/data/              # models e repositories
libs/i18n/              # catálogos pt-BR/en/es
docs/design/            # design system, tokens, catálogo e protótipos
docs/domain/            # domínio do produto (a preencher)
openspec/               # constituição e workflow
adr/                    # decisões arquiteturais
.agents/                # agentes, subagentes e skills
```

## Design system

- Documentação: [`docs/design/design-system.md`](./docs/design/design-system.md)
- Tokens: [`docs/design/design-tokens.md`](./docs/design/design-tokens.md)
- Catálogo de componentes: [`docs/design/uw-ui-catalog.md`](./docs/design/uw-ui-catalog.md)
- Extensões opt-in: [`docs/design/uw-ui-extending.md`](./docs/design/uw-ui-extending.md)

## Agentes

O guia de orquestração está em [`AGENTS.md`](./AGENTS.md). O fluxo padrão é
`requirements → architect → design → frontend → security → testing`.

## OpenSpec

```bash
openspec status --change <change>
openspec validate <change> --strict
```

Decisões arquiteturais vivem em [`adr/`](./adr/) e são imutáveis. Uma decisão
revista gera um novo ADR com `Supersedes`.

## Docker

```bash
docker build -t frontend-template .
docker run --rm -p 8080:80 frontend-template
```

O container serve a SPA com fallback para `index.html` e headers de segurança.

## Próximos passos

1. Preencha a seção **Especificação do Frontend** em `openspec/project.md`.
2. Crie o documento de domínio em `docs/domain/domain.md`.
3. Rode `/opsx-propose` para a primeira feature do produto.
4. Crie o protótipo da tela antes de implementar.
