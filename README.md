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

A aplicação fica disponível em `http://localhost:4200` e abre a home autenticada
do shell de demonstração. A rota inicial redireciona para o login quando não há
sessão.

Credenciais de demonstração (dados mockados, sessão em memória):

- E-mail: `demo@frontend.dev`
- Senha: `demo1234`

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

## Base para novos projetos

O desenvolvimento continua neste repositório, na `master`. Para iniciar um projeto novo a partir
da fundação **congelada**, use o repositório-template:

- **Template:** [`rfuhr/ultraworks_erp_saas_front_base`](https://github.com/rfuhr/ultraworks_erp_saas_front_base) (privado)
- No GitHub: **Use this template → Create a new repository**. O projeto nasce com um commit único,
  sem histórico e sem vínculo de fork com este repositório.
- Tags de snapshot: `v0.1-base`, `v0.2-base`, ... — a mais recente é a base vigente
  (`git tag -l "v*-base" --sort=-v:refname`).

O snapshot **não acompanha** a `master`: mudanças futuras aqui não entram nos projetos criados a
partir dele.

### Atualizar o snapshot

A promoção de uma nova visão é feita **a partir deste repositório de trabalho**. O clone já tem os
dois remotes:

| Remote | Repositório | Papel |
|---|---|---|
| `origin` | `rfuhr/ultraworks_erp_sass_front` | desenvolvimento |
| `base` | `rfuhr/ultraworks_erp_saas_front_base` | snapshot/template |

```powershell
# 1. busque o estado mais recente do desenvolvimento
git fetch origin

# 2. mova o snapshot para o commit atual de origin/master
git push base origin/master:master

# 3. marque o novo marco
git tag -a v0.2-base -m "Snapshot v0.2 da fundacao frontend"
git push origin v0.2-base
git push base v0.2-base

# 4. confirme que os dois lados apontam para o mesmo commit
git rev-parse origin/master
git ls-remote base refs/heads/master
```

Alternativa trabalhando na `master` local:

```powershell
git checkout master
git pull origin master
git push base master
```

Projetos **já criados** a partir do snapshot não mudam; apenas os criados **depois** do push nascem
com o novo estado. A tag anterior (`v0.1-base`) continua apontando para o commit antigo.

Se a `master` foi reescrita (rebase/amend/force), o push é rejeitado e o snapshot precisa ser
sobrescrito explicitamente:

```powershell
git fetch base
git push --force-with-lease base master
```

Rollback de uma promoção por engano:

```powershell
git rev-parse v0.1-base   # SHA de destino (ou a tag que quiser restaurar)
git push --force-with-lease base <SHA>:master
```

> Projetos já gerados com o estado novo não são afetados pelo rollback.
> Nunca faça o caminho inverso (`base` → `origin`): o snapshot é somente destino.

## Próximos passos

1. Preencha a seção **Especificação do Frontend** em `openspec/project.md`.
2. Crie o documento de domínio em `docs/domain/domain.md`.
3. Rode `/opsx-propose` para a primeira feature do produto.
4. Crie o protótipo da tela antes de implementar.
