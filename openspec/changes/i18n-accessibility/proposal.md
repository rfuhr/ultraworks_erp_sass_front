## Why

O ERP SaaS precisa atender usuários em português, inglês e espanhol (quando aplicável) e ser acessível. Strings hardcoded e falta de acessibilidade geram retrabalho e excluem usuários. O congresso já usa `@ngx-translate` e tem práticas de a11y que podem ser reaproveitadas.

## What Changes

- Configurar **`@ngx-translate/core`** com pt-BR default, en e es.
- Criar arquivos de tradução e chaves por domínio.
- Criar **language switcher**.
- Remover strings hardcoded das telas existentes.
- Aplicar **WCAG 2.1 AA**: teclado, foco, aria, contraste, `prefers-reduced-motion`.
- Definir **breakpoints** e comportamento responsivo.
- Criar testes de a11y e i18n.

## Capabilities

### New Capabilities

- `i18n`: traduções, locale, troca de idioma e formatação.
- `accessibility`: WCAG 2.1 AA, teclado, foco, aria, contraste.
- `responsive`: breakpoints e adaptação de layout/tabelas/formulários.

### Modified Capabilities

Nenhuma — as telas existentes serão adaptadas, mas o comportamento funcional não muda.

## Non-goals

- Traduzir módulos futuros além do shell/login/home.
- RTL.
- Dark mode.
- Libras/linguagem de sinais.
- Certificação externa de a11y.

## Impact

- **Core:** `i18n.service`, `lang.service`.
- **Assets:** `i18n/pt-br.json`, `en.json`, `es.json`.
- **Componentes:** `uw-language-switcher`, textos de tela.
- **Estilos:** breakpoints, foco, contraste.
- **Testes:** a11y e i18n.
