## Context

O congresso possui ~70 componentes `uw-ui` standalone, com Storybook. Nem todos se aplicam ao ERP. Precisamos de um núcleo enxuto e consistente, mais componentes específicos de contexto SaaS.

## Goals / Non-Goals

**Goals:**

- Portar componentes essenciais com qualidade.
- Criar componentes de contexto/plano/quota.
- Storybook e testes.
- Acessibilidade.

**Non-Goals:**

- Componentes de eventos/certificados.
- Telas.
- Regras de negócio.

## Decisions

### D1 — Convenções

`Uw<Nome>Component`, selector `uw-<nome>`, standalone, `OnPush`, `ViewEncapsulation.None`, inputs/outputs tipados.

### D2 — Prioridade

**Form:** button, input, select, checkbox, textarea, radio, date-picker, file-upload, search-field, form-field, toggle.
**Data:** table, card, stat-card, avatar, pagination, progress-bar, chart-card, timeline, section-heading.
**Navigation:** tabs, stepper, accordion, breadcrumb, filter-pills.
**Feedback:** alert, toast, spinner, skeleton, confirmation, empty-state.
**Layout:** admin-layout, header, sidebar, subheader, page-header, panel, modal, drawer, divider.
**Utility:** icon, tag, chip, badge, tooltip, copy-field, export-menu, language-switcher.

### D3 — Componentes ERP

- `uw-tenant-switcher`: lista memberships/tenants.
- `uw-company-switcher`: empresa/filial.
- `uw-context-badge`: tenant/empresa/filial atual.
- `uw-plan-badge`: plano/status.
- `uw-quota-meter`: uso vs limite.
- `uw-feature-gate`: renderiza conforme entitlement.

### D4 — Storybook

Cada componente tem story com estados: default, hover, focus, disabled, loading, error, empty (quando aplicável).

### D5 — Testes

Unitário/componente para inputs/outputs e estados; a11y para teclado/foco.

### D6 — Não copiar

Componentes específicos de eventos/certificados; scheduler/doc-viewer só se necessário.

## Risks / Trade-offs

| Risco | Mitigação |
|---|---|
| Portar componentes demais | Priorizar o núcleo usado no login/shell/CRUD |
| Componentes divergirem do design system | Revisão visual + Storybook |
| A11y inconsistente | Checklist por componente |
| Manutenção | Documentação e testes |

## Migration Plan

Portar em ordem de uso: form → layout → data → feedback → navigation → ERP. Rollback por componente.

## Open Questions

1. Portar todos ou apenas o núcleo?
2. Angular Testing Library será adicionada?
3. Visual regression no Storybook?
4. Quem aprova novos componentes?
