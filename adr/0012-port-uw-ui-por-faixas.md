# 0012. Port da uw-ui por faixas de dependência e domínio

- Status: accepted
- Date: 2026-11-22

## Context

O projeto de referência possui cerca de 70 componentes. Alguns são genéricos e leves; outros arrastam dependências pesadas (`ngx-quill`/`quill` para o editor HTML e `rrule` para o scheduler); outros são específicos do domínio de eventos (pagamento, certificado, notificações, contexto de evento).

Portar tudo tornaria o template pesado e contaminado por domínio. Portar um subconjunto pequeno obrigaria cada produto a reconstruir a base. É necessário um critério explícito e estável para o que entra na biblioteca padrão.

## Decision

Classificar os componentes em três faixas:

- **Faixa A — padrão:** entra no template e no `package.json`. Depende apenas de Angular, `@angular/cdk` e `ngx-mask`. Inclui formulários, dados, navegação, feedback, layout e utilidades genéricas.
- **Faixa B — opt-in:** documentada, mas não instalada por padrão. Exige dependência pesada: `html-editor` (`ngx-quill`/`quill`) e `scheduler` (`rrule`). Receitas de instalação ficam em `docs/design/uw-ui-extending.md`.
- **Faixa C — domínio:** não entra no template. Componentes de evento, certificado, pagamento, notificações e células específicas de negócio.

Toda componente da Faixa A deve ter spec, história no Storybook e entrada no catálogo com sua faixa indicada.

## Consequences

- **Positivo:** bootstrap leve, sem dependências que a maioria dos produtos não usa.
- **Positivo:** critério objetivo para decidir o destino de novos componentes.
- **Positivo:** produtos que precisam de editor ou agenda seguem uma receita documentada.
- **Negativo:** a Faixa B exige trabalho adicional quando for necessária.
- **Negativo:** a classificação precisa ser revista quando um componente mudar de dependências.

## Alternatives considered

- **Portar todos os componentes:** rejeitado por peso de bundle, dependências desnecessárias e contaminação de domínio.
- **Portar apenas um subconjunto mínimo:** rejeitado por obrigar cada produto a reconstruir formulários, tabelas e layout.
- **Publicar cada faixa como pacote separado:** rejeitado por complexidade de versionamento no bootstrap.
- **Classificar por categoria visual apenas:** rejeitado por ignorar o custo de dependências e o acoplamento de domínio.
