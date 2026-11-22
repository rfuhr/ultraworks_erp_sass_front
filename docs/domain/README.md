# Domínio do produto

Este template não conhece o domínio do produto. O conhecimento de domínio é
preenchido na primeira change de produto.

## Como documentar

1. Crie `docs/domain/domain.md` com:
   - visão geral do negócio;
   - entidades e relacionamentos;
   - regras de negócio;
   - fluxos principais;
   - glossário.
2. Para cada feature, crie `docs/requirements/<feature>/requirements.md`.
3. Referencie as entidades no código com os mesmos nomes usados aqui.

## Regras

- Não invente entidades ou regras sem validação do produto.
- Mantenha os nomes consistentes entre specs, código e API.
- Toda regra de negócio relevante deve ter um cenário Gherkin correspondente.
