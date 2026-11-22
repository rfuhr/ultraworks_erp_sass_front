---
name: testing-patterns-angular
description: >
  Implementação de testes específica para Angular — testes de repository com
  HttpTestingController, testes de componente com Angular Testing Library,
  testes de service/guard com TestBed, e E2E com Playwright. Use em conjunto
  com testing-patterns (princípios gerais). Obrigatória para os agentes
  frontend e testing ao trabalhar com Angular.
---

# Testing Patterns — Angular

Implementação concreta de testes para Angular com Jest + Angular Testing Library.
Consulte `testing-patterns` para princípios gerais e metas de cobertura.

---

## Repository HTTP — HttpTestingController

```typescript
// data/evento.repository.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventoRepository } from './evento.repository';
import { environment } from '../../environments/environment';

describe('EventoRepository', () => {
  let repo: EventoRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventoRepository],
    });
    repo = TestBed.inject(EventoRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify()); // garante que não há requests pendentes

  it('should GET all events for the authenticated tenant', () => {
    // Arrange
    const eventosMock = [{ id: '1', titulo: 'projeto de refer�ncia' }, { id: '2', titulo: 'Seminário' }];

    // Act
    repo.listar().subscribe(eventos => {
      // Assert
      expect(eventos.length).toBe(2);
      expect(eventos[0].titulo).toBe('projeto de refer�ncia');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/eventos`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: eventosMock });
  });

  it('should return empty array when no events exist', () => {
    repo.listar().subscribe(eventos => {
      expect(eventos).toEqual([]);
    });

    httpMock.expectOne(`${environment.apiUrl}/eventos`).flush({ data: [] });
  });

  it('should POST to create event', () => {
    const dto = { titulo: 'Novo Evento' };

    repo.criar(dto).subscribe(evento => {
      expect(evento.titulo).toBe('Novo Evento');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/eventos`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dto);
    req.flush({ data: { id: '1', ...dto } });
  });
});
```

---

## Componente — Angular Testing Library

Testa comportamento do ponto de vista do usuário — não implementação.

```typescript
// features/eventos/components/evento-card/evento-card.component.spec.ts
import { render, screen, fireEvent } from '@testing-library/angular';
import { EventoCardComponent } from './evento-card.component';

const eventoMock = {
  id: '1',
  titulo: 'projeto de refer�ncia de TI 2026',
  status: 'publicado',
  dataInicio: '2026-12-01',
};

describe('EventoCardComponent', () => {
  it('should render event title', async () => {
    await render(EventoCardComponent, {
      componentInputs: { evento: eventoMock },
    });

    expect(screen.getByText('projeto de refer�ncia de TI 2026')).toBeInTheDocument();
  });

  it('should emit edit event on button click', async () => {
    const onEdit = jest.fn();

    await render(EventoCardComponent, {
      componentInputs: { evento: eventoMock },
      componentOutputs: { editar: { emit: onEdit } as any },
    });

    fireEvent.click(screen.getByRole('button', { name: /editar/i }));
    expect(onEdit).toHaveBeenCalledWith(eventoMock.id);
  });

  it('should show status badge with correct text', async () => {
    await render(EventoCardComponent, {
      componentInputs: { evento: { ...eventoMock, status: 'rascunho' } },
    });

    expect(screen.getByText(/rascunho/i)).toBeInTheDocument();
  });
});
```

---

## Service com Signal — teste com TestBed

```typescript
// features/eventos/eventos.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { EventosService } from './eventos.service';
import { EventoRepository } from '../../data/evento.repository';
import { of } from 'rxjs';

describe('EventosService', () => {
  let service: EventosService;
  const mockRepo = {
    listar: jest.fn(),
    criar: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventosService,
        { provide: EventoRepository, useValue: mockRepo },
      ],
    });
    service = TestBed.inject(EventosService);
    jest.clearAllMocks();
  });

  it('should load events into signal', async () => {
    mockRepo.listar.mockReturnValue(of([{ id: '1', titulo: 'Evento' }]));

    await service.carregarEventos();

    expect(service.eventos()).toHaveLength(1);
  });

  it('should return empty array when repository returns empty', async () => {
    mockRepo.listar.mockReturnValue(of([]));

    await service.carregarEventos();

    expect(service.eventos()).toEqual([]);
  });
});
```

---

## Guard — teste com TestBed

```typescript
// core/guards/auth.guard.spec.ts
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const mockRouter = { navigate: jest.fn() };
  const mockAuth = { isAuthenticated: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuth },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should allow access when authenticated', () => {
    mockAuth.isAuthenticated.mockReturnValue(true);
    expect(guard.canActivate()).toBe(true);
  });

  it('should redirect to login when not authenticated', () => {
    mockAuth.isAuthenticated.mockReturnValue(false);
    guard.canActivate();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
```

---

## Pipe — teste unitário simples

```typescript
// shared/pipes/data-locale.pipe.spec.ts
import { DataLocalePipe } from './data-locale.pipe';

describe('DataLocalePipe', () => {
  let pipe: DataLocalePipe;

  beforeEach(() => { pipe = new DataLocalePipe(); });

  it('should format date in pt-BR', () => {
    expect(pipe.transform('2026-12-01', 'pt-BR')).toBe('01/12/2026');
  });

  it('should format date in en', () => {
    expect(pipe.transform('2026-12-01', 'en')).toBe('12/01/2026');
  });

  it('should return empty string for null input', () => {
    expect(pipe.transform(null, 'pt-BR')).toBe('');
  });
});
```

---

## i18n — teste de componente multilíngue

```typescript
it('should display error message in pt-BR', async () => {
  await render(FormularioEventoComponent, {
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
    componentInputs: { erro: 'campo_obrigatorio' },
  });
  expect(screen.getByText('Este campo é obrigatório')).toBeInTheDocument();
});

it('should display error message in en', async () => {
  await render(FormularioEventoComponent, {
    providers: [{ provide: LOCALE_ID, useValue: 'en' }],
    componentInputs: { erro: 'campo_obrigatorio' },
  });
  expect(screen.getByText('This field is required')).toBeInTheDocument();
});
```

---

## E2E — Playwright (fluxos críticos do usuário)

```typescript
// e2e/login.e2e-spec.ts
import { test, expect } from '@playwright/test';

test.describe('Autenticação', () => {
  test('user can log in as organizador', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'org@test.com');
    await page.fill('[data-testid="senha"]', 'Senha@123');
    await page.click('[data-testid="btn-entrar"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: /bem-vindo/i })).toBeVisible();
  });

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email"]', 'errado@test.com');
    await page.fill('[data-testid="senha"]', 'senhaerrada');
    await page.click('[data-testid="btn-entrar"]');

    await expect(page.getByText(/credenciais inválidas/i)).toBeVisible();
    await expect(page).toHaveURL('/login');
  });
});
```

---

## data-testid — convenção obrigatória para E2E

Todo elemento interativo testável em E2E deve ter `data-testid`:

```html
<button data-testid="btn-criar-evento">Criar Evento</button>
<input data-testid="input-titulo" />
<mat-select data-testid="select-status" />
```

**Nunca** selecionar por classe CSS ou estrutura DOM em testes E2E.

---

## Checklist Angular — testes

- [ ] Repository testado com `HttpTestingController` (sem chamada HTTP real)?
- [ ] `httpMock.verify()` no `afterEach`?
- [ ] Componentes testados via Angular Testing Library (comportamento, não estrutura)?
- [ ] Guards testados com `TestBed`?
- [ ] Pipes testados como classes simples (sem TestBed)?
- [ ] `data-testid` em todos os elementos interativos para E2E?
- [ ] Testes de i18n para pt-BR, es e en?
- [ ] E2E cobre apenas fluxos críticos (login, criação, edição)?
