## Context

O shell do congresso usa `uw-admin-layout` com sidebar/header/subheader, menu por perfil e breadcrumb. O ERP precisa de menu por permissões, contexto de tenant/empresa/filial e home com indicadores.

## Goals / Non-Goals

**Goals:**

- Shell consistente e responsivo.
- Menu por permissões/features.
- Rotas lazy.
- Home com indicadores/gráficos/atalhos.
- 403/404/erro.

**Non-Goals:**

- Módulos completos.
- Dados reais de negócio.
- Temas por tenant.

## Decisions

### D1 — Reuso do layout

Reaproveitar `uw-admin-layout`, header, sidebar e subheader do congresso. Adaptar slots e menu.

### D2 — Menu

Menu derivado de permissões/features do backend. Estrutura inicial: Dashboard, Cadastros, Estoque, Comercial, Compras, Agrícola, Financeiro, Fiscal, Configurações, Administração.

### D3 — Rotas

`/app` com children lazy. `/app/home` como default. Placeholders por módulo.

### D4 — Home

Stat cards, gráficos (`ngx-charts`), atividades recentes e atalhos. Estados de loading/empty/error. Dados via endpoints quando existirem; mocks explícitos na fase 1.

### D5 — Contexto

Exibir tenant/empresa/filial no header (`uw-context-badge`/seletor). Troca de contexto recarrega a home.

### D6 — Erros

403/404/erro com ações de voltar/retry e `traceId` em 500.

### D7 — Responsividade

Sidebar colapsável; menu mobile em drawer; conteúdo fluido.

## Risks / Trade-offs

| Risco | Mitigação |
|---|---|
| Menu divergir de permissões | Derivar do backend; fallback seguro |
| Home com dados mock | Marcar claramente como placeholder |
| Layout pesado | Lazy routes e OnPush |
| Responsividade | Testes em breakpoints |

## Migration Plan

Greenfield. Rollback: rota `/app` temporária.

## Open Questions

1. Quais indicadores entram na home fase 1?
2. Menu por permissões ou por feature flags?
3. Notificações na fase 1?
4. Sidebar colapsada por padrão em telas médias?
