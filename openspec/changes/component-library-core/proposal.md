## Why

O ERP precisa de uma biblioteca de componentes consistente para telas densas (listagens, formulários, filtros, drawers, feedback). Reutilizar/adaptar a `uw-ui` do congresso acelera a entrega e mantém o design system. Faltam também componentes específicos do ERP (tenant/empresa, plano, quota).

## What Changes

- Portar/adaptar componentes essenciais de `uw-ui` (form, data, navigation, feedback, layout, utility).
- Criar componentes específicos do ERP:
  - `uw-tenant-switcher`
  - `uw-company-switcher`
  - `uw-context-badge`
  - `uw-plan-badge`
  - `uw-quota-meter`
  - `uw-feature-gate`
- Garantir testes, Storybook e acessibilidade.
- Documentar o inventário e as regras de componentização.

## Capabilities

### New Capabilities

- `core-components`: componentes genéricos reutilizáveis (form, data, navigation, feedback, layout, utility).
- `erp-components`: componentes específicos do ERP (tenant, empresa/filial, plano, quota, feature gate).
- `component-docs`: Storybook, testes e documentação de uso.

### Modified Capabilities

Nenhuma — o design system define tokens; esta change implementa componentes.

## Non-goals

- Telas de login/shell.
- Regras de negócio de ERP.
- Módulos de estoque/financeiro/fiscal.
- Temas por tenant.

## Impact

- **Diretórios:** `src/app/shared/uw-ui/**`, `src/app/shared/components/**`.
- **Storybook:** stories por componente.
- **Testes:** unitários/componente.
- **Sem mudança de contrato de API.**
