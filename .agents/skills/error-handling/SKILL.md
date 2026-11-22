---
name: error-handling
description: Padrões de tratamento de erros cross-cutting — formato único de resposta, interceptors frontend, exception filter backend e i18n em mensagens de erro
---

# Error Handling

Formato único de resposta de erro em todas as camadas:

```json
{ "error": "TipoDoErro", "message": "Descrição legível", "statusCode": 422 }
```

## Frontend

`ErrorInterceptor` global captura erros HTTP e roteia por código:

| Status | Ação |
|--------|------|
| 401 | Redirecionar para `/auth/login` |
| 403 | Exibir toast de permissão negada |
| 422 | Exibir erro no formulário |
| 500+ | Exibir toast genérico de erro |

`ErrorHandlerService` centraliza logging e exibição.

## Backend

`GlobalExceptionFilter` captura exceções e retorna respostas padronizadas. Converte:

- `HttpException` → status + message original
- `DominioException` → 422 Unprocessable Entity
- Erro não mapeado → 500 Internal Server Error

Logging estruturado em todas as camadas (use-case, repository, controller).

## Internacionalização

- Mensagens de erro devem respeitar o header `Accept-Language`
- Mensagens centralizadas em arquivo de tradução — nunca hardcoded
- Use-cases lançam `DominioException` com código de erro, não texto final

## Checklist

- [ ] Resposta de erro segue formato `{ error, message, statusCode }`?
- [ ] Frontend trata 401, 403, 422, 500+ adequadamente?
- [ ] Backend possui GlobalExceptionFilter?
- [ ] Exceções de domínio são mapeadas para 422?
- [ ] Mensagens de erro respeitam `Accept-Language`?
