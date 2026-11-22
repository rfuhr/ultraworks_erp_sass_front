## 1. i18n

- [ ] 1.1 Instalar/configurar `@ngx-translate/core` e loader HTTP
- [ ] 1.2 Criar `i18n/pt-br.json`
- [ ] 1.3 Criar `i18n/en.json`
- [ ] 1.4 Criar `i18n/es.json` (opcional)
- [ ] 1.5 Configurar fallback e `LOCALE_ID`
- [ ] 1.6 Criar `I18nService`/`LangService`
- [ ] 1.7 Criar `uw-language-switcher`
- [ ] 1.8 Persistir preferência
- [ ] 1.9 Testes de i18n

## 2. Substituição de strings

- [ ] 2.1 Mapear strings hardcoded em login/shell/home
- [ ] 2.2 Criar chaves por domínio
- [ ] 2.3 Substituir por `translate`
- [ ] 2.4 Revisar mensagens de erro
- [ ] 2.5 Teste que falha se houver string hardcoded (quando viável)

## 3. Acessibilidade

- [ ] 3.1 Revisar labels/aria em formulários
- [ ] 3.2 Revisar foco/teclado no menu e modais
- [ ] 3.3 Revisar contraste
- [ ] 3.4 Revisar mensagens de erro anunciadas
- [ ] 3.5 Respeitar `prefers-reduced-motion`
- [ ] 3.6 Criar testes de teclado/foco
- [ ] 3.7 Auditoria com axe/Lighthouse (quando disponível)

## 4. Responsividade

- [ ] 4.1 Definir breakpoints
- [ ] 4.2 Adaptar sidebar/menu no mobile
- [ ] 4.3 Adaptar tabelas (scroll/colunas)
- [ ] 4.4 Adaptar formulários
- [ ] 4.5 Testes de breakpoint

## 5. Documentação e validação

- [ ] 5.1 Documentar i18n e a11y em `docs/`
- [ ] 5.2 Atualizar README
- [ ] 5.3 Rodar `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`
- [ ] 5.4 Rodar `openspec validate i18n-accessibility --strict`
- [ ] 5.5 Revisar contraste/teclado
- [ ] 5.6 Atualizar `tasks.md`
