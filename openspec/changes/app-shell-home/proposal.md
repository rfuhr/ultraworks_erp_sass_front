## Why

Depois do login, o usuário precisa de um shell consistente e de uma página inicial. O congresso já tem um layout administrativo maduro (`uw-admin-layout`) e um menu configurável. O ERP precisa adaptar isso para módulos de ERP, contexto de tenant/empresa/filial e permissões.

## What Changes

- Criar o **shell autenticado** com sidebar, header, subheader/breadcrumb e conteúdo.
- Criar o **menu** por permissões/features do ERP.
- Criar as **rotas** `/app`, `/app/home` e placeholders dos módulos.
- Criar a **home/dashboard** com stat cards, gráficos e atividades recentes.
- Criar páginas **403, 404 e erro**.
- Implementar **responsividade** e colapso da sidebar.
- Cobrir com testes.

## Capabilities

### New Capabilities

- `app-shell`: layout autenticado, header, sidebar, breadcrumb e responsividade.
- `navigation-menu`: menu por permissões, rotas ativas e colapso.
- `home-dashboard`: página inicial com indicadores, gráficos e atalhos.
- `error-pages`: 403, 404 e erro genérico.

### Modified Capabilities

Nenhuma — o shell não existia.

## Non-goals

- Módulos de negócio completos (estoque, financeiro, fiscal etc.).
- Componentes `uw-ui` (change anterior).
- Login (change anterior).
- Integração de dados reais além dos placeholders/mocks.

## Impact

- **Layout:** `src/app/layout/root-layout.component.*`.
- **Core:** `menu-config`, `sidebar-state`.
- **Features:** `home`, placeholders de módulos.
- **Rotas:** `app.routes.ts`.
- **Sem mudança de contrato de API.**
