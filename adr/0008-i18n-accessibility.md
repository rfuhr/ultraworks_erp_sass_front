# 0008. i18n e acessibilidade

- Status: accepted
- Date: 2026-11-20

## Context

O ERP pode atender usuários em pt-BR, en e es. O congresso já usa `@ngx-translate/core`. Acessibilidade é requisito de produto e de compliance, especialmente para telas densas e formulários.

## Decision

Adotar:

- **i18n:** `@ngx-translate/core` com `pt-br` default, `en` e `es` opcionais.
- Nenhuma string visível hardcoded.
- Datas/números/moeda por locale.
- Preferência persistida no usuário/localStorage.
- **Acessibilidade:** WCAG 2.1 AA, teclado, foco visível, `aria-*`, contraste 4.5:1, `prefers-reduced-motion`.
- Testes de teclado/foco nos fluxos críticos.

## Consequences

- **Positivo:** produto utilizável por mais públicos e compliance.
- **Positivo:** base para expansão internacional.
- **Negativo:** custo de tradução e manutenção de chaves.
- **Negativo:** exige revisão constante de a11y.

## Alternatives considered

- **Somente pt-BR:** mais simples, mas limita expansão.
- **i18n nativo do Angular:** viável, mas o congresso já usa ngx-translate.
- **A11y como fase futura:** rejeitado por custo de retrofitting.
