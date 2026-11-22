# 0009. Entrega do frontend (Docker/nginx e configuração em runtime)

- Status: accepted
- Date: 2026-11-20

## Context

O frontend Angular é uma SPA estática. O build precisa ser servido por um servidor web com fallback para `index.html`, headers de segurança e configuração de API por ambiente.

## Decision

Adotar:

- Build de produção com Angular CLI.
- **Docker multi-stage**: build Node 22 → runtime nginx.
- `nginx.conf` com:
  - fallback SPA (`try_files ... /index.html`);
  - gzip/brotli quando disponível;
  - headers de segurança (CSP, X-Content-Type-Options, Referrer-Policy);
  - cache de assets com hash.
- Configuração de API via `environment` no build ou `runtime-config.json` (se necessário trocar sem rebuild).
- CI publica imagem versionada.

## Consequences

- **Positivo:** deploy reproduzível e independente do backend.
- **Positivo:** cache e headers adequados.
- **Negativo:** CSP precisa ser coordenada com fontes/ícones/API.
- **Negativo:** runtime config adiciona complexidade; usar apenas se necessário.

## Alternatives considered

- **Servir pelo backend Java:** possível, mas acopla deploy e cache.
- **CDN estática:** viável em produção, mas Docker/nginx é suficiente no início.
- **Vercel/Netlify:** viável, mas adiciona dependência de provedor.
