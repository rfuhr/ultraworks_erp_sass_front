---
name: testing-patterns
description: >
  Princípios e padrões de teste agnósticos a framework — tipos de teste por
  camada, padrão AAA, regras de qualidade, metas de cobertura e testes de i18n.
  Use como base antes de consultar skills específicas de stack (testing-patterns-nestjs,
  testing-patterns-angular). Aplicável a qualquer projeto da Ultraworks.
---

# Testing Patterns

Princípios de teste aplicáveis a qualquer stack. Consulte as skills específicas
para implementação concreta com Angular ou NestJS.

---

## Tipos de teste por camada

| Camada | Tipo | O que testa | Velocidade |
|--------|------|-------------|-----------|
| Unitário | Função/classe isolada com mocks | Lógica de negócio pura (use-cases, pipes, services) | ⚡ Muito rápido |
| Componente | Componente + dependências reais | Comportamento do componente do ponto de vista do usuário | ⚡ Rápido |
| Integração | Múltiplas camadas reais | Controller + use-case + repository + banco | 🐢 Médio |
| E2E | Aplicação completa no browser | Fluxos críticos do usuário | 🐢 Lento |

**Princípio da pirâmide**: muitos unitários, alguns integração, poucos E2E.

---

## Padrão AAA — obrigatório em todos os testes

```
Arrange  → preparar dados, mocks e estado inicial
Act      → executar a ação que está sendo testada
Assert   → verificar o resultado esperado
```

Cada teste valida **uma única coisa**. Nome do teste descreve o comportamento, não a implementação.

```
✅ 'should return 404 when event does not exist'
❌ 'test buscarPorId method'
```

---

## Cenários obrigatórios por endpoint/use-case

Todo endpoint ou use-case deve ter testes para:

- [ ] **Sucesso** — caminho feliz com dados válidos
- [ ] **Não encontrado** — recurso inexistente (404)
- [ ] **Validação** — entrada inválida (422)
- [ ] **Não autorizado** — sem token (401)
- [ ] **Sem permissão** — papel insuficiente (403)
- [ ] **Lista vazia** — retorna array vazio, não erro

---

## Metas de cobertura

| Área | Mínimo | Justificativa |
|------|--------|---------------|
| Use-cases (backend) | 80% | Lógica de negócio crítica |
| Repositories (backend) | 70% | Acesso a dados |
| Controllers (backend) | 70% | Integração HTTP |
| `core/` e `data/` (frontend) | 80% | Serviços e repositories HTTP |
| `features/` (frontend) | 70% | Features de produto |
| `shared/` pipes e directives | 100% | Utilitários reutilizáveis |

Cobertura é **piso**, não meta. Um teste ruim que só aumenta cobertura é pior que nenhum.

---

## Regras de qualidade

- **Testar comportamento, não implementação** — se refatorar sem mudar comportamento, os testes não devem quebrar
- **Testes determinísticos** — o mesmo teste sempre produz o mesmo resultado
- **Testes isolados** — nenhum teste depende de outro; ordem de execução não importa
- **Sem lógica condicional em testes** — sem `if`, `switch` ou loops; um caminho por teste
- **Mocks apenas no necessário** — prefira dependências reais quando viável e rápido
- **Não testar a linguagem** — não testar getters/setters triviais ou construtores simples

---

## Testes de i18n — obrigatório no o produto

O sistema suporta pt-BR, es e en. Testes devem garantir:

- Componentes renderizam corretamente com diferentes idiomas
- Textos traduzidos são exibidos (não as chaves de tradução)
- Datas, números e moedas formatados conforme o locale ativo
- Fallback para pt-BR quando idioma não suportado for detectado
- Layout não quebra com textos longos (pt-BR) ou curtos (en)

---

## Estratégia de banco em testes de backend

| Estratégia | Quando usar | Prós | Contras |
|------------|-------------|------|---------|
| In-memory (better-sqlite3 + Drizzle) | Testes unitários e de componente rápidos | Muito rápido | Dialeto diferente do PostgreSQL |
| Testcontainers (PostgreSQL real) | Testes de integração e CI | Fidelidade total | Mais lento para subir |

Prefira **testcontainers em CI** para garantia de fidelidade ao ambiente de produção.

---

## Nomenclatura de arquivos de teste

```
{nome}.spec.ts         → testes unitários e de componente
{nome}.e2e-spec.ts     → testes E2E
```

Localização: ao lado do arquivo testado (não em pasta separada `__tests__`).

---

## Checklist geral de testes

- [ ] Padrão AAA seguido em todos os testes?
- [ ] Nome do teste descreve o comportamento?
- [ ] 6 cenários base cobertos (sucesso, 404, 422, 401, 403, vazio)?
- [ ] Metas de cobertura por camada atingidas?
- [ ] Testes isolados (sem dependência entre eles)?
- [ ] Testes de i18n para componentes com texto traduzido?
- [ ] Nenhum teste com lógica condicional?
