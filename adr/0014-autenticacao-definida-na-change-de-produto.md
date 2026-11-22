# 0014. Autenticação e contexto de produto definidos na change de produto

- Status: accepted, supersedes ADR-0004
- Date: 2026-11-22
- Supersedes: ADR-0004

## Context

O ADR-0004 definiu uma estratégia específica de autenticação para um ERP: access token JWT em memória, refresh token em cookie, single-flight, troca de tenant e headers de contexto. Essa decisão faz sentido para aquele produto, mas não para um template genérico que ainda não possui backend, modelo de tenancy ou contrato de identidade.

Manter o ADR-0004 como padrão obrigatório imporia ao template uma arquitetura de autenticação que pode não se aplicar ao próximo produto. Remover qualquer estrutura de auth, por outro lado, obrigaria cada produto a começar do zero.

## Decision

- O template fornece apenas o **esqueleto** de autenticação e sessão em `libs/core`: contratos, guards, interceptors e pontos de extensão, sem implementação de login real.
- A estratégia concreta (JWT, cookie, OAuth, sessão de servidor), o modelo de tenancy e os headers de contexto são decididos na **change de produto**, com novo ADR.
- Permanecem como regras de segurança do template: nunca armazenar refresh token em `localStorage`/`sessionStorage`, não logar tokens ou PII e não hardcodar segredos.
- O ADR-0004 permanece como registro histórico e não é editado.

## Consequences

- **Positivo:** o template não impõe um modelo de identidade a produtos diferentes.
- **Positivo:** o produto decide o contrato com o backend explicitamente, via ADR.
- **Positivo:** o esqueleto evita que cada produto reinvente guards e interceptors.
- **Negativo:** a primeira change de produto precisa tomar e registrar essa decisão.
- **Negativo:** há risco de implementações divergentes entre produtos; as regras de segurança baseline reduzem o risco.

## Alternatives considered

- **Manter o ADR-0004 como padrão do template:** rejeitado por acoplar o template a um produto e a um backend específico.
- **Remover toda a estrutura de auth:** rejeitado por aumentar o custo de cada novo produto.
- **Criar autenticação mock no template:** rejeitado por mascarar a necessidade de decisão real e induzir a padrões inadequados.
