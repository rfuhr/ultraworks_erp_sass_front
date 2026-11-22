---
name: naming-conventions
description: Padrões de nomenclatura cross-cutting — código (PascalCase, camelCase, kebab-case), banco de dados (snake_case pt-BR), qualidade (zero any, strict)
---

# Naming Conventions

## Código (todas as camadas)

| Artefato | Padrão | Exemplo |
|---|---|---|
| Classes/Types | `PascalCase` | `Congress`, `CreateCongressDto` |
| Funções/variáveis | `camelCase` | `getCongress`, `congressName` |
| Arquivos | `kebab-case` | `congress-card.component.ts` |
| Enum | `PascalCase` | `CongressStatus` |

## Banco de dados (PostgreSQL + Drizzle)

Todos os nomes de tabelas, colunas, enums e relacionamentos usam **português brasileiro** (pt-BR):

| Artefato | Padrão | Exemplo |
|---|---|---|
| Nome de tabela | `snake_case` em pt-BR | `eventos`, `usuarios`, `submissoes` |
| Nome de coluna | `snake_case` em pt-BR | `nome`, `data_criacao`, `organizador_id` |
| Enum | `snake_case` em pt-BR | `status_evento`, `tipo_participante` |
| Valores de enum | `snake_case` em pt-BR | `rascunho`, `publicado`, `cancelado` |

## Qualidade

- **Zero `any`** em TypeScript — usar `unknown` com type guard
- Máximo **3 parâmetros** em funções; preferir objeto quando mais
- Comentários apenas para **"por quê"**, nunca para **"o quê"**
- `strict: true` no `tsconfig.json` de todas as aplicações

## Checklist

- [ ] Código segue PascalCase/camelCase/kebab-case?
- [ ] Banco usa snake_case em pt-BR?
- [ ] Zero `any` no TypeScript?
- [ ] Máximo 3 parâmetros por função?
- [ ] `strict: true` em todos os tsconfig?
