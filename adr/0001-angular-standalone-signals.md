# 0001. Angular standalone + signals

- Status: accepted
- Date: 2026-11-20

## Context

O frontend do congresso já usa Angular 21+ com standalone components e signals. O novo ERP precisa de uma base moderna, com menos boilerplate e estado reativo previsível, sem introduzir complexidade de NgRx.

## Decision

Adotar **Angular 21+** com **standalone components** e **signals** para estado local. Não usar NgModules de feature. RxJS fica restrito a streams assíncronos (HTTP, WebSocket).

Componentes presentational usam `ChangeDetectionStrategy.OnPush`. Containers gerenciam estado e orquestram services.

## Consequences

- **Positivo:** menos boilerplate, melhor tree-shaking, estado reativo simples.
- **Positivo:** alinhado ao congresso e ao ecossistema Angular atual.
- **Negativo:** exige disciplina para não misturar signals com RxJS sem critério.
- **Negativo:** alguns padrões antigos de NgModule precisam ser adaptados.

## Alternatives considered

- **NgModules + RxJS:** rejeitado por mais boilerplate e estado disperso.
- **NgRx:** rejeitado por complexidade desnecessária para o tamanho inicial.
- **React/Vue:** fora do escopo; o time e o design system são Angular.
