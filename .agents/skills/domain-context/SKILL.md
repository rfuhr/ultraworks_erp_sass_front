---
name: domain-context
description: >
  Contexto de domínio do produto. Use sempre que uma tarefa envolver entidades,
  regras de negócio, telas ou contratos de API do produto. Lê docs/domain/ e
  orienta o preenchimento quando o diretório ainda está vazio.
---

# Contexto de Domínio

Este template não conhece o domínio do produto. O conhecimento de domínio vive
em `docs/domain/` e é preenchido na primeira change de produto.

## Como usar

1. Leia `docs/domain/README.md`.
2. Consulte `docs/domain/domain.md` quando existir.
3. Consulte `docs/requirements/<feature>/` para requisitos de features.
4. Se o domínio ainda não estiver documentado:
   - Não invente entidades ou regras.
   - Solicite o levantamento ao agente `requirements`.
   - Registre as entidades e regras em `docs/domain/domain.md`.

## Regras

- Toda entidade citada em código deve existir no documento de domínio.
- Nomes de domínio devem ser consistentes entre specs, código e API.
- Não copie entidades de projetos anteriores sem validar com o produto.
