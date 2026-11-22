---
name: stitch-prototyping
description: >
  Fluxo de prototipação de telas com artefatos salvos localmente em
  docs/design/prototypes/. Use esta skill para saber quando criar um protótipo
  novo, quando ler um existente, como extrair estrutura visual, e como salvar os
  artefatos. Obrigatória para o agente design.
---

# Prototipação Local

Fluxo de prototipação de telas do ERP SaaS com artefatos salvos localmente.

> Protótipos ficam em `docs/design/prototypes/<nome-da-tela>/`

---

## Quando prototipar

| Situação | Ação |
|----------|------|
| Proposta referencia uma tela nova | Criar protótipo e salvar na pasta |
| Proposta referencia tela existente | Verificar se protótipo já existe em `docs/design/prototypes/` |
| Design system precisa de novo componente | Prototipar o componente isolado |

---

## Fluxo: criar novo protótipo

```
1. Identificar o nome da tela (ex: "lista-de-eventos", "detalhe-inscricao")

2. Criar protótipo usando a ferramenta de preferência 
   (Google Stitch diretamente no navegador, Figma, ou HTML/CSS manual)

3. Capturar screenshot da tela → screenshot.png

4. Extrair/exportar o código HTML → codigo.html

5. Salvar artefatos em:
   docs/design/prototypes/<nome-da-tela>/
   ├── screenshot.png      ← imagem do protótipo
   ├── codigo.html         ← código HTML exportado
   └── README.md           ← mapeamento (ver template abaixo)

6. Mapear contra docs/design-system.md
```

---

## Fluxo: ler protótipo existente

```
1. Verificar se docs/design/prototypes/<nome-da-tela>/ existe

2. Ler screenshot.png (para referência visual)
   └── Se não existir, informar que protótipo não foi criado ainda

3. Ler codigo.html para extrair estrutura visual

4. Mapear contra docs/design-system.md
```

---

## Template: README.md do protótipo

```markdown
# [Nome da Tela]

**Data:** [data]
**Agente:** design

## Tokens utilizados

### Cores
- [token]: [uso nesta tela]

### Tipografia
- [token]: [uso nesta tela]

### Espaçamento
- [token]: [uso nesta tela]

## Componentes reutilizáveis identificados

| Componente | Localização sugerida | Status |
|------------|---------------------|--------|
| [nome] | shared/uw-ui/[pasta] (UI primitive) ou shared/components/[pasta] (page-level) | novo / existente |

## Componentes `uw-ui` utilizados

- [uw-componente]: [uso]

## Utilitários Tailwind necessários

- [classe]: [uso]

## Novos padrões para design system

> Liste aqui qualquer padrão visual novo que deva ser adicionado ao design system.
- [padrão]: [descrição]
```

---

## Regras de prototipação

- Todo protótipo deve usar **exclusivamente** os tokens do design system
- Sem glassmorphism, gradientes em dashboards, border-radius > 12px
- Testar layout com textos longos (português tem palavras longas) e curtos (en)
- Headers de página: H1 simples, alinhado à esquerda
- Sidebar: 240px fixa, sem sombra externa
- Nenhum "Hero section" em ferramentas internas

## Estrutura de pastas de protótipos

```
docs/design/prototypes/
├── lista-de-eventos/
│   ├── screenshot.png
│   ├── codigo.html
│   └── README.md
├── detalhe-inscricao/
│   ├── screenshot.png
│   ├── codigo.html
│   └── README.md
└── ...
```

## Integração com design system

Após cada prototipação, verifique:
1. Algum componente novo foi criado que não existe no design system?
2. Algum token foi usado de forma diferente do documentado?
3. Algum padrão de layout novo foi introduzido?

Se sim → atualizar `docs/design-system.md` antes de passar para o `frontend`.
