# 0010. Workspace multi-project com app único e aliases genéricos

- Status: accepted
- Date: 2026-11-22

## Context

O repositório passa a ser um template de bootstrap para diferentes produtos de frontend, não um ERP específico. O seed anterior assumia dois apps fixos (`erp` e `platform-admin`) e aliases `@erp/*`, o que acopla a base a um produto e a um modelo de negócio.

O Angular CLI oferece suporte nativo a workspaces multi-project, com builders, schematics e testes por projeto. O Nx adicionaria complexidade de grafo, cache e configuração que não se justifica no tamanho atual da base.

## Decision

Adotar **Angular CLI multi-project** (sem Nx), com:

- App padrão `apps/frontend`.
- Libs `libs/tokens`, `libs/uw-ui`, `libs/core`, `libs/data` e `libs/i18n`.
- Libs source-mapped e consumidas por aliases `@app/tokens`, `@app/uw-ui`, `@app/core`, `@app/data` e `@app/i18n`.
- Nome do produto e identidade visual definidos na primeira change de produto, não no template.
- Um segundo app exige ADR próprio que justifique a separação.

## Consequences

- **Positivo:** base neutra, reutilizável por qualquer produto Angular.
- **Positivo:** mantém o ecossistema oficial do Angular (build, testes, Storybook).
- **Positivo:** libs podem evoluir e ser testadas de forma independente.
- **Negativo:** workspaces multi-project exigem disciplina de configuração por projeto.
- **Negativo:** sem cache distribuído de build; pode ser reavaliado se o número de projetos crescer.

## Alternatives considered

- **Nx:** rejeitado por overhead de configuração e baixo ganho no bootstrap.
- **App único com pastas `shared/`:** rejeitado por não impor fronteiras de dependência nem permitir consumo por múltiplos produtos.
- **Manter `erp` e `platform-admin` fixos:** rejeitado por contradizer o objetivo de template genérico.
- **Aliases `@erp/*`:** rejeitados por acoplamento ao produto anterior.
