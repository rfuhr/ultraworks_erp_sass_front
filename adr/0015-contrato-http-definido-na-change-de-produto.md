# 0015. Contrato HTTP e tratamento de erros definidos na change de produto

- Status: accepted, supersedes ADR-0006
- Date: 2026-11-22
- Supersedes: ADR-0006

## Context

O ADR-0006 definiu um contrato HTTP para um backend Java específico: RFC 7807 (`ProblemDetail`), headers `X-Tenant-Id`, `X-Empresa-Id` e `X-Empresa-Filial-Id`, refresh single-flight em 401 e paginação `page`/`pageSize`. O template genérico não possui backend nem formato de erro acordado.

Preservar o ADR-0006 como obrigatório imporia um contrato de API que o próximo produto pode não usar. Não ter nenhuma camada HTTP obrigaria cada produto a recriar repositories, interceptors e tratamento de erros.

## Decision

- O template fornece apenas a **estrutura** de acesso a dados em `libs/data` e `libs/core`: repositories, um ponto único de configuração da URL da API e a costura de interceptors.
- O contrato concreto — formato de erro (RFC 7807 ou outro), headers de contexto, estratégia de autenticação, paginação, filtros e ordenação — é definido na **change de produto**, com novo ADR.
- Permanecem como regras do template: nenhuma chamada HTTP direta em componentes, nenhuma URL de API hardcoded e erros tipados e tratados de forma consistente.
- O ADR-0006 permanece como registro histórico e não é editado.

## Consequences

- **Positivo:** o template não impõe um contrato de API específico.
- **Positivo:** repositories e interceptors já têm um lugar claro para evoluir.
- **Positivo:** o produto documenta seu contrato explicitamente.
- **Negativo:** a primeira change de produto precisa decidir formato de erro e paginação.
- **Negativo:** sem um contrato comum, produtos podem divergir; a estrutura compartilhada reduz a duplicação.

## Alternatives considered

- **Manter o ADR-0006 como padrão:** rejeitado por acoplar o template a um backend e a headers de um produto.
- **Não incluir camada HTTP no template:** rejeitado por obrigar cada produto a recriar a base.
- **Adotar GraphQL como padrão:** rejeitado por decisão prematura; o backend do próximo produto ainda não é conhecido.
