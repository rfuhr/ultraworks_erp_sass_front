# 0007. Estratégia de testes do frontend

- Status: accepted
- Date: 2026-11-20

## Context

O congresso usa Jest + `jest-preset-angular`, Playwright e Storybook. O ERP precisa cobrir fluxos críticos (login, shell, CRUD) e componentes visuais, sem testes frágeis.

## Decision

Adotar:

- **Unitários:** Jest + `jest-preset-angular` para services, repositories, guards e pipes.
- **Componentes:** TestBed + Jest; Angular Testing Library quando disponível.
- **E2E:** Playwright para login, shell, CRUD e fluxos críticos.
- **Visual:** Storybook para componentes `uw-ui`.
- **Cobertura:** 80% em `core/` e `data/`, 70% em `features/`, 100% em `shared/` pipes/directives.
- **Mock HTTP:** `HttpTestingController`.
- **Acessibilidade:** testes de teclado/foco nos fluxos críticos.

## Consequences

- **Positivo:** cobertura por camada e confiança em refatorações.
- **Positivo:** Storybook documenta estados visuais.
- **Negativo:** E2E é mais lento; rodar em pipeline separado.
- **Negativo:** exige manutenção de mocks e stories.

## Alternatives considered

- **Karma/Jasmine:** rejeitado por padrão legado e lentidão.
- **Cypress:** viável, mas Playwright já é usado no congresso.
- **Sem testes de componente:** rejeitado por risco de regressão visual.
