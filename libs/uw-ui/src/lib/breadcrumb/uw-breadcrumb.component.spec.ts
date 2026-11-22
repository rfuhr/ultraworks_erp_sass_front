import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwBreadcrumbComponent } from './uw-breadcrumb.component';
import { provideRouter } from '@angular/router';

describe('UwBreadcrumbComponent', () => {
  function createComponent(items: any[], maxItems = 0): ComponentFixture<UwBreadcrumbComponent> {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [UwBreadcrumbComponent], providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(UwBreadcrumbComponent);
    fixture.componentRef.setInput('items', items);
    if (maxItems > 0) {
      fixture.componentRef.setInput('maxItems', maxItems);
    }
    return fixture;
  }

  it('deve renderizar itens', () => {
    const fixture = createComponent([
      { label: 'Home', route: '/' },
      { label: 'Eventos', route: '/eventos' },
      { label: 'Detalhes' },
    ]);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.breadcrumb-link');
    expect(links.length).toBe(2);
    expect(links[0].textContent).toContain('Home');
    expect(links[1].textContent).toContain('Eventos');
    const active = fixture.nativeElement.querySelector('.breadcrumb-active');
    expect(active?.textContent).toContain('Detalhes');
  });

  it('deve colapsar itens quando maxItems for menor que total', () => {
    const fixture = createComponent([
      { label: 'Home', route: '/' },
      { label: 'Eventos', route: '/eventos' },
      { label: 'Categoria', route: '/categoria' },
      { label: 'Detalhes' },
    ], 2);
    fixture.detectChanges();
    const collapsed = fixture.nativeElement.querySelector('.breadcrumb-collapsed');
    expect(collapsed).toBeTruthy();
    expect(collapsed?.textContent).toBe('…');
  });

  it('deve exibir separador entre itens', () => {
    const fixture = createComponent([
      { label: 'Home', route: '/' },
      { label: 'Eventos' },
    ]);
    fixture.detectChanges();
    const separators = fixture.nativeElement.querySelectorAll('.breadcrumb-separator');
    expect(separators.length).toBe(1);
  });

  it('deve ter atributo aria-label', () => {
    const fixture = createComponent([{ label: 'Home' }]);
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('breadcrumb');
  });
});
