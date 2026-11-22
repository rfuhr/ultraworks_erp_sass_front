## 1. Modelos e repository

- [ ] 1.1 Criar `LoginRequest`, `LoginResponse`, `TokenPayload`, `Membership`
- [ ] 1.2 Criar `AuthRepository` com login/refresh/logout/me/switch-tenant
- [ ] 1.3 Criar `PasswordRecoveryRepository`
- [ ] 1.4 Testar repository com `HttpTestingController`

## 2. AuthService e sessão

- [ ] 2.1 Criar `AuthService` com signals de usuário/tenant/permissões
- [ ] 2.2 Implementar armazenamento de access token em memória
- [ ] 2.3 Implementar refresh token (cookie/body) e single-flight
- [ ] 2.4 Implementar logout e limpeza de estado
- [ ] 2.5 Implementar `me`/restauração de sessão
- [ ] 2.6 Testar auth service e refresh

## 3. Guards e interceptors

- [ ] 3.1 Criar `authGuard`
- [ ] 3.2 Criar `tenantGuard`
- [ ] 3.3 Criar `permissionGuard`
- [ ] 3.4 Criar `authInterceptor` (Bearer)
- [ ] 3.5 Criar `contextInterceptor` (tenant/empresa/filial)
- [ ] 3.6 Testar guards e interceptor

## 4. Tela de login

- [ ] 4.1 Criar layout do login (card centralizado)
- [ ] 4.2 Criar campos tenant/e-mail/senha
- [ ] 4.3 Implementar validação e erros inline
- [ ] 4.4 Implementar loading/disabled
- [ ] 4.5 Tratar credenciais inválidas, tenant suspenso, lockout e rede
- [ ] 4.6 Implementar “lembrar tenant”
- [ ] 4.7 Acessibilidade (labels, aria, foco)
- [ ] 4.8 Testes de componente
- [ ] 4.9 E2E de login

## 5. Contexto (tenant/empresa/filial)

- [ ] 5.1 Criar `ContextService`
- [ ] 5.2 Carregar memberships/empresas/filiais após login
- [ ] 5.3 Criar seletor de contexto
- [ ] 5.4 Selecionar automaticamente quando único
- [ ] 5.5 Enviar headers de contexto nas requisições
- [ ] 5.6 Persistir contexto na sessão
- [ ] 5.7 Testes de contexto

## 6. Recuperação de senha

- [ ] 6.1 Criar tela “esqueci minha senha”
- [ ] 6.2 Criar tela “redefinir senha”
- [ ] 6.3 Integrar endpoints
- [ ] 6.4 Tratar token inválido/expirado
- [ ] 6.5 Acessibilidade e testes
- [ ] 6.6 E2E de recuperação

## 7. Rotas e erros

- [ ] 7.1 Configurar rotas `/auth/login`, `/auth/forgot-password`, `/auth/reset-password`
- [ ] 7.2 Redirecionar para `/app/home` ou seletor
- [ ] 7.3 Tratar 401/403
- [ ] 7.4 Criar página de acesso negado (se não existir)
- [ ] 7.5 Testes de navegação

## 8. Documentação e validação

- [ ] 8.1 Documentar fluxo de login em `docs/login-and-shell.md`
- [ ] 8.2 Documentar contrato em `docs/api-contract.md`
- [ ] 8.3 Rodar `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`
- [ ] 8.4 Rodar `pnpm e2e`
- [ ] 8.5 Rodar `openspec validate auth-login-flow --strict`
- [ ] 8.6 Revisar acessibilidade e segurança
- [ ] 8.7 Atualizar `tasks.md`
