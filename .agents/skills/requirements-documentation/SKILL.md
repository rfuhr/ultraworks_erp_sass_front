---
name: requirements-documentation
description: >
  Gera documentação de levantamento de requisitos estruturada para features do
  produto. Deve ser usada antes de qualquer implementação de feature nova,
  para registrar requisitos funcionais, não funcionais, regras de negócio,
  contratos de API, critérios de aceite e dependências.
---

# Requirements Documentation

Skill para gerar documentos de levantamento de requisitos no formato padronizado
da Ultraworks. O template segue o arquivo de referência em `docs/requirements/`.

## Quando usar

- Antes de iniciar qualquer feature nova
- Quando o usuário solicitar "levantamento de requisitos" ou "documentação de requisitos"
- Na etapa de especificação de uma feature, antes de prototipação ou implementação
- Quando houver necessidade de documentar regras de negócio, contratos de API ou critérios de aceite

## Onde salvar

O documento gerado deve ser salvo em:
```
docs/requirements/{feature}/
├── readme.md       ← documento de requisitos principal
```

> Se a feature for `login`, salvar em `docs/requirements/login/readme.md`

## Template (preenchimento humano + [AI-SUGGEST])

O documento deve seguir a estrutura abaixo. Campos marcados com `[AI-SUGGEST]`
são convites para a IA sugerir conteúdo automaticamente. O revisor humano
decide o merge final.

```markdown
---
feature: {{ slug-da-feature }}
version: 1.0.0
description: >
  {{ descrição curta gerada }}
status: draft
audience: [developers, ai-spec-generator, qa, designers]
openspec:
  suggest: true
  merge_strategy: human-review
  hint: >
    Este arquivo combina requisitos humanos estruturados com espaço para
    sugestões geradas por OpenSpec. Campos marcados com [AI-SUGGEST] podem
    ser enriquecidos automaticamente. O revisor humano decide o merge final.
---

# Feature: {{ Nome da Feature }}

> **Nota para OpenSpec:** Leia este documento integralmente antes de gerar propostas.
> Respeite as regras da seção "O que NÃO fazer". Sugestões são bem-vindas nas
> seções marcadas com `[AI-SUGGEST]`. Não sobrescreva regras de negócio existentes.

---

## 1. Visão Geral

{{ Parágrafo descrevendo o propósito da feature, o problema que resolve e o contexto de uso. }}

---

## 2. Requisitos Funcionais

### 2.1 {{ Grupo de requisitos 1 }}

| ID     | Requisito |
|--------|-----------|
| RF-01  | {{ requisito }} |
| RF-02  | {{ requisito }} |
| RF-0N  | [AI-SUGGEST] {{ área onde a IA pode sugerir requisitos adicionais }} |

### 2.2 {{ Grupo de requisitos 2 }}

| ID     | Requisito |
|--------|-----------|
| RF-10  | {{ requisito }} |
| RF-1N  | [AI-SUGGEST] {{ área onde a IA pode sugerir }} |

---

## 3. Requisitos Não Funcionais

| ID      | Categoria        | Requisito |
|---------|------------------|-----------|
| RNF-01  | Performance       | {{ requisito }} |
| RNF-02  | Responsividade    | {{ requisito }} |
| RNF-03  | Acessibilidade    | {{ requisito }} |
| RNF-04  | Segurança         | {{ requisito }} |
| RNF-05  | Manutenibilidade  | {{ requisito }} |
| RNF-06  | [AI-SUGGEST]      | {{ categoria e requisito sugeridos pela IA }} |

---

## 4. Regras de Negócio

| ID    | Regra |
|-------|-------|
| RN-01 | {{ regra }} |
| RN-02 | {{ regra }} |
| RN-0N | {{ regra }} |

---

## 5. Estrutura de Dados Esperada (Contrato de API)

> [AI-SUGGEST] A IA pode propor um schema OpenAPI 3.x para os endpoints abaixo.

### 5.1 Endpoint: {{ Nome do endpoint }}

```
{{ METHOD }} {{ /caminho/do/endpoint }}
Authorization: Bearer {token}

Response 200:
{
  {{ campos do response }}
}
```

---

## 6. Comportamento Visual de Referência

{{ Descrição do layout esperado ou referência ao protótipo. Indicar que o design final pode variar. }}

> O design final pode variar — a referência é de inspiração estrutural, não de cópia fiel.

---

## 7. O que NÃO Fazer

> **Esta seção é crítica. OpenSpec e desenvolvedores devem respeitá-la integralmente.**

- ❌ **Não** {{ restrição 1 }}
- ❌ **Não** {{ restrição 2 }}
- ❌ **Não** {{ restrição N }}

---

## 8. Critérios de Aceite

- [ ] {{ critério de aceite 1 }}
- [ ] {{ critério de aceite 2 }}
- [ ] {{ critério de aceite N }}
- [ ] [AI-SUGGEST] Sugerir casos de teste adicionais baseados nas regras de negócio acima

---

## 9. Dependências e Integrações

| Dependência | Tipo | Observação |
|-------------|------|------------|
| {{ dep 1 }} | {{ Interna / Externa }} | {{ observação }} |
| {{ dep 2 }} | {{ Interna / Externa }} | {{ observação }} |
| [AI-SUGGEST] | — | Sugerir bibliotecas ou serviços adicionais adequados |

---

## 10. Histórico de Revisões

| Versão | Data       | Autor     | Descrição |
|--------|------------|-----------|-----------|
| 1.0.0  | {{ data }} | (humano)  | Versão inicial do documento de requisitos |

---

*Este documento foi estruturado para ser lido por humanos e por sistemas de geração de especificação (OpenSpec/AI Skills). Campos marcados com `[AI-SUGGEST]` são convites explícitos para enriquecimento automático, sujeitos a revisão humana antes do merge.*
```

## Regras de preenchimento

1. **Sempre** preencher o frontmatter (feature, version, description, status)
2. **Nunca** remover seções — se não aplicável, marcar como "N/A"
3. Preferir IDs sequenciais por tipo: `RF-01`, `RF-02`, `RN-01`, `RNF-01`
4. Atualizar `docs/requirements/portal/readme.md` se a feature se relaciona com o portal
5. Seção "O que NÃO Fazer" é **crítica** — deve ser preenchida com restrições reais
6. Critérios de aceite devem ser verificáveis (testáveis)
7. Toda dependência externa deve ter versão ou link de referência
