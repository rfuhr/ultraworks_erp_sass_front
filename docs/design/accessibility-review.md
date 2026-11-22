# Revisão de Acessibilidade — Faixa A

Revisão dos componentes genéricos portados para a `uw-ui`. Itens marcados como
pendentes devem ser resolvidos antes de usar o componente em fluxo crítico.

## Critérios

- Navegação completa por teclado.
- Foco visível em todos os elementos interativos.
- `aria-*` correto em componentes compostos.
- Mensagens de erro associadas aos campos.
- Contraste mínimo de 4.5:1.
- `prefers-reduced-motion` respeitado.
- Modais e drawers prendem o foco e fecham com `Escape`.

## Resultado por componente

| Componente | Teclado | Foco | ARIA | Observações |
|---|---|---|---|---|
| `uw-button` | ✅ | ✅ | ✅ | Estado `disabled` e `loading` cobertos |
| `uw-input` | ✅ | ✅ | ✅ | Erro anunciado via `aria-describedby` |
| `uw-textarea` | ✅ | ✅ | ✅ | — |
| `uw-checkbox` | ✅ | ✅ | ✅ | — |
| `uw-radio-group` | ✅ | ✅ | ✅ | Setas navegam entre opções |
| `uw-toggle` | ✅ | ✅ | ✅ | `role="switch"` |
| `uw-toggle-card` | ✅ | ✅ | ✅ | `aria-checked` e teclado |
| `uw-select` | ✅ | ✅ | ✅ | Overlay com foco controlado |
| `uw-autocomplete` | ✅ | ✅ | ✅ | — |
| `uw-date-picker` | ✅ | ✅ | ⚠️ | Revisar anúncio de datas fora do mês |
| `uw-modal` | ✅ | ✅ | ✅ | Foco preso e `Escape` |
| `uw-drawer` | ✅ | ✅ | ✅ | Foco preso e `Escape` |
| `uw-tabs` | ✅ | ✅ | ✅ | Setas e `aria-selected` |
| `uw-table` | ✅ | ✅ | ✅ | Cabeçalhos ordenáveis com `aria-sort` |
| `uw-pagination` | ✅ | ✅ | ✅ | Botões desabilitados anunciados |
| `uw-toast` | — | — | ✅ | Região `aria-live` |
| `uw-alert` | — | — | ✅ | `role="alert"` quando crítico |
| `uw-empty-state` | — | — | ✅ | — |
| `uw-skeleton` / `uw-spinner` | — | — | ✅ | `role="status"` |
| `uw-admin-layout` | ✅ | ✅ | ✅ | Sidebar como drawer em mobile |

## Pendências

- `uw-date-picker`: revisar anúncio de foco ao navegar entre meses.
- `uw-select`: validar comportamento com leitor de tela em listas longas.
- `uw-table`: testar ordenação com teclado em todas as colunas.
- Componentes da Faixa B (`html-editor`, `scheduler`) não foram revisados.
