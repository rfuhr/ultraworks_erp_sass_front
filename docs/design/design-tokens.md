# Tokens do Design System

A fonte de verdade é o código em
[`libs/tokens/src/styles/`](../../libs/tokens/src/styles/). Esta página é um
índice de consulta rápida.

## Cores semânticas

| Token | Papel | Arquivo |
|---|---|---|
| `--color-primary` | Ação principal e marca | `tokens/colors.css` |
| `--color-on-primary` | Texto sobre a cor primária | `tokens/colors.css` |
| `--color-primary-container` | Fundo de destaque suave | `tokens/colors.css` |
| `--color-secondary` | Ação secundária | `tokens/colors.css` |
| `--color-tertiary` | Acento | `tokens/colors.css` |
| `--color-surface` | Fundo padrão | `tokens/colors.css` |
| `--color-surface-container-low` | Fundo de painéis | `tokens/colors.css` |
| `--color-surface-container` | Fundo de controles | `tokens/colors.css` |
| `--color-on-surface` | Texto principal | `tokens/colors.css` |
| `--color-on-surface-variant` | Texto secundário | `tokens/colors.css` |
| `--color-outline` | Bordas fortes | `tokens/colors.css` |
| `--color-outline-variant` | Bordas sutis | `tokens/colors.css` |
| `--color-success` | Sucesso | `tokens/colors.css` |
| `--color-warning` | Atenção | `tokens/colors.css` |
| `--color-error` | Erro | `tokens/colors.css` |
| `--color-info` | Informação | `tokens/colors.css` |

### Paleta crua

Escalas em `tokens/palette.css`, no formato
`--color-{family}-{shade}` (ex.: `--color-violet-600`). Não use a palette
diretamente em componentes; use os papéis semânticos.

## Tipografia

| Token | Valor |
|---|---|
| `--font-family-display` | `'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif` |
| `--font-family-body` | `'Inter', 'Segoe UI', system-ui, sans-serif` |
| `--font-family-mono` | `'JetBrains Mono', 'Cascadia Code', monospace` |
| `--font-size-xs` | `0.75rem` |
| `--font-size-sm` | `0.875rem` |
| `--font-size-md` | `1rem` |
| `--font-size-lg` | `1.125rem` |
| `--font-size-xl` | `1.25rem` |
| `--font-size-2xl` | `1.5rem` |
| `--font-size-3xl` | `1.875rem` |
| `--font-weight-regular` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-semibold` | `600` |
| `--font-weight-bold` | `700` |

## Bordas e raios

| Token | Valor |
|---|---|
| `--radius` | `0.875rem` |
| `--radius-sm` | `calc(var(--radius) - 4px)` |
| `--radius-md` | `calc(var(--radius) - 2px)` |
| `--radius-lg` | `var(--radius)` |
| `--radius-xl` | `calc(var(--radius) + 4px)` |

## Sidebar

Os tokens de sidebar ficam em `theme.css`:

- `--sidebar`
- `--sidebar-foreground`
- `--sidebar-foreground-muted`
- `--sidebar-primary`
- `--sidebar-accent`
- `--sidebar-accent-foreground`
- `--sidebar-border`
- `--sidebar-item-active-bg`
- `--sidebar-item-active-border`
- `--sidebar-item-hover-bg`

## Contraste

Pares principais verificados:

| Texto | Fundo | Contraste |
|---|---|---|
| `--color-on-surface` | `--color-surface` | ≥ 12:1 |
| `--color-on-surface-variant` | `--color-surface` | ≥ 4.6:1 |
| `--color-on-primary` | `--color-primary` | ≥ 4.5:1 |
| `--color-on-error` | `--color-error` | ≥ 4.5:1 |

Ao adicionar um novo par, registre a medição aqui.
