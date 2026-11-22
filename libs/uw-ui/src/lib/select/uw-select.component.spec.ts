import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwSelectComponent } from './uw-select.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('UwSelectComponent', () => {
  let component: UwSelectComponent;
  let fixture: ComponentFixture<UwSelectComponent>;

  const defaultRegistros = [
    { id: 1, nome: 'João Silva', email: 'joao@test.com' },
    { id: 2, nome: 'Maria Santos', email: 'maria@test.com' },
    { id: 3, nome: 'José Oliveira', email: 'jose@test.com' },
  ];

  beforeAll(() => {
    Element.prototype.scrollIntoView = jest.fn();
    Element.prototype.scrollTo = jest.fn();
  });

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwSelectComponent, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(UwSelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('registros', defaultRegistros);
    fixture.detectChanges();
  });

  function getTrigger(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.uw-select__trigger');
  }

  function getClearButton(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.uw-select__clear');
  }

  function getPanel(): HTMLElement | null {
    return document.querySelector('.uw-select__panel');
  }



  describe('render', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render trigger element', () => {
      expect(getTrigger()).toBeTruthy();
    });

    it('should show placeholder text when no value', () => {
      expect(getTrigger()?.textContent?.trim()).toBe('Selecione...');
    });

    it('should show custom placeholder', () => {
      fixture.componentRef.setInput('placeholder', 'Escolha um evento');
      fixture.detectChanges();
      expect(getTrigger()?.textContent?.trim()).toBe('Escolha um evento');
    });
  });

  describe('dropdown', () => {
    it('should open panel on trigger click', () => {
      getTrigger()?.click();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);
    });

    it('should close panel on option select', () => {
      getTrigger()?.click();
      fixture.detectChanges();
      component.onSelect(defaultRegistros[0]);
      fixture.detectChanges();
      expect(component.isOpen()).toBe(false);
    });

    it('should close panel on outside click', () => {
      getTrigger()?.click();
      fixture.detectChanges();
      component.closeDropdown();
      expect(component.isOpen()).toBe(false);
    });
  });

  describe('lazyLoad', () => {
    it('should emit lazyLoad on panel open', () => {
      const spy = jest.fn();
      component.lazyLoad.subscribe(spy);
      component.onPanelOpen();
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({ page: 0, rows: 50 })
      );
    });

    it('should set valorFiltro on search input', () => {
      component.onSearchInput('joão');
      expect(component.valorFiltro()).toBe('joão');
    });

    it('should emit lazyLoad with search filter via pesquisar()', () => {
      const spy = jest.fn();
      component.lazyLoad.subscribe(spy);
      component.isOpen.set(true);
      component.valorFiltro.set('joão');
      component.pesquisar();
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 0,
          filters: expect.objectContaining({
            nome: expect.objectContaining({ value: 'joão', matchMode: 'contains' }),
          }),
        })
      );
    });
  });

  describe('selection', () => {
    it('should emit changeObject on option select', () => {
      const spy = jest.fn();
      component.changeObject.subscribe(spy);
      component.onSelect(defaultRegistros[0]);
      expect(spy).toHaveBeenCalledWith(defaultRegistros[0]);
    });

    it('should update trigger text after selection', () => {
      component.value = 1;
      fixture.detectChanges();
      expect(getTrigger()?.textContent?.trim()).toBe('João Silva');
    });

    it('should emit null changeObject on clear', () => {
      const spy = jest.fn();
      component.changeObject.subscribe(spy);
      const event = new MouseEvent('click');
      component.onClear(event);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      component.writeValue(1);
      expect(component.value).toBe(1);
    });

    it('should register onChange callback', () => {
      const fn = jest.fn();
      component.registerOnChange(fn);
      component.value = 2;
      expect(fn).toHaveBeenCalledWith(2);
    });

    it('should register onTouched callback', () => {
      const fn = jest.fn();
      component.registerOnTouched(fn);
      component.closeDropdown();
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('clearable', () => {
    it('should hide clear button when clearable is false', () => {
      fixture.componentRef.setInput('clearable', false);
      component.value = 1;
      fixture.detectChanges();
      expect(getClearButton()).toBeFalsy();
    });

    it('should show clear button when clearable is true and has value', () => {
      component.value = 1;
      fixture.detectChanges();
      expect(getClearButton()).toBeTruthy();
    });

    it('should hide clear button when no value', () => {
      fixture.detectChanges();
      expect(getClearButton()).toBeFalsy();
    });
  });

  describe('disabled', () => {
    it('should not be disabled by default', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should apply disabled attribute to trigger', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(getTrigger()?.disabled).toBe(true);
    });

    it('should not open dropdown when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      component.toggleDropdown();
      expect(component.isOpen()).toBe(false);
    });
  });

  describe('empty state', () => {
    it('should show empty message when no registros', () => {
      fixture.componentRef.setInput('registros', []);
      fixture.componentRef.setInput('totalRegistros', 0);
      component.isOpen.set(true);
      fixture.detectChanges();
      const panel = getPanel();
      expect(panel?.textContent).toContain('Nenhum resultado encontrado');
    });
  });

  describe('loading state', () => {
    it('should show spinner when loading', () => {
      fixture.componentRef.setInput('loading', true);
      component.isOpen.set(true);
      fixture.detectChanges();
      const panel = getPanel();
      expect(panel?.textContent).toContain('Carregando...');
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(() => {
      component.isOpen.set(true);
      fixture.detectChanges();
    });

    it('should move highlight on ArrowDown', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeydown(event);
      expect(component.highlightedIndex()).toBe(0);
      component.onKeydown(event);
      expect(component.highlightedIndex()).toBe(1);
    });

    it('should move highlight on ArrowUp', () => {
      component.highlightedIndex.set(2);
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeydown(event);
      expect(component.highlightedIndex()).toBe(1);
    });

    it('should close on Escape', () => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.onKeydown(event);
      expect(component.isOpen()).toBe(false);
    });

    it('should select highlighted option on Enter', () => {
      const spy = jest.fn();
      component.changeObject.subscribe(spy);
      component.highlightedIndex.set(1);
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onKeydown(event);
      expect(spy).toHaveBeenCalledWith(defaultRegistros[1]);
    });

    it('should select first matching option on type', () => {
      const event = new KeyboardEvent('keydown', { key: 'M' });
      component.onKeydown(event);
      expect(component.highlightedIndex()).toBe(1);
    });
  });

  describe('filter field toggle', () => {
    const filterFields = [
      { field: 'nome', fieldFilter: 'nome', labelFilter: 'Nome', matchMode: 'contains' as const, tipoField: 'text' as const },
      { field: 'email', fieldFilter: 'email', labelFilter: 'Email', matchMode: 'contains' as const, tipoField: 'text' as const },
    ];

    it('should change active filter field', () => {
      fixture.componentRef.setInput('filtersSearch', filterFields);
      fixture.componentRef.setInput('fieldSearchDefault', 'nome');
      component.initFilterSearch();
      component.onFilterFieldChange('Email');
      expect(component.filterSearchAtivo().field).toBe('email');
    });

    it('should emit lazyLoad with new filter after changing field', () => {
      const spy = jest.fn();
      fixture.componentRef.setInput('filtersSearch', filterFields);
      component.lazyLoad.subscribe(spy);
      component.onFilterFieldChange('Email');
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: expect.objectContaining({
            email: expect.any(Object),
          }),
        })
      );
    });
  });

  describe('columnsFilters', () => {
    it('should include fixed filters in lazyLoad params', () => {
      const spy = jest.fn();
      fixture.componentRef.setInput('columnsFilters', [
        { field: 'evento_id', fieldFilter: 'evento_id', value: 5, matchMode: 'equals', tipoField: 'number' },
      ]);
      component.lazyLoad.subscribe(spy);
      component.onPanelOpen();
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: expect.objectContaining({
            evento_id: expect.objectContaining({ value: 5, matchMode: 'equals' }),
          }),
        })
      );
    });
  });

  describe('hasValue / getLabel', () => {
    it('should return true when value is set', () => {
      component.value = 1;
      fixture.detectChanges();
      expect(component.hasValue()).toBe(true);
    });

    it('should return false when value is null', () => {
      expect(component.hasValue()).toBe(false);
    });

    it('should return label for a given value', () => {
      expect(component.getLabel(1)).toBe('João Silva');
    });

    it('should return empty string for unknown value', () => {
      expect(component.getLabel(999)).toBe('');
    });
  });

  describe('pagination', () => {
    it('should show footer with total when totalRegistros <= pageSize', () => {
      fixture.componentRef.setInput('totalRegistros', 3);
      fixture.componentRef.setInput('pageSize', 50);
      component.isOpen.set(true);
      fixture.detectChanges();
      const footer = document.querySelector('.uw-select__footer');
      expect(footer?.textContent).toContain('registro(s)');
    });

    it('should not have manual pagination buttons', () => {
      fixture.componentRef.setInput('totalRegistros', 128);
      fixture.componentRef.setInput('pageSize', 50);
      component.isOpen.set(true);
      fixture.detectChanges();
      const pageNav = document.querySelector('.uw-select__page-nav');
      expect(pageNav).toBeFalsy();
    });
  });

  it('should render chevron icon', () => {
    const chevron = fixture.nativeElement.querySelector('.uw-select__chevron');
    expect(chevron).toBeTruthy();
    expect(chevron.textContent).toBe('expand_more');
  });

  describe('infinite scroll', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('registros', defaultRegistros);
      fixture.componentRef.setInput('totalRegistros', 100);
      fixture.componentRef.setInput('pageSize', 50);
      fixture.detectChanges();
    });

    it('should not have infiniteScroll input', () => {
      expect((component as any).infiniteScroll).toBeUndefined();
    });

    it('should display registros via displayRegistros', () => {
      expect(component.displayRegistros()).toEqual(defaultRegistros);
      expect(component.displayRegistros().length).toBe(3);
    });

    it('should have hasMorePages when total > pageSize', () => {
      expect(component.hasMorePages()).toBe(true);
    });

    it('should not have hasMorePages when last page', () => {
      component.page.set(1);
      fixture.detectChanges();
      expect(component.hasMorePages()).toBe(false);
    });

    it('should call loadMore on scroll near bottom', () => {
      const loadMoreSpy = jest.spyOn(component as any, 'loadMore');
      (component as any).virtualScroll = {
        measureScrollOffset: jest.fn().mockReturnValue(20),
      };
      component.page.set(0);
      component.loadingMore.set(false);
      component.onScrolled();
      expect(loadMoreSpy).toHaveBeenCalled();
    });

    it('should not call loadMore when already loading', () => {
      const loadMoreSpy = jest.spyOn(component as any, 'loadMore');
      (component as any).virtualScroll = {
        measureScrollOffset: jest.fn().mockReturnValue(20),
      };
      component.loadingMore.set(true);
      component.onScrolled();
      expect(loadMoreSpy).not.toHaveBeenCalled();
    });

    it('should accumulate data on subsequent pages', () => {
      const page2Data = [{ id: 4, nome: 'Ana Costa', email: 'ana@test.com' }];
      component.page.set(1);
      fixture.componentRef.setInput('registros', page2Data);
      fixture.detectChanges();
      expect(component.displayRegistros()).toEqual([...defaultRegistros, ...page2Data]);
    });

    it('should replace data on fresh load (page 0)', () => {
      component.displayRegistros.set([...defaultRegistros, { id: 4, nome: 'Extra', email: 'extra@test.com' }]);
      const freshData = [{ id: 5, nome: 'Novo', email: 'novo@test.com' }];
      component.page.set(0);
      fixture.componentRef.setInput('registros', freshData);
      fixture.detectChanges();
      expect(component.displayRegistros()).toEqual(freshData);
    });

    it('should keep previous items when loading the next page', () => {
      component.displayRegistros.set(defaultRegistros);
      component.page.set(1);
      const page2Data = [{ id: 4, nome: 'Ana Costa', email: 'ana@test.com' }];
      fixture.componentRef.setInput('registros', page2Data);
      fixture.detectChanges();
      expect(component.displayRegistros().length).toBeGreaterThan(0);
    });
  });

  describe('filter reset behaviour', () => {
    it('should update the search value when search input changes', () => {
      component.onSearchInput('novo termo');
      fixture.detectChanges();
      expect((component as any).valorFiltro()).toBe('novo termo');
    });

    it('should clear search and displayRegistros when filter field changes', () => {
      const filterFields = [
        { field: 'nome', fieldFilter: 'nome', labelFilter: 'Nome', matchMode: 'contains' as const, tipoField: 'text' as const },
        { field: 'email', fieldFilter: 'email', labelFilter: 'Email', matchMode: 'contains' as const, tipoField: 'text' as const },
      ];
      fixture.componentRef.setInput('filtersSearch', filterFields);
      component.valorFiltro.set('João');
      component.displayRegistros.set(defaultRegistros);
      component.initFilterSearch();
      component.onFilterFieldChange('Email');
      expect(component.valorFiltro()).toBe('');
      expect(component.filtroAtivo()).toBe(false);
      expect(component.displayRegistros()).toEqual([]);
    });

    it('should clear displayRegistros when limparFiltro is called', () => {
      component.displayRegistros.set(defaultRegistros);
      component.valorFiltro.set('João');
      component.limparFiltro();
      expect(component.displayRegistros()).toEqual([]);
      expect(component.valorFiltro()).toBe('');
    });
  });
});
