# .agents — Agentes e Skills (Frontend)

Este diretório contém as **skills** dos subagentes do frontend. Os subagentes são definidos pelo orquestrador (`AGENTS.md`).

## Subagentes

| Subagente | Responsabilidade | Skills principais |
|---|---|---|
| `requirements` | Telas, fluxos, critérios de aceite | `requirements-documentation`, `gherkin-authoring`, `grill-me` |
| `architect` | Decisões arquiteturais, ADRs, impacto | `angular-developer`, `architectural-decision-records`, `c4-diagrams` |
| `design` | Design system, protótipos, componentização | `design-system`, `stitch-prototyping`, `uw-ui-usage` |
| `frontend` | Implementação Angular | `angular-developer`, `uw-ui-usage`, `error-handling` |
| `testing` | Unit, componente, E2E | `testing-patterns`, `testing-patterns-angular`, `webapp-testing` |
| `accessibility` | WCAG 2.1 AA | `angular-developer`, `design-system` |
| `security` | XSS, CSRF, tokens, CSP | `error-handling`, `angular-developer` |
| `observability` | Web Vitals, erros JS | `webapp-testing`, `testing-patterns` |

## Estrutura de uma skill

```text
.agents/skills/<nome>/
├── SKILL.md
└── references/        # opcional
```

## Skills copiadas do congresso

- `angular-developer`
- `design-system` (adaptada para ERP SaaS)
- `uw-ui-usage` (adaptada)
- `testing-patterns`
- `testing-patterns-angular`
- `contextual-help`
- `stitch-prototyping`
- `gherkin-authoring`
- `requirements-documentation`
- `grill-me`
- `architectural-decision-records`
- `c4-diagrams`
- `openspec-git-discipline`
- `naming-conventions`
- `error-handling`
- `webapp-testing`

## Skills não copiadas

- `frontend-design` — conflita com o design system (evita Inter/roxo; o design system usa essa base).
- Skills de backend/database.
- Skills específicas de eventos.

## Regra de precedência

`openspec/project.md` > ADR > `docs/design-system.md` > skill > preferência do agente.

Se uma skill conflitar com a constituição, o design system ou um ADR, a skill deve ser corrigida.
