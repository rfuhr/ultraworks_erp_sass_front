# Protótipo — Shell Home

## Objetivo

Referência visual do shell autenticado e da home, reproduzindo a estrutura do projeto `congresso`
(sidebar + header + breadcrumb + conteúdo) com **dados mockados** e sem domínio de eventos.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `codigo.html` | Referência visual estática (sidebar, header, breadcrumb, indicadores e atividades) |
| `screenshot.png` | Captura de referência do `codigo.html` |

## Estrutura

```text
┌──────────────┬────────────────────────────────────────────────────┐
│ Sidebar 240  │ Header 64px — título, notificações, perfil         │
│ (72 colaps.) ├────────────────────────────────────────────────────┤
│              │ Subheader 32px — breadcrumb                        │
│ Menu         ├────────────────────────────────────────────────────┤
│              │ Conteúdo — padding 24px / 16px mobile               │
│ Usuário      │ Cabeçalho da página + ação primária                │
│ Sair         │ 4 indicadores (grid 12 col.)                       │
│              │ Atividades recentes + progresso                    │
└──────────────┴────────────────────────────────────────────────────┘
```

## Mapeamento de design system

| Elemento | Regra / componente |
|---|---|
| Shell | `uw-admin-layout` |
| Sidebar | `uw-sidebar`, largura 240 px (72 px colapsada), `--sidebar`, `--sidebar-foreground` |
| Header | `uw-header`, 64 px, `--color-surface`, borda `--color-outline-variant` |
| Breadcrumb | `uw-subheader` + `uw-breadcrumb`, 32 px |
| Título da página | `uw-page-header`, `--font-family-display` |
| Indicadores | `uw-stat-card` (4 colunas → 2 → 1) |
| Atividades | `uw-card` + lista/timeline |
| Progresso | `uw-card` + `uw-progress-bar`/`uw-progress-track` |
| Ação primária | `uw-button variant="primary"` |
| Feedback | `uw-toast` para itens de menu sem rota e ações de demonstração |
| Fundo do conteúdo | `--color-surface-container-low` |
| Raios | `--radius-md` / `--radius-lg` |
| Ritmo | 16/24/32 px (múltiplos de 8) |

## Estados

- **Loading:** `uw-skeleton` nos indicadores e na lista; header e sidebar sempre visíveis.
- **Empty:** `uw-empty-state` no lugar das atividades.
- **Error:** `uw-alert variant="danger"` com ação “Tentar novamente”.
- **Success:** dados mockados após ~400 ms.
- Estados demonstráveis por `?state=empty|error`.

## Responsividade

- >= 1100 px: indicadores em 4 colunas; conteúdo em 2 colunas.
- 900–1099 px: indicadores em 2 colunas; conteúdo em 1 coluna.
- < 900 px: sidebar vira drawer com overlay; conteúdo com padding de 16 px; header oculta nome do usuário.

## Acessibilidade e idiomas

- `aside`/`header`/`nav`/`main` semânticos; `aria-label` no menu e breadcrumb.
- Foco visível em itens, botões e perfil; ordem de tabulação natural.
- Notificações anunciadas com a contagem; toasts não são a única fonte de informação.
- Contraste mínimo 4.5:1; alvos de toque >= 44×44 px no mobile.
- Textos em pt-BR, en e es; sem strings visíveis hardcoded.

## Componentes `uw-ui`

`uw-admin-layout`, `uw-sidebar`, `uw-header`, `uw-subheader`, `uw-breadcrumb`, `uw-avatar`, `uw-icon`,
`uw-button`, `uw-stat-card`, `uw-card`, `uw-page-header`, `uw-empty-state`, `uw-skeleton`, `uw-toast`,
`uw-language-switcher` e, se necessário, `uw-progress-bar`/`uw-progress-track` e `uw-timeline`.
Nenhum componente novo é necessário nesta change.

## Limitações conhecidas do shell atual

- `uw-header` não oferece painel de notificações nem menu de perfil; o sino exibe toast e o perfil é apenas informativo.
- `uw-sidebar` não destaca o item ativo nem colapsa grupos; o menu do demo evita depender desses recursos.
- Itens sem rota representam telas fictícias e exibem toast de demonstração.
