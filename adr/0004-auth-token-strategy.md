# 0004. Estratégia de tokens de autenticação

- Status: accepted
- Date: 2026-11-20

## Context

O backend Java emite access token JWT e refresh token. O frontend precisa armazenar esses tokens com segurança, suportar refresh automático, logout e troca de tenant. O congresso usava cookie de sessão; o ERP usa JWT + refresh.

## Decision

Adotar o contrato alvo:

- **Access token em memória** (signal no `AuthService`).
- **Refresh token em cookie HttpOnly/Secure/SameSite** definido pelo backend.
- `HttpClient` com `withCredentials: true`.
- Refresh automático em 401, com **single-flight** (uma única chamada concorrente).
- Logout limpa estado, cookie e cache.
- **Nunca** armazenar refresh token em `localStorage`/`sessionStorage`.

Enquanto o backend não setar o cookie, usar fallback de memória apenas em desenvolvimento.

## Consequences

- **Positivo:** reduz risco de XSS roubar refresh token.
- **Positivo:** access token de curta duração em memória.
- **Negativo:** exige ajuste no backend (`identity-auth`) para setar cookie.
- **Negativo:** refresh em múltiplas abas exige coordenação (BroadcastChannel/Web Locks no futuro).

## Alternatives considered

- **Access + refresh em localStorage:** rejeitado por risco de XSS.
- **Somente cookie de sessão:** viável, mas menos adequado a clientes de API.
- **Access token em cookie:** dificulta uso por clientes não-browser.
