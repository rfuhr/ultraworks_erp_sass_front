## Context

O congresso já usa `@ngx-translate/core` e tem uma skill de acessibilidade. O ERP precisa de i18n desde o início para evitar strings hardcoded e de a11y para telas densas. A fase 1 cobre login, shell e home; módulos futuros seguirão o padrão.

## Goals / Non-Goals

**Goals:**

- pt-BR default; en/es opcionais.
- Nenhuma string visível hardcoded.
- Language switcher.
- WCAG 2.1 AA.
- Responsividade.

**Non-Goals:**

- Traduzir todos os módulos futuros.
- RTL.
- Dark mode.
- Certificação externa.

## Decisions

### D1 — ngx-translate

Configurar `provideTranslateService` com loader HTTP (`i18n/`), fallback `pt-br`. Chaves por domínio (`auth.*`, `menu.*`, `common.*`, `home.*`).

### D2 — Persistência

Preferência no `localStorage` e, quando houver, no perfil do usuário. Backend recebe `Accept-Language`.

### D3 — Formatação

Datas/números/moeda por locale (`LOCALE_ID` ou `formatDate`/`formatNumber`).

### D4 — A11y

Checklist: teclado, foco visível, aria, contraste 4.5:1, `prefers-reduced-motion`, labels, mensagens de erro anunciadas.

### D5 — Responsividade

Breakpoints: mobile `< 640px`, tablet `640–1024px`, desktop `> 1024px`. Sidebar vira drawer no mobile. Tabelas com scroll horizontal ou colunas ocultas.

### D6 — Testes

Testes de teclado/foco; smoke de i18n; verificação de strings hardcoded no CI (lint customizado/regex).

## Risks / Trade-offs

| Risco | Mitigação |
|---|---|
| Chaves duplicadas/faltantes | Catálogo + teste de chaves |
| Tradução desatualizada | Revisão por PR |
| A11y inconsistente | Checklist + testes |
| Layout quebrar no mobile | Testes de breakpoint |
| Texto maior em en/es | Layout flexível |

## Migration Plan

Aplicar i18n nas telas existentes; adicionar switcher; rodar auditoria de a11y; corrigir. Rollback por tela.

## Open Questions

1. Quais idiomas na fase 1? (recomendação: pt-BR e en; es depois)
2. Quem traduz/revisa?
3. Ferramenta de tradução?
4. Auditoria com axe/Lighthouse no CI?
5. Suporte a RTL no futuro?
