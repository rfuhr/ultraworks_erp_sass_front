# 0016. Mock de autenticação de demonstração isolado por repositório

- Status: accepted
- Date: 2026-11-22
- Relacionado: ADR-0014 (não supersedido)

## Context

O ADR-0014 definiu que a estratégia de autenticação de um produto é decidida na respectiva change de produto, e rejeitou criar autenticação mock como padrão do template. O template, porém, precisa de uma tela de login e de um shell executáveis para validar a fundação (rotas, guard, layout, i18n, acessibilidade) sem depender de backend.

Sem um exemplo executável, cada novo produto refaz a integração entre login, sessão, guard e shell antes de conseguir avaliar o template. O risco apontado pelo ADR-0014 é que o mock seja confundido com uma estratégia real de autenticação.

## Decision

- O template pode incluir um **mock de demonstração** de autenticação, desde que:
  - fique atrás de uma interface de repositório (`LoginRepository`) injetada por token;
  - não seja a implementação padrão de um produto real nem substitua a decisão do ADR-0014;
  - mantenha a sessão apenas em memória, sem persistir token ou credencial;
  - seja identificado na interface como dado de demonstração.
- A troca do mock por um repositório HTTP é feita apenas no provider da rota/feature, sem alterar componentes.
- O ADR-0014 permanece em vigor para autenticação de produto. Este ADR é **complementar**, não o supersede.

## Consequences

- **Positivo:** o fluxo login → guard → shell pode ser validado de ponta a ponta sem backend.
- **Positivo:** a interface de repositório mantém o caminho aberto para a implementação real.
- **Negativo:** existe risco de o mock ser promovido a produção por engano; a nomenclatura, a documentação e o hint na tela reduzem o risco.
- **Negativo:** sem persistência, recarregar a página encerra a sessão; é um comportamento aceito e documentado para a demonstração.

## Alternatives considered

- **Não ter login no template:** rejeitado porque o shell ficaria sem um consumidor real e cada produto repetiria a integração.
- **Mock dentro de `libs/data`:** rejeitado por levar dados de demonstração para uma biblioteca compartilhada de produção.
- **Interceptor HTTP global simulando autenticação:** rejeitado por afetar todas as requisições e esconder a origem dos dados.
