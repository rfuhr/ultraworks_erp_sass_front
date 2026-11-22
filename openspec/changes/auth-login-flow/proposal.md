## Why

O frontend ainda não tem autenticação. O ERP SaaS precisa de login multi-tenant, sessão com refresh, guards, seleção de empresa/filial e recuperação de senha. A estrutura visual do login do congresso será reaproveitada, mas o contrato é o do backend Java.

## What Changes

- Criar a página de **login** com tenant + e-mail + senha.
- Criar **AuthService** com access token em memória e refresh.
- Criar **guards** (`authGuard`, `tenantGuard`, `permissionGuard`).
- Criar **interceptor** de autenticação e refresh single-flight.
- Criar **seleção de contexto** (tenant/empresa/filial).
- Criar **logout** e limpeza de sessão.
- Criar **esqueci minha senha** e **redefinir senha**.
- Criar modelos/repository de auth.
- Tratar erros (credenciais, tenant suspenso, lockout, rede).
- Cobrir com testes e E2E.

## Capabilities

### New Capabilities

- `login-ui`: tela de login, validação, estados e redirecionamento.
- `session-management`: access token, refresh, logout, guards e interceptor.
- `tenant-context`: seleção de tenant/empresa/filial e headers.
- `password-recovery`: solicitação e redefinição de senha.

### Modified Capabilities

Nenhuma — não há autenticação anterior.

## Non-goals

- MFA/SSO/SAML.
- Billing.
- Telas de negócio.
- Cadastro público de tenant.
- Perfil/avatar completo.

## Impact

- **Features:** `features/auth/login`, `features/auth/forgot-password`, `features/auth/reset-password`.
- **Core:** `auth.service`, `session.service`, `guards`, `interceptors`, `models`.
- **Data:** `repositories/auth`.
- **API:** `/auth/login`, `/auth/refresh`, `/auth/logout`, `/auth/me`, `/auth/switch-tenant`, `/auth/forgot-password`, `/auth/reset-password`.
