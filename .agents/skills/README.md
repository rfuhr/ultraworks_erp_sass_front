# Skills — Frontend Angular

O `AGENTS.md` referencia as skills abaixo. As skills de processo/stack foram copiadas do `congresso`; as específicas de domínio devem ser adaptadas.

## Copiadas do congresso

| Skill | Ação |
|---|---|
| `angular-developer` | Copiar (genérica) |
| `design-system` | Copiar + adaptar marca |
| `uw-ui-usage` | Copiar + adaptar componentes ERP |
| `testing-patterns` | Copiar |
| `testing-patterns-angular` | Copiar + ajustar para Jest/Playwright |
| `contextual-help` | Copiar |
| `stitch-prototyping` | Copiar |
| `gherkin-authoring` | Copiar |
| `requirements-documentation` | Copiar |
| `grill-me` | Copiar |
| `architectural-decision-records` | Copiar |
| `c4-diagrams` | Copiar |
| `openspec-git-discipline` | Copiar |
| `naming-conventions` | Copiar |
| `error-handling` | Copiar + adaptar RFC 7807 |
| `webapp-testing` | Copiar |

## A criar/adaptar

| Skill | Conteúdo mínimo |
|---|---|
| `erp-design-system` | Variante do design system com a marca do ERP |
| `erp-uw-ui` | Componentes ERP: tenant/company switcher, plan badge, quota meter |
| `erp-auth` | Login multi-tenant, refresh, guards, contexto |
| `erp-api` | Contrato `/api/v1`, headers de tenant, RFC 7807, paginação |
| `erp-a11y` | Checklist WCAG 2.1 AA específico do ERP |
| `erp-i18n` | Chaves, locales e padrões de tradução |

## Skills que NÃO se aplicam

- `frontend-design` (conflita com o design system).
- `backend-*`, `database-*`, `security-patterns-spring`.
- Skills de eventos/congressos.

## Como o agente deve carregar

- Toda task Angular carrega `angular-developer`.
- Toda task visual carrega `design-system` + `uw-ui-usage`.
- Toda task de teste carrega `testing-patterns` + `testing-patterns-angular`.
- Toda task de tela carrega `contextual-help` (quando houver formulário) e `stitch-prototyping` (protótipo).
- Toda task de API carrega `error-handling`.
- Toda task de acessibilidade carrega `design-system` + checklist WCAG.

## Regra de ouro

O design system e o `openspec/project.md` vencem qualquer skill. Em caso de conflito, corrija a skill.
