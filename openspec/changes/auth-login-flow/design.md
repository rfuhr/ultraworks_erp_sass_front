## Context

O congresso tem uma tela de login funcional, mas baseada em perfil/organizador e cookie de sessão. O backend Java do ERP usa tenant + e-mail + senha, access token JWT e refresh. O frontend precisa reaproveitar a estrutura visual e adaptar o contrato.

## Goals / Non-Goals

**Goals:**

- Login com tenant/e-mail/senha.
- Sessão com access token em memória e refresh.
- Guards e interceptor.
- Seleção de empresa/filial.
- Logout e recuperação de senha.
- Erros claros e acessíveis.

**Non-Goals:**

- MFA/SSO.
- Cadastro público.
- Billing.
- Telas de negócio.

## Decisions

### D1 — Estrutura visual

Reaproveitar o layout de card centralizado, logo, formulário e estados do congresso. Adaptar campos e mensagens.

### D2 — Tokens

Access token em memória; refresh em cookie HttpOnly (ADR-0004). `withCredentials: true`. Fallback de memória apenas em dev.

### D3 — Refresh single-flight

Em 401, uma única chamada de refresh; demais requests aguardam e repetem. Se falhar, logout.

### D4 — Guards

`authGuard` (sessão), `tenantGuard` (tenant ativo), `permissionGuard` (permissões do token).

### D5 — Contexto

Após login, carregar memberships/empresas/filiais. Se múltiplas, abrir seletor; senão, selecionar automaticamente.

### D6 — Erros

Credenciais inválidas → mensagem genérica. Tenant suspenso → mensagem específica. Lockout → tempo de espera. Rede → retry.

### D7 — Acessibilidade

Labels associados, `aria-invalid`, `aria-describedby`, foco no primeiro erro, submissão por Enter.

## Risks / Trade-offs

| Risco | Mitigação |
|---|---|
| Refresh em loop | Single-flight + logout em falha |
| Cookie não setado pelo backend | Ajuste no `identity-auth`; fallback dev |
| Múltiplas abas | Coordenação futura (BroadcastChannel/Web Locks) |
| Vazamento de token | Sem localStorage; CSP; sem logs |
| UX de lockout | Mensagem clara com `Retry-After` |

## Migration Plan

Substituir a tela de login do congresso pela versão ERP. Rollback: rota antiga temporária.

## Open Questions

1. Refresh em cookie ou body? (recomendação: cookie)
2. MFA na fase 2?
3. “Lembrar tenant” por quanto tempo?
4. Comportamento com múltiplos tenants + múltiplas filiais.
5. SSO futuro.
