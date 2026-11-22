# 0005. Estado com signals e services

- Status: accepted
- Date: 2026-11-20

## Context

O frontend tem telas com listagens, filtros, paginação, formulários e estado de UI. O congresso usa signals + services stateful; não usa NgRx. O ERP deve manter simplicidade e previsibilidade.

## Decision

Adotar **signals + services** para estado:

- `signal` para estado local e de feature.
- `computed` para derivações.
- `effect` para sincronizações pontuais.
- Services `providedIn: 'root'` ou por feature para estado compartilhado.
- RxJS apenas para HTTP/streams.

Não introduzir NgRx no bootstrap.

## Consequences

- **Positivo:** menos boilerplate, curva de aprendizado menor.
- **Positivo:** alinhado ao Angular moderno.
- **Negativo:** estado global complexo pode exigir padrões adicionais no futuro.
- **Negativo:** exige disciplina para não criar services gigantes.

## Alternatives considered

- **NgRx:** rejeitado por complexidade inicial.
- **RxJS BehaviorSubject:** viável, mas menos ergonômico que signals.
- **Component store local:** pode ser adotado pontualmente.
