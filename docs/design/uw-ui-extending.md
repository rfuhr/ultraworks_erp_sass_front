# Estendendo a uw-ui (Faixa B)

Os componentes abaixo são **opt-in**: não estão no `package.json` padrão nem no
bundle do template. Instale as dependências somente quando o produto precisar.

## html-editor (Quill)

Dependências:

```bash
pnpm add ngx-quill quill
```

Passos:

1. Copie `html-editor/` do projeto de referência para
   `libs/uw-ui/src/lib/html-editor/`.
2. Exporte o componente em `libs/uw-ui/src/public-api.ts`.
3. Registre o provider do Quill no app:

```ts
import { provideQuillConfig } from 'ngx-quill/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link'],
        ],
      },
    }),
  ],
};
```

4. Importe o tema do Quill em `styles.scss`:

```scss
@import 'quill/dist/quill.snow.css';
```

5. Crie história e testes antes de usar em produção.

## scheduler (rrule)

Dependências:

```bash
pnpm add rrule
```

Passos:

1. Copie `scheduler/` para `libs/uw-ui/src/lib/scheduler/`.
2. Exporte as classes e tipos em `public-api.ts`.
3. Garanta que o componente receba eventos por input e emita ações por output
   (sem serviços de domínio).
4. Crie histórias para as views `day`, `week`, `month` e `agenda`.
5. Adicione testes de teclado e de drag-and-drop.

## Regras para qualquer extensão

- Componente novo nasce em `libs/uw-ui/src/lib/` com prefixo `uw-`.
- Não importar `core`, `data`, `i18n` ou features dentro da `uw-ui`.
- História no Storybook e testes são obrigatórios.
- Se a dependência for pesada, mantenha o componente fora do bundle padrão.
