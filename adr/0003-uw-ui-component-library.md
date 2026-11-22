# 0003. Biblioteca própria uw-ui

- Status: accepted
- Date: 2026-11-20

## Context

O congresso possui uma biblioteca própria (`uw-ui`) com dezenas de componentes standalone, Storybook e padrões visuais consistentes. O novo ERP precisa de componentes densos (tabelas, filtros, drawers, formulários) e não deve depender de bibliotecas de UI de terceiros.

## Decision

Reutilizar/adaptar a biblioteca **`uw-ui`** como biblioteca oficial de componentes. Convenção: classe `Uw<Nome>Component`, selector `uw-<nome>`, standalone, `OnPush`, `ViewEncapsulation.None`, Storybook obrigatório.

Componentes específicos de eventos/congressos serão descartados. Componentes novos do ERP (tenant/company switcher, plan badge, quota meter) nascem em `shared/uw-ui/`.

## Consequences

- **Positivo:** consistência visual e reutilização de código maduro.
- **Positivo:** Storybook como documentação viva.
- **Negativo:** custo de portar/adaptar componentes.
- **Negativo:** exige governança para não virar "componente para tudo".

## Alternatives considered

- **Angular Material:** rejeitado por impor Material Design e exigir overrides.
- **PrimeNG:** rejeitado por dependência externa e divergência do design system.
- **Componentes ad-hoc por feature:** rejeitado por duplicação e inconsistência.
