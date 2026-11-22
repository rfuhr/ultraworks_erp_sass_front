# 0002. Tailwind CSS 4 + design tokens

- Status: accepted
- Date: 2026-11-20

## Context

O design system do congresso usa tokens em duas camadas (palette → semânticos), Tailwind CSS 4 e regras visuais claras (superfícies sólidas, bordas 1px, sidebar 240px, ritmo 8px). O novo ERP deve manter consistência visual sem criar CSS ad-hoc.

## Decision

Adotar **Tailwind CSS 4** para layout/utilitários e **tokens CSS** para cores, tipografia, bordas e espaçamento. Componentes usam `var(--color-*)`, `var(--radius-*)`, `var(--font-family-*)`. Cores hardcoded são proibidas.

## Consequences

- **Positivo:** consistência visual e baixo custo de manutenção.
- **Positivo:** tokens permitem tema/rebranding sem reescrever componentes.
- **Negativo:** exige disciplina e revisão de PR.
- **Negativo:** Tailwind 4 ainda tem diferenças de configuração em relação à v3.

## Alternatives considered

- **CSS puro/SCSS global:** mais controle, mas propenso a inconsistência.
- **Biblioteca de UI de terceiros:** rejeitada por impor linguagem visual e dificultar o design system próprio.
- **CSS-in-JS:** não é o padrão do time/Angular.
