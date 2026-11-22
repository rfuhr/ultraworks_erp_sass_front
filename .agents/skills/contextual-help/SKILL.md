---
name: contextual-help
description: Gera conteúdo de ajuda contextual para formulários e telas usando o componente uw-help + uw-drawer. Deve ser usada sempre que uma tela com formulário ou funcionalidade não trivial for implementada.
---

# Contextual Help

Geração de conteúdo de ajuda contextual para telas do sistema, usando o componente `uw-help` que abre um drawer à direita.

## Como usar

1. **Pergunte ao desenvolvedor** se a funcionalidade terá conteúdo de ajuda
2. Se sim, **identifique os campos e regras de negócio** que precisam de explicação
3. **Crie o arquivo de conteúdo** em `src/app/libs/uw-ui/src/lib/help/content/<feature-name>.ts`
4. **Integre o `uw-help`** no template da tela/componente

## Template do arquivo de conteúdo

Criar em `src/app/libs/uw-ui/src/lib/help/content/<feature-name>.ts`:

```ts
import type { HelpContent } from '../uw-help.component';

export const <camelCaseName>Help: HelpContent = {
  title: 'Ajuda: <Nome da Tela>',
  sections: [
    {
      id: '<campo-id>',
      title: '<Nome do Campo>',
      body: '<Explicação do campo em português>',
      rules: ['<Regra de negócio 1>', '<Regra de negócio 2>'],
    },
  ],
};
```

### Estrutura de cada section

| Campo | Descrição |
|-------|-----------|
| `id` | Identificador único da seção (usado para scroll/foco) |
| `title` | Título da seção (nome do campo ou conceito) |
| `body` | Explicação em texto, com exemplos quando possível |
| `rules` | Lista de regras de negócio relacionadas ao campo |

## Integração no template

No template do formulário/tela, adicionar o `uw-help` no footer:

```html
<uw-help [content]="minhaFeatureHelp" />
```

E no componente, importar:

```ts
import { UwHelpComponent } from '../../libs/uw-ui/src/lib/help/uw-help.component';
import { minhaFeatureHelp } from '../../libs/uw-ui/src/lib/help/content/minha-feature';

// Adicionar como class property:
readonly minhaFeatureHelp = minhaFeatureHelp;
```

## Boas práticas

- **Seções por campo ou conceito**: cada campo que pode gerar dúvida vira uma section
- **Exemplos concretos**: `body` deve conter exemplos reais (Ex: Brasil = BR)
- **Regras visíveis**: regras como "Não pode haver duplicidade" devem estar em `rules`, não no `body`
- **Mensagens curtas**: título máximo 40 caracteres, body máximo 200 caracteres
- **i18n futuro**: o conteúdo já é escrito em português; quando houver i18n, cada locale terá seu arquivo
