---
name: security-patterns
description: >
  Princípios e padrões de segurança agnósticos a framework — autenticação JWT,
  autorização por papel/tenant, validação de entrada, OWASP Top 10, tratamento
  seguro de erros e logging de auditoria. Use antes de implementar qualquer
  fluxo de auth ou revisar segurança em qualquer camada. Para implementação
  específica de NestJS, use security-patterns-nestjs.
---

# Security Patterns

Princípios de segurança aplicáveis a qualquer stack. Consulte as skills
específicas de framework para implementação concreta.

---

## Princípios fundamentais

- **Validação sempre no servidor** — nunca confiar apenas no cliente
- **Menor privilégio** — cada papel acessa apenas o que precisa
- **Defesa em profundidade** — validar em múltiplas camadas independentes
- **Falha segura** — em caso de dúvida, negar acesso
- **Nunca expor internos** — sem stack trace, sem detalhes de banco em respostas de erro
- **Nunca logar dados sensíveis** — sem senhas, tokens ou PII em logs

---

## Autenticação — princípios

- Identidade do usuário extraída de token assinado (JWT ou equivalente) **pelo servidor**
- O token deve conter: `usuario_id`, `perfil_id`, `papel`, `organizador_id` (quando aplicável)
- Tokens armazenados de forma segura no cliente (httpOnly cookies preferencialmente)
- Expiração curta para access token; refresh token com rotação
- Toda rota protegida valida o token **antes** de qualquer lógica de negócio

## Autorização — princípios

- Autorização validada por **papel do perfil ativo** em cada requisição
- `organizador_id` **sempre extraído do token** — nunca aceito do body ou query params
- Toda query de leitura e escrita filtra por `organizador_id` (isolamento de tenant)
- Verificação de papel feita na camada de middleware/guard — nunca dentro do use-case

---

## Validação de entrada

- Toda entrada de API validada no servidor com schema (Zod, Joi, class-validator, etc.)
- Validação antes de qualquer lógica de negócio
- Rejeitar campos extras (whitelist de campos permitidos)
- Mensagens de erro de validação: descritivas para o cliente, sem expor estrutura interna

---

## Tratamento de erros — padrão de resposta

Toda resposta de erro segue o mesmo envelope:

```json
{
  "error": "TipoDoErro",
  "message": "Descrição legível para o usuário",
  "statusCode": 422
}
```

| Código | Significado | Ação no frontend |
|--------|-------------|-----------------|
| 401 | Não autenticado | Redirect para login |
| 403 | Sem permissão | Toast de permissão negada |
| 422 | Erro de validação | Exibir erros no formulário |
| 500+ | Erro interno | Toast genérico + log |

**Nunca** retornar stack trace, nome de tabela, query SQL ou detalhes de infraestrutura.

---

## OWASP Top 10 — pontos críticos

| Risco | Mitigação |
|-------|-----------|
| Broken Access Control | `organizador_id` do JWT em toda query; verificação de papel em middleware |
| Injection | ORM parametrizado (Drizzle, TypeORM, etc.) — sem SQL raw com interpolação |
| XSS | Sanitizar saída no frontend; Content-Security-Policy |
| Security Misconfiguration | Helmet/headers de segurança; CORS restrito por origem |
| Sensitive Data Exposure | HTTPS obrigatório; sem dados sensíveis em logs ou respostas |
| Broken Authentication | JWT com expiração; refresh com rotação; sem secrets em código |
| SSRF | Validar e restringir URLs externas aceitas pela aplicação |

---

## Logging de auditoria

Registrar (sem logar o conteúdo sensível):
- Login e logout
- Falhas de autenticação (com IP)
- Operações de escrita sensíveis (criação, atualização, exclusão de dados críticos)
- Tentativas de acesso negado (403)

Formato estruturado (JSON): `timestamp`, `usuario_id`, `acao`, `recurso`, `resultado`, `ip`

---

## Checklist geral de segurança

**Autenticação**
- [ ] Toda rota protegida valida token antes de qualquer lógica?
- [ ] Token com expiração configurada?
- [ ] Refresh token com rotação implementado?

**Autorização e multi-tenancy**
- [ ] `organizador_id` extraído do token (nunca do body)?
- [ ] Toda query filtra por `organizador_id`?
- [ ] Verificação de papel feita no middleware/guard?

**Validação**
- [ ] Toda entrada validada com schema no servidor?
- [ ] Campos extras rejeitados (whitelist)?

**Respostas**
- [ ] Sem stack trace em produção?
- [ ] Sem detalhes de banco ou infraestrutura nas respostas?
- [ ] Envelope de erro padronizado?

**Infraestrutura**
- [ ] CORS restrito por origem?
- [ ] Headers de segurança configurados (Helmet ou equivalente)?
- [ ] Rate limiting em rotas sensíveis (login, reset de senha)?
- [ ] Queries via ORM parametrizado (sem SQL raw com interpolação)?
- [ ] Tokens armazenados com httpOnly?
- [ ] Logging de auditoria para operações sensíveis?
