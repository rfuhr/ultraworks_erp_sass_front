## Context

O design system do congresso está documentado em `docs/design-system.md` e implementado em tokens CSS. Ele foi desenhado para produtividade e densidade (Modern Corporate), com sidebar fixa, superfícies sólidas e tipografia tri-font. O ERP reutilizará essa base.

## Goals / Non-Goals

**Goals:**

- Tokens em duas camadas.
- Tema aplicado globalmente.
- Tipografia e layout consistentes.
- Storybook documentando tokens.
- Regra “sem cor hardcoded”.

**Non-Goals:**

- Componentes.
- Login/shell.
- Dark mode.
- Temas por tenant.

## Decisions

### D1 — Tokens em duas camadas

`palette.css` (cores brutas) → `colors.css` (semânticas) → `theme.css` (aliases e sidebar).

### D2 — Tailwind 4

Mapear tokens em `@theme`/CSS variables para uso com classes utilitárias e `var(--color-*)`.

### D3 — Tipografia

- `--font-family-display`: Plus Jakarta Sans.
- `--font-family-body`: Inter.
- `--font-family-mono`: JetBrains Mono.
- Material Symbols para ícones.

### D4 — Layout

Sidebar 240px, conteúdo fluido, grid 12 colunas, ritmo 8px, padding 24px.

### D5 — Documentação

Storybook com stories de tokens (cores, tipografia, bordas, espaçamento) e link para `docs/design-system.md`.

### D6 — Proibição

Cores hardcoded, raios fora dos tokens, glassmorphism e bibliotecas de UI externas.

## Risks / Trade-offs

| Risco | Mitigação |
|---|---|
| Tokens divergirem do doc | Doc e CSS versionados juntos |
| Tailwind 4 não reconhecer tokens | Validar build e classes de exemplo |
| Fontes externas bloqueadas | Self-host/fallback |
| Excesso de tokens | Manter catálogo enxuto |

## Migration Plan

Greenfield: aplicar tokens no app base. Rollback: reverter CSS.

## Open Questions

1. Marca final (cores) ou manter a base do congresso?
2. Self-host de fontes?
3. Dark mode na fase 1?
4. Storybook com visual regression?
