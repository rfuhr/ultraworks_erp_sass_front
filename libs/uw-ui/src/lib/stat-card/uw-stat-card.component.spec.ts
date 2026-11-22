import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { UwStatCardComponent } from './uw-stat-card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
    <uw-stat-card
      [icon]="icon()"
      [iconBg]="iconBg()"
      [iconColor]="iconColor()"
      [value]="value()"
      [label]="label()"
      [variant]="variant()"
      [loading]="loading()"
      [href]="href()"
      (clicked)="onClicked()"
    />
  `,
  imports: [UwStatCardComponent],
  standalone: true,
})
class TestHostComponent {
  readonly icon = signal('event');
  readonly iconBg = signal('#ede9ff');
  readonly iconColor = signal('#6c47ff');
  readonly value = signal('128');
  readonly label = signal('Eventos ativos');
  readonly variant = signal<'default' | 'compact'>('default');
  readonly loading = signal(false);
  readonly href = signal('');
  clickedCount = 0;

  onClicked(): void {
    this.clickedCount++;
  }
}

describe('UwStatCardComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  function getCard(): HTMLElement | null {
    return hostFixture.nativeElement.querySelector('.uw-stat-card');
  }

  function getIconBox(): HTMLElement | null {
    return hostFixture.nativeElement.querySelector('.uw-stat-card__icon-box');
  }

  function getValue(): HTMLElement | null {
    return hostFixture.nativeElement.querySelector('.uw-stat-card__value');
  }

  function getLabel(): HTMLElement | null {
    return hostFixture.nativeElement.querySelector('.uw-stat-card__label');
  }

  function getSkeleton(): HTMLElement | null {
    return hostFixture.nativeElement.querySelector('.uw-stat-card__skeleton');
  }

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule],
    });

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  describe('renderização base', () => {
    it('should render icon, value and label', () => {
      expect(getIconBox()).toBeTruthy();
      expect(getValue()?.textContent?.trim()).toBe('128');
      expect(getLabel()?.textContent?.trim()).toBe('Eventos ativos');
    });

    it('should not render icon box when icon is empty', () => {
      hostComponent.icon.set('');
      hostFixture.detectChanges();
      expect(getIconBox()).toBeNull();
    });

    it('should apply custom iconBg and iconColor', () => {
      hostComponent.iconBg.set('#e0f2fe');
      hostComponent.iconColor.set('#0284c7');
      hostFixture.detectChanges();
      const box = getIconBox();
      expect(box?.style.background).toBe('rgb(224, 242, 254)');
      const icon = box?.querySelector('uw-icon') as HTMLElement;
      expect(icon?.style.color).toBe('rgb(2, 132, 199)');
    });

    it('should display value exactly as provided (formatted)', () => {
      hostComponent.value.set('R$ 12.500,00');
      hostFixture.detectChanges();
      expect(getValue()?.textContent?.trim()).toBe('R$ 12.500,00');
    });
  });

  describe('variante compact', () => {
    it('should have compact class when variant is compact', () => {
      hostComponent.variant.set('compact');
      hostFixture.detectChanges();
      expect(getCard()?.classList.contains('uw-stat-card--compact')).toBe(true);
    });

    it('should not have compact class when variant is default', () => {
      expect(getCard()?.classList.contains('uw-stat-card--compact')).toBe(false);
    });
  });

  describe('comportamento clicável', () => {
    it('should emit clicked when card is clicked without href', () => {
      hostComponent.href.set('');
      hostFixture.detectChanges();
      getCard()?.click();
      expect(hostComponent.clickedCount).toBe(1);
    });

    it('should have cursor-pointer when clickable (no href)', () => {
      hostComponent.href.set('');
      hostFixture.detectChanges();
      expect(getCard()?.classList.contains('cursor-pointer')).toBe(true);
    });

    it('should have clickable class when href is set', () => {
      hostComponent.href.set('/eventos');
      hostFixture.detectChanges();
      expect(getCard()?.classList.contains('uw-stat-card--clickable')).toBe(true);
    });

    it('should not emit clicked when href is set (navigation handled by router)', () => {
      hostComponent.href.set('/eventos/123');
      hostFixture.detectChanges();
      getCard()?.click();
      expect(hostComponent.clickedCount).toBe(0);
    });
  });

  describe('estado loading', () => {
    it('should show skeleton when loading is true', () => {
      hostComponent.loading.set(true);
      hostFixture.detectChanges();
      expect(getSkeleton()).toBeTruthy();
      expect(getValue()).toBeNull();
      expect(getLabel()).toBeNull();
    });

    it('should show real content when loading becomes false', () => {
      hostComponent.loading.set(true);
      hostFixture.detectChanges();
      expect(getSkeleton()).toBeTruthy();

      hostComponent.loading.set(false);
      hostFixture.detectChanges();
      expect(getSkeleton()).toBeNull();
      expect(getValue()).toBeTruthy();
      expect(getLabel()).toBeTruthy();
    });
  });

  describe('acessibilidade', () => {
    it('should create the component', () => {
      const fixture = TestBed.createComponent(UwStatCardComponent);
      expect(fixture.componentInstance).toBeTruthy();
    });
  });
});
