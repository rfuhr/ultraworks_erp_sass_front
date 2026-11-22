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

## Revisão das telas de demonstração (login e shell-home)

Escopo: `login-page` e `app-shell-layout` da change `add-mock-login-shell-home`.

| Critério | Login | Shell / Home | Observações |
|---|---|---|---|
| Navegação por teclado | ✅ | ✅ | Campos, botões, menu, header e ações da home alcançáveis por Tab |
| Foco visível | ✅ | ✅ | `:focus-visible` nos controles e itens; foco vai ao primeiro campo inválido |
| Labels e `aria-*` | ⚠️ | ✅ | Labels implícitos via `uw-form-field`; ver pendência abaixo |
| Erros anunciados | ✅ | ✅ | Erro de credenciais em `role="alert"`; erros de campo com `aria-live="polite"` |
| Estados da home | — | ✅ | `aria-live="polite"` anuncia loading/success/empty/error |
| Contraste | ✅ | ✅ | Tokens semânticos; nenhuma cor hardcoded nas telas |
| Alvos de toque | ✅ | ✅ | Controles com altura mínima de 44 px no mobile |
| `prefers-reduced-motion` | ✅ | ✅ | Respeitado pelo `uw-admin-layout` |
| Drawer mobile | — | ⚠️ | Abre/fecha por botão e overlay; ver pendência |
| Notificações | ✅ | ⚠️ | Botões no popover; foco não é preso nem devolvido ao sino |
| Menu de perfil | ✅ | ⚠️ | `role="menu"`/`menuitem`; foco não é preso nem devolvido ao avatar |

### Pendências identificadas

- `uw-input`: não expõe `id`/`aria-describedby` para o `<input>` interno. As mensagens de erro
  estão visíveis e com `aria-live`, mas não ficam programaticamente associadas ao campo.
  Evolução recomendada: adicionar inputs de acessibilidade ao `uw-ui`.
- `uw-admin-layout`: o drawer mobile não prende o foco nem fecha com `Escape` (comportamento da
  lib). O fluxo permanece operável por teclado, mas a experiência pode ser melhorada.
- `uw-header`/`uw-sidebar`: alguns `aria-label` são hardcoded na lib (`Sair`, `Fechar menu`,
  `Alternar menu lateral`), fora dos catálogos de i18n. Registrar como dívida da `uw-ui`.
- `uw-popover`: fecha com `Escape` e clique no backdrop, mas não prende o foco nem o devolve
  ao gatilho ao fechar. O scroll agora reposiciona o painel em vez de fechá-lo.
- `uw-header`: os rótulos do painel de notificações e do menu de perfil chegam por inputs
  (a lib continua sem conhecer i18n). Itens sem tela implementada exibem toast de demonstração.

