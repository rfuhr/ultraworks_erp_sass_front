import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { UwTableComponent } from './uw-table.component';
import { UwColTplDirective } from './uw-col-tpl.directive';
import type { UwTableColumn } from './uw-table.types';

interface TestItem {
  id: string;
  nome: string;
  email: string;
  status: string;
}

const COLS: UwTableColumn[] = [
  { key: 'nome', header: 'Nome', sortable: true, filterable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'status', header: 'Status', sortable: false },
];

const DATA: TestItem[] = [
  { id: '1', nome: 'Maria', email: 'maria@teste.com', status: 'ativo' },
  { id: '2', nome: 'João', email: 'joao@teste.com', status: 'inativo' },
  { id: '3', nome: 'Ana', email: 'ana@teste.com', status: 'ativo' },
];

describe('UwTableComponent', () => {
  async function setup(config?: { template?: string }): Promise<{
    fixture: ComponentFixture<TestHostComponent>;
    component: TestHostComponent;
  }> {
    @Component({
      standalone: true,
      imports: [UwTableComponent, UwColTplDirective],
      template: config?.template ?? `
        <uw-table
          [columns]="cols"
          [data]="data"
          [selectionMode]="selectionMode()"
          [rowSize]="rowSize()"
          [globalFilter]="globalFilter()"
          [loading]="loading()"
          [lazy]="lazy()"
          [totalRecords]="totalRecords()"
          (lazyLoad)="onLazyLoad($event)"
          (selectionChange)="onSelectionChange($event)" />
      `,
    })
    class TestHostComponent {
      readonly cols = COLS;
      readonly data = DATA;
      readonly selectionMode = signal<'none' | 'single' | 'multiple'>('none');
      readonly rowSize = signal<'sm' | 'md' | 'lg'>('md');
      readonly globalFilter = signal('');
      readonly loading = signal(false);
      readonly lazy = signal(false);
      readonly totalRecords = signal(0);
      lazyEvent: unknown = null;
      selectionEvent: unknown[] | null = null;

      onLazyLoad(e: unknown): void { this.lazyEvent = e; }
      onSelectionChange(e: unknown[]): void { this.selectionEvent = e; }
    }

    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    return { fixture, component: fixture.componentInstance };
  }

  describe('renderização de colunas dinâmicas', () => {
    it('deve exibir headers das colunas', async () => {
      const { fixture } = await setup();
      const ths = fixture.nativeElement.querySelectorAll('.uw-table__header-cell');
      expect(ths.length).toBe(3);
      expect(ths[0].textContent).toContain('Nome');
      expect(ths[1].textContent).toContain('Email');
      expect(ths[2].textContent).toContain('Status');
    });

    it('deve exibir dados nas linhas', async () => {
      const { fixture } = await setup();
      const rows = fixture.nativeElement.querySelectorAll('.uw-table__row');
      expect(rows.length).toBe(3);
      expect(rows[0].textContent).toContain('Maria');
      expect(rows[1].textContent).toContain('João');
    });
  });

  describe('ordenação client-side', () => {
    it('deve ordenar ascendente ao clicar no header', async () => {
      const { fixture } = await setup();
      const nomeHeader = fixture.nativeElement.querySelectorAll('.uw-table__header-cell')[0];
      nomeHeader.click();
      fixture.detectChanges();
      const cells = fixture.nativeElement.querySelectorAll('.uw-table__row:first-child .uw-table__cell');
      expect(cells[0].textContent).toContain('Ana');
    });

    it('deve inverter para descendente no segundo clique', async () => {
      const { fixture } = await setup();
      const nomeHeader = fixture.nativeElement.querySelectorAll('.uw-table__header-cell')[0];
      nomeHeader.click();
      fixture.detectChanges();
      nomeHeader.click();
      fixture.detectChanges();
      const cells = fixture.nativeElement.querySelectorAll('.uw-table__row:first-child .uw-table__cell');
      expect(cells[0].textContent).toContain('Maria');
    });

    it('deve remover ordenação no terceiro clique', async () => {
      const { fixture } = await setup();
      const nomeHeader = fixture.nativeElement.querySelectorAll('.uw-table__header-cell')[0];
      nomeHeader.click();
      fixture.detectChanges();
      nomeHeader.click();
      fixture.detectChanges();
      nomeHeader.click();
      fixture.detectChanges();
      const cells = fixture.nativeElement.querySelectorAll('.uw-table__row:first-child .uw-table__cell');
      expect(cells[0].textContent).toContain('Maria');
    });
  });

  describe('filtro global', () => {
    it('deve filtrar dados por texto', async () => {
      const { fixture, component } = await setup();
      component.globalFilter.set('maria');
      fixture.detectChanges();
      const rows = fixture.nativeElement.querySelectorAll('.uw-table__row');
      expect(rows.length).toBe(1);
      expect(rows[0].textContent).toContain('Maria');
    });

    it('deve exibir todos quando filtro vazio', async () => {
      const { fixture } = await setup();
      const rows = fixture.nativeElement.querySelectorAll('.uw-table__row');
      expect(rows.length).toBe(3);
    });
  });

  describe('filtro por coluna', () => {
    it('deve exibir input de filtro para coluna filterable', async () => {
      const { fixture } = await setup();
      const filterInputs = fixture.nativeElement.querySelectorAll('.uw-table__filter-input');
      expect(filterInputs.length).toBe(1);
    });
  });

  describe('seleção', () => {
    it('deve exibir checkboxes no modo multiple', async () => {
      const { fixture, component } = await setup();
      component.selectionMode.set('multiple');
      fixture.detectChanges();
      const checkboxes = fixture.nativeElement.querySelectorAll('.uw-table__cell-checkbox input[type="checkbox"]');
      expect(checkboxes.length).toBe(4);
    });

    it('deve ocultar checkboxes no modo none', async () => {
      const { fixture } = await setup();
      const checkboxes = fixture.nativeElement.querySelectorAll('.uw-table__cell-checkbox input');
      expect(checkboxes.length).toBe(0);
    });

    it('deve selecionar item ao marcar checkbox', async () => {
      const { fixture, component } = await setup();
      component.selectionMode.set('multiple');
      fixture.detectChanges();
      const checkboxes = fixture.nativeElement.querySelectorAll('.uw-table__cell-checkbox input[type="checkbox"]');
      checkboxes[1].click();
      fixture.detectChanges();
      expect(component.selectionEvent?.length).toBe(1);
    });
  });

  describe('paginação client-side', () => {
    it('deve exibir uw-pagination no footer', async () => {
      const { fixture } = await setup();
      const pagination = fixture.nativeElement.querySelector('uw-pagination');
      expect(pagination).toBeTruthy();
    });

    it('deve exibir total de registros', async () => {
      const { fixture } = await setup();
      fixture.detectChanges();
      const info = fixture.nativeElement.querySelector('.uw-pagination__info');
      expect(info.textContent).toContain('3');
    });
  });

  describe('estados vazio e loading', () => {
    it('deve exibir empty state quando não há dados', async () => {
      @Component({
        standalone: true,
        imports: [UwTableComponent],
        template: `<uw-table [columns]="cols" [data]="[]" />`,
      })
      class EmptyHost {
        readonly cols = COLS;
      }
      await TestBed.resetTestingModule();
      await TestBed.configureTestingModule({ imports: [EmptyHost] }).compileComponents();
      const fixture = TestBed.createComponent(EmptyHost);
      fixture.detectChanges();
      const empty = fixture.nativeElement.querySelector('.uw-table__empty-cell');
      expect(empty).toBeTruthy();
      expect(empty.textContent).toContain('Nenhum registro encontrado');
    });

    it('deve exibir loading indicator', async () => {
      const { fixture, component } = await setup();
      component.loading.set(true);
      fixture.detectChanges();
      const bar = fixture.nativeElement.querySelector('.uw-table__loading-bar');
      expect(bar).toBeTruthy();
    });
  });

  describe('row sizing', () => {
    it('deve aplicar classe sm para rowSize sm', async () => {
      const { fixture, component } = await setup();
      component.rowSize.set('sm');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.uw-table').classList.contains('uw-table--sm')).toBe(true);
    });

    it('deve aplicar classe lg para rowSize lg', async () => {
      const { fixture, component } = await setup();
      component.rowSize.set('lg');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.uw-table').classList.contains('uw-table--lg')).toBe(true);
    });
  });

  describe('templates customizados', () => {
    it('deve renderizar template customizado para coluna', async () => {
      @Component({
        standalone: true,
        imports: [UwTableComponent, UwColTplDirective],
        template: `
          <uw-table [columns]="cols" [data]="data">
            <ng-template uwColTpl="status" let-item>
              <span class="custom-status">{{ item.status }}</span>
            </ng-template>
          </uw-table>
        `,
      })
      class TplHost {
        readonly cols = COLS;
        readonly data = DATA;
      }
      await TestBed.resetTestingModule();
      await TestBed.configureTestingModule({ imports: [TplHost] }).compileComponents();
      const fixture = TestBed.createComponent(TplHost);
      fixture.detectChanges();
      const custom = fixture.nativeElement.querySelector('.custom-status');
      expect(custom).toBeTruthy();
      expect(custom.textContent).toContain('ativo');
    });
  });

  describe('lazy load outputs', () => {
    it('deve emitir lazyLoad com sort field ao ordenar em modo lazy', async () => {
      const { fixture, component } = await setup();
      component.lazy.set(true);
      fixture.detectChanges();
      // Clear first init emission
      component.lazyEvent = null;

      const nomeHeader = fixture.nativeElement.querySelectorAll('.uw-table__header-cell')[0];
      nomeHeader.click();
      fixture.detectChanges();
      expect(component.lazyEvent).toEqual(
        expect.objectContaining({ sortField: 'nome', sortOrder: 1 })
      );
    });

    it('deve emitir lazyLoad com page ao navegar', async () => {
      const { fixture, component } = await setup();
      component.lazy.set(true);
      component.totalRecords.set(30);
      fixture.detectChanges();
      component.lazyEvent = null;

      const pageBtns = fixture.nativeElement.querySelectorAll('.uw-pagination__page');
      if (pageBtns.length > 1) {
        pageBtns[1].click();
        fixture.detectChanges();
        expect(component.lazyEvent).toEqual(
          expect.objectContaining({ page: 1 })
        );
      }
    });
  });
});
