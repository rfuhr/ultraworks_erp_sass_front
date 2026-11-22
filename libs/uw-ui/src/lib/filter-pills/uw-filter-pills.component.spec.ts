import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwFilterPillsComponent } from './uw-filter-pills.component';
import type { UwFilterPillItem } from './uw-filter-pills.types';

function createHost(template: string, data?: Record<string, unknown>): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwFilterPillsComponent],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  if (data) Object.assign(fixture.componentInstance, data);
  fixture.detectChanges();
  return fixture;
}

function getContainer(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.uw-filter-pills');
}

function getPills(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
  return fixture.nativeElement.querySelectorAll('.uw-filter-pills__pill');
}

function getBadges(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return fixture.nativeElement.querySelectorAll('.uw-filter-pills__badge');
}

function getIcons(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return fixture.nativeElement.querySelectorAll('.uw-filter-pills__icon');
}

const defaultItems: UwFilterPillItem[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'pendentes', label: 'Pendentes' },
  { value: 'aprovados', label: 'Aprovados' },
];

describe('UwFilterPillsComponent', () => {
  describe('renderização das pills', () => {
    it('deve exibir todas as pills com labels', () => {
      const fixture = createHost(`<uw-filter-pills [items]="items"></uw-filter-pills>`, { items: defaultItems });

      const pills = getPills(fixture);
      expect(pills.length).toBe(3);
      expect(pills[0].textContent?.trim()).toContain('Todos');
      expect(pills[1].textContent?.trim()).toContain('Pendentes');
      expect(pills[2].textContent?.trim()).toContain('Aprovados');
    });

    it('deve renderizar com lista vazia', () => {
      const fixture = createHost(`<uw-filter-pills [items]="items"></uw-filter-pills>`, { items: [] });

      expect(getContainer(fixture)).toBeTruthy();
      expect(getPills(fixture).length).toBe(0);
    });
  });

  describe('badge opcional', () => {
    const itemsWithBadge: UwFilterPillItem[] = [
      { value: 'todos', label: 'Todos', badge: 42 },
      { value: 'pendentes', label: 'Pendentes', badge: 12 },
      { value: 'aprovados', label: 'Aprovados' },
    ];

    it('deve exibir badge quando presente no item', () => {
      const fixture = createHost(`<uw-filter-pills [items]="items"></uw-filter-pills>`, { items: itemsWithBadge });

      const badges = getBadges(fixture);
      expect(badges.length).toBe(2);
      expect(badges[0].textContent?.trim()).toBe('42');
      expect(badges[1].textContent?.trim()).toBe('12');
    });

    it('deve ocultar badge quando ausente no item', () => {
      const fixture = createHost(`<uw-filter-pills [items]="items"></uw-filter-pills>`, { items: defaultItems });

      expect(getBadges(fixture).length).toBe(0);
    });
  });

  describe('ícone opcional', () => {
    const itemsWithIcon: UwFilterPillItem[] = [
      { value: 'todos', label: 'Todos', icon: 'lists' },
      { value: 'pendentes', label: 'Pendentes', icon: 'pending' },
      { value: 'aprovados', label: 'Aprovados' },
    ];

    it('deve exibir ícone quando presente no item', () => {
      const fixture = createHost(`<uw-filter-pills [items]="items"></uw-filter-pills>`, { items: itemsWithIcon });

      expect(getIcons(fixture).length).toBe(2);
    });

    it('deve ocultar ícone quando ausente no item', () => {
      const fixture = createHost(`<uw-filter-pills [items]="items"></uw-filter-pills>`, { items: defaultItems });

      expect(getIcons(fixture).length).toBe(0);
    });
  });

  describe('seleção e estado ativo', () => {
    it('deve marcar a pill como ativa quando active coincide com o valor', () => {
      const fixture = createHost(
        `<uw-filter-pills [items]="items" [active]="'pendentes'"></uw-filter-pills>`,
        { items: defaultItems },
      );

      const pills = getPills(fixture);
      expect(pills[0].classList.contains('uw-filter-pills__pill--inactive')).toBe(true);
      expect(pills[0].classList.contains('uw-filter-pills__pill--active')).toBe(false);
      expect(pills[1].classList.contains('uw-filter-pills__pill--active')).toBe(true);
    });

    it('deve emitir activeChange ao clicar em pill diferente', () => {
      let emitted: string | undefined;
      const fixture = createHost(
        `<uw-filter-pills [items]="items" [active]="'todos'" (activeChange)="onChange($event)"></uw-filter-pills>`,
        { items: defaultItems, onChange: (v: string) => { emitted = v; } },
      );

      getPills(fixture)[1].click();
      fixture.detectChanges();

      expect(emitted).toBe('pendentes');
    });

    it('não deve emitir activeChange ao clicar na pill já ativa', () => {
      let emitted: string | undefined;
      const fixture = createHost(
        `<uw-filter-pills [items]="items" [active]="'todos'" (activeChange)="onChange($event)"></uw-filter-pills>`,
        { items: defaultItems, onChange: (v: string) => { emitted = v; } },
      );

      getPills(fixture)[0].click();
      fixture.detectChanges();

      expect(emitted).toBeUndefined();
    });

    it('deve refletir estado ativo via input active', () => {
      const fixtureA = createHost(
        `<uw-filter-pills [items]="items" [active]="'todos'"></uw-filter-pills>`,
        { items: defaultItems },
      );
      expect(getPills(fixtureA)[0].classList.contains('uw-filter-pills__pill--active')).toBe(true);
      expect(getPills(fixtureA)[1].classList.contains('uw-filter-pills__pill--active')).toBe(false);

      const fixtureB = createHost(
        `<uw-filter-pills [items]="items" [active]="'aprovados'"></uw-filter-pills>`,
        { items: defaultItems },
      );
      expect(getPills(fixtureB)[0].classList.contains('uw-filter-pills__pill--active')).toBe(false);
      expect(getPills(fixtureB)[2].classList.contains('uw-filter-pills__pill--active')).toBe(true);
    });
  });

  describe('tamanho small', () => {
    it('deve aplicar classe --small quando size="small"', () => {
      const fixture = createHost(
        `<uw-filter-pills [items]="items" size="small"></uw-filter-pills>`,
        { items: defaultItems },
      );

      expect(getContainer(fixture)?.classList.contains('uw-filter-pills--small')).toBe(true);
    });

    it('deve ter classe --default por padrão', () => {
      const fixture = createHost(`<uw-filter-pills [items]="items"></uw-filter-pills>`, { items: defaultItems });

      expect(getContainer(fixture)?.classList.contains('uw-filter-pills--default')).toBe(true);
    });
  });

  describe('acessibilidade', () => {
    it('deve ter role="tablist" no container', () => {
      const fixture = createHost(`<uw-filter-pills [items]="items"></uw-filter-pills>`, { items: defaultItems });

      expect(getContainer(fixture)?.getAttribute('role')).toBe('tablist');
    });

    it('deve ter role="tab" em cada pill', () => {
      const fixture = createHost(`<uw-filter-pills [items]="items"></uw-filter-pills>`, { items: defaultItems });

      getPills(fixture).forEach(pill => {
        expect(pill.getAttribute('role')).toBe('tab');
      });
    });

    it('deve ter aria-selected na pill ativa', () => {
      const fixture = createHost(
        `<uw-filter-pills [items]="items" [active]="'pendentes'"></uw-filter-pills>`,
        { items: defaultItems },
      );

      const pills = getPills(fixture);
      expect(pills[0].getAttribute('aria-selected')).toBe('false');
      expect(pills[1].getAttribute('aria-selected')).toBe('true');
    });
  });
});
