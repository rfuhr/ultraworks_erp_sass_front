# 0011. Fronteira de apresentação da uw-ui e direção de dependência

- Status: accepted
- Date: 2026-11-22

## Context

No projeto de referência, o layout administrativo da biblioteca de componentes importa `AuthService`, `MenuConfigService`, `SidebarStateService` e modelos de domínio. Isso impede o reuso da biblioteca em produtos com autenticação ou navegação diferentes e contraria o princípio de que a `uw-ui` deve ser genérica.

Sem uma regra explícita, cada produto tende a acoplar a biblioteca ao seu domínio, tornando o template inútil como base reutilizável.

## Decision

Estabelecer a seguinte direção de dependência:

```
tokens ← uw-ui ← apps/*
tokens ← core ← data ← apps/*
i18n   ← apps/*
```

Regras:

- `libs/uw-ui` importa apenas Angular, `@angular/cdk` e dependências de apresentação aprovadas; **nunca** importa `core`, `data`, `i18n` ou código de feature.
- Componentes de layout (`uw-admin-layout`, `uw-sidebar`, `uw-header`, `uw-subheader`) são **presentational**: recebem menu, perfil, notificações e breadcrumb via `input()` e comunicam intenções via `output()`.
- O shell do produto (auth, menu, estado de sidebar, notificações) vive no app, nunca na lib.
- App nunca importa app; shell, menu e rotas vivem no app.
- A regra é verificada por lint (`no-restricted-imports`) e revisão de PR.

## Consequences

- **Positivo:** a biblioteca pode ser usada por qualquer produto, com qualquer modelo de auth ou navegação.
- **Positivo:** testes da lib rodam sem providers de aplicação.
- **Positivo:** fronteiras explícitas reduzem regressões e acoplamento.
- **Negativo:** o app precisa montar o shell e passar mais inputs.
- **Negativo:** componentes que antes resolviam tudo sozinhos exigem um adaptador no app.

## Alternatives considered

- **Manter o layout acoplado a serviços:** rejeitado por inviabilizar reuso e testes isolados.
- **Criar uma lib `layout` separada:** rejeitada por ser cedo demais e fragmentar a biblioteca.
- **Permitir imports de `core` na `uw-ui`:** rejeitado por criar dependência circular e acoplamento de domínio.
- **Deixar a regra apenas na documentação:** rejeitado por não impedir violações; lint torna a regra executável.
