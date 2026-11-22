import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { UwTabsComponent } from './uw-tabs.component';
import type { UwTab } from './uw-tabs.types';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwTabsComponent],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

function getTabs(fixture: ComponentFixture<unknown>): NodeListOf<Element> {
  return fixture.nativeElement.querySelectorAll('.uw-tabs__tab');
}

function getTabAt(fixture: ComponentFixture<unknown>, index: number): HTMLElement {
  return getTabs(fixture)[index] as HTMLElement;
}

function getBadge(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.uw-tabs__badge');
}

function getIndicator(fixture: ComponentFixture<unknown>): HTMLElement | null {
  return fixture.nativeElement.querySelector('.uw-tabs__indicator');
}

describe('UwTabsComponent', () => {
  describe('renderização das abas', () => {
    it('deve renderizar todas as abas configuradas', () => {
      const fixture = createHost(`
        <uw-tabs [tabs]="[{value:'a',label:'A'},{value:'b',label:'B'}]"></uw-tabs>
      `);

      expect(getTabs(fixture).length).toBe(2);
    });

    it('deve exibir os labels das abas', () => {
      const fixture = createHost(`
        <uw-tabs [tabs]="[{value:'a',label:'Trabalho'},{value:'b',label:'Avaliação'}]"></uw-tabs>
      `);

      expect(getTabAt(fixture, 0).textContent?.trim()).toContain('Trabalho');
      expect(getTabAt(fixture, 1).textContent?.trim()).toContain('Avaliação');
    });
  });

  describe('ícone', () => {
    it('deve exibir ícone na aba quando configurado', () => {
      const fixture = createHost(`
        <uw-tabs [tabs]="[{value:'x',label:'X',icon:'star'}]"></uw-tabs>
      `);

      const icon = getTabAt(fixture, 0).querySelector('uw-icon');
      expect(icon).toBeTruthy();
    });

    it('deve omitir ícone quando não configurado', () => {
      const fixture = createHost(`
        <uw-tabs [tabs]="[{value:'x',label:'X'}]"></uw-tabs>
      `);

      const icon = getTabAt(fixture, 0).querySelector('uw-icon');
      expect(icon).toBeNull();
    });
  });

  describe('badge', () => {
    it('deve exibir badge quando configurado', () => {
      const fixture = createHost(`
        <uw-tabs [tabs]="[{value:'y',label:'Y',badge:'3/5'}]"></uw-tabs>
      `);

      expect(getBadge(fixture)?.textContent?.trim()).toBe('3/5');
    });

    it('deve exibir badge com valor numérico', () => {
      const fixture = createHost(`
        <uw-tabs [tabs]="[{value:'y',label:'Y',badge:5}]"></uw-tabs>
      `);

      expect(getBadge(fixture)?.textContent?.trim()).toBe('5');
    });

    it('deve omitir badge quando não configurado', () => {
      const fixture = createHost(`
        <uw-tabs [tabs]="[{value:'x',label:'X'}]"></uw-tabs>
      `);

      expect(getBadge(fixture)).toBeNull();
    });
  });

  describe('aba ativa', () => {
    it('deve iniciar sem aba ativa quando activeTab não corresponde a nenhuma aba', () => {
      const fixture = createHost(`
        <uw-tabs [tabs]="[{value:'a',label:'A'},{value:'b',label:'B'}]" activeTab="x"></uw-tabs>
      `);

      expect(getIndicator(fixture)).toBeNull();
    });

    it('deve exibir indicador na aba ativa', () => {
      const fixture = createHost(`
        <uw-tabs [tabs]="[{value:'a',label:'A'},{value:'b',label:'B'}]" activeTab="a"></uw-tabs>
      `);

      const tabs = getTabs(fixture);
      expect(tabs[0]?.classList.contains('uw-tabs__tab--active')).toBe(true);
      expect(tabs[1]?.classList.contains('uw-tabs__tab--active')).toBe(false);
      expect(getIndicator(fixture)).toBeTruthy();
    });
  });

  describe('alternância ao clicar', () => {
    it('deve ativar aba ao clicar', () => {
      const fixture = createHost(`
        <uw-tabs [tabs]="[{value:'a',label:'A'},{value:'b',label:'B'}]" activeTab="a"></uw-tabs>
      `);

      getTabAt(fixture, 1).click();
      fixture.detectChanges();

      const tabs = getTabs(fixture);
      expect(tabs[0]?.classList.contains('uw-tabs__tab--active')).toBe(false);
      expect(tabs[1]?.classList.contains('uw-tabs__tab--active')).toBe(true);
    });
  });

  describe('two-way binding com model()', () => {
    @Component({
      template: `
        <uw-tabs [tabs]="tabConfig()" [(activeTab)]="activeTab"></uw-tabs>
      `,
      imports: [UwTabsComponent],
      standalone: true,
    })
    class TestHostComponent {
      readonly tabConfig = signal<UwTab[]>([
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
      ]);
      readonly activeTab = signal('a');
    }

    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({ imports: [TestHostComponent] });

      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
    });

    it('deve atualizar activeTab quando o pai altera o signal', () => {
      hostComponent.activeTab.set('b');
      hostFixture.detectChanges();

      const tabs = getTabs(hostFixture);
      expect(tabs[1]?.classList.contains('uw-tabs__tab--active')).toBe(true);
    });

    it('deve refletir no pai quando o usuário clica em outra aba', () => {
      getTabAt(hostFixture, 1).click();
      hostFixture.detectChanges();

      expect(hostComponent.activeTab()).toBe('b');
    });
  });
});
