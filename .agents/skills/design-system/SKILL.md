---
name: design-system
description: >
  Design system do ERP SaaS (base herdada do UltraEventos). Use esta skill para consultar tokens visuais
  (cores, tipografia, espaçamento, bordas), padrões de componentes (botões,
  inputs, cards, tabelas, sidebar), e regras de layout antes de implementar
  ou prototipar qualquer tela. Obrigatória para os agentes design e frontend.
---

# Design System — ERP SaaS

Fonte única da verdade para tokens visuais, componentes e padrões de layout
do ERP SaaS (base herdada do UltraEventos). Consulte antes de qualquer decisão visual.

> Arquivo de referência completo: `docs/design-system.md`
> Sempre leia o arquivo original pois pode conter atualizações mais recentes que esta skill.

## Identidade visual

**Nome:** ERP SaaS Executive (base Ultra Eventos Executive)
**Personalidade:** Modern Corporate — sóbrio, funcional, preciso
**Inspiração:** Stripe, GitHub — ferramentas institucionais de alta densidade
**Proibido:** glassmorphism, gradientes em dashboards, sombras dramáticas, border-radius > 12px, pill shapes (exceto indicadores de status)

---

## Tokens de cor

### Superfícies
| Token | Valor | Uso |
|-------|-------|-----|
| `surface` | `#f7fafd` | Background geral |
| `surface-bright` | `#ffffff` | Cards e containers |
| `surface-container` | `#ebeef1` | Hover states |
| `outline` | `#747686` | Bordas secundárias |
| `outline-subtle` | `#e5e8eb` | Bordas de cards (1px) |

### Cores primárias
| Token | Valor | Uso |
|-------|-------|-----|
| `primary` | `#002e94` | Identidade, sidebar base |
| `primary-container` | `#0041c8` | Ações primárias, botão primary, estados ativos |
| `on-primary` | `#ffffff` | Texto sobre primary |
| `secondary` | `#485b9e` | Ações secundárias |
| `tertiary-container` | `#00d4ff` | Electric Cyan — marcadores de alta prioridade (Star), barras de progresso |

### Status
| Token | Valor | Uso |
|-------|-------|-----|
| `status-success` | `#008575` | Sucesso |
| `status-error` / `error` | `#ba1a1a` | Erro |

### Texto
| Token | Valor | Uso |
|-------|-------|-----|
| `on-surface` | `#181c1e` | Texto principal |
| `on-surface-variant` | `#434654` | Texto secundário / labels |

---

## Tokens de tipografia

| Token | Fonte | Size | Weight | Line-height | Uso |
|-------|-------|------|--------|-------------|-----|
| `headline-lg` | Hanken Grotesk | 32px | 700 | 40px | Títulos de página (desktop) |
| `headline-md` | Hanken Grotesk | 24px | 600 | 32px | Títulos de seção |
| `headline-lg-mobile` | Hanken Grotesk | 24px | 700 | 32px | Títulos de página (mobile) |
| `title-md` | Hanken Grotesk | 18px | 600 | 24px | Títulos de card |
| `body-lg` | Inter | 16px | 400 | 24px | Corpo de texto |
| `body-sm` | Inter | 14px | 400 | 20px | Labels, descrições |
| `label-mono` | JetBrains Mono | 12px | 500 | 16px | Timestamps, IDs, metadados técnicos |

**Regra:** Hierarquia via peso e cor — nunca via tamanho excessivo ou tags decorativas.

---

## Tokens de espaçamento

| Token | Valor | Uso |
|-------|-------|-----|
| `sidebar-width` | 240px | Largura fixa da sidebar |
| `gutter` | 16px | Espaço interno do grid |
| `margin-main` | 24px | Padding dos containers principais |
| `stack-xs` | 4px | Elementos muito próximos |
| `stack-sm` | 8px | Elementos relacionados |
| `stack-md` | 16px | Grupos de elementos |
| `stack-lg` | 32px | Seções distintas |

**Base:** Unidade de 8px. Todos os espaçamentos são múltiplos de 4px.

---

## Tokens de borda

| Token | Valor | Uso |
|-------|-------|-----|
| `rounded-sm` | 2px | Badges pequenos |
| `rounded` (DEFAULT) | 4px | Botões, inputs, badges |
| `rounded-md` | 6px | — |
| `rounded-lg` | 8px | Cards e containers |
| `rounded-xl` | 12px | Máximo permitido |
| `rounded-full` | — | **PROIBIDO** exceto indicadores de status circulares |

---

## Layout

**Modelo:** Fixed Sidebar / Fluid Content

```
┌──────────┬─────────────────────────────┐
│  Sidebar │  Content Area               │
│  240px   │  Fluid (12-col grid)        │
│  fixed   │  padding: 24px              │
└──────────┴─────────────────────────────┘
```

- Grid: 12 colunas, 16px gutters
- Padding main: 24px
- Sem seções "Hero" em ferramentas internas
- Headers de página: H1 simples, alinhado à esquerda, seguido diretamente pelo conteúdo

---

## Componentes

### Botões
| Variante | Background | Texto | Border-radius |
|----------|-----------|-------|---------------|
| Primary | `#0041c8` | `#ffffff` | 4px |
| Secondary | `#001b5e` ou borda 1px | — | 4px |
| Transitions | 150ms opacity/color | — | Sem scale/bounce |

### Inputs
- Background: `#ffffff`
- Borda: 1px solid `#e5e8eb`
- Focus: borda `primary-container` + ring 2px (sem difusão)
- Label: sempre acima do campo, Inter body-sm medium

### Cards
- Background: `#ffffff`
- Borda: 1px solid `#e5e8eb`
- Border-radius: 8px
- Shadow: máx 8px blur, 10% opacity (apenas leve lift)
- Padding interno: 24px
- Separação de header: 1px solid horizontal

### Tabelas
- Texto alinhado à esquerda
- Padding vertical: 12px
- Bordas: 1px horizontal
- Sem zebra stripes
- Hover: background shift para `surface-container`

### Sidebar
- Largura: 240px, posição fixa
- Separação: border-right 1px (sem sombra externa)
- Nav links: texto + ícone 16px
- Estado ativo: barra vertical 2px na esquerda OU tint de background sutil

### Indicador de alta prioridade (Star)
- Ícone Star 16px, monocromático
- Cor: Electric Cyan `#00d4ff`
- Uso: marcador funcional de status crítico — não decorativo

---

## Elevação

| Nível | Background | Uso |
|-------|-----------|-----|
| 0 | `#f7fafd` | Background geral |
| 1 | `#ffffff` + borda 1px `#e5e8eb` | Cards, containers de conteúdo |
| Interativo | Shift para `surface-container` no hover | Linhas de tabela, cards clicáveis |

---

## Regras invioláveis

1. **Zero gradientes** em dashboards e componentes funcionais
2. **Zero glassmorphism** — superfícies são sólidas
3. **Border-radius máximo: 12px** — pill shapes proibidos (exceto indicadores circulares)
4. **Sombras máximas**: 8px blur, 10% opacity
5. **Hover**: color shift — nunca shadow increase ou transform
6. **Animações**: máx 150ms, apenas opacity/color — sem bounce, sem scale