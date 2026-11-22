import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UwActionCardComponent } from './uw-action-card.component';

@Component({
  template: `
    <uw-action-card
      [label]="label()"
      [statusLabel]="statusLabel()"
      [ctaLabel]="ctaLabel()"
      [icon]="icon()"
      [color]="color()"
      [bg]="bg()"
      [disabled]="disabled()"
      [actionable]="actionable()"
      (cta)="onCta()"
    />
  `,
  imports: [UwActionCardComponent],
  standalone: true,
})
class TestHostComponent {
  readonly label = signal('Pagamento');
  readonly statusLabel = signal('Pago');
  readonly ctaLabel = signal('');
  readonly icon = signal('credit_card');
  readonly color = signal('#10b981');
  readonly bg = signal('#ecfdf5');
  readonly disabled = signal(false);
  readonly actionable = signal(true);
  ctaCount = 0;

  onCta(): void {
    this.ctaCount++;
  }
}

describe('UwActionCardComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  function getCard(): HTMLButtonElement | null {
    return hostFixture.nativeElement.querySelector('.uw-action-card');
  }

  function getLabel(): HTMLElement | null {
    return hostFixture.nativeElement.querySelector('.uw-action-card__label');
  }

  function getStatus(): HTMLElement | null {
    return hostFixture.nativeElement.querySelector('.uw-action-card__status');
  }

  function getIcon(): HTMLElement | null {
    return hostFixture.nativeElement.querySelector('.uw-action-card__icon');
  }

  function getChevron(): HTMLElement | null {
    return hostFixture.nativeElement.querySelector('.uw-action-card__chevron');
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
    it('should create', () => {
      expect(hostComponent).toBeTruthy();
    });

    it('should render label, status and icon', () => {
      expect(getLabel()?.textContent?.trim()).toBe('Pagamento');
      expect(getStatus()?.textContent?.trim()).toBe('Pago');
      expect(getIcon()).toBeTruthy();
    });

    it('should use ctaLabel as status text when provided', () => {
      hostComponent.ctaLabel.set('Pagar agora');
      hostFixture.detectChanges();
      expect(getStatus()?.textContent?.trim()).toBe('Pagar agora');
    });

    it('should apply custom background and border color derived from color', () => {
      hostComponent.bg.set('#fff');
      hostComponent.color.set('#6c47ff');
      hostFixture.detectChanges();
      const card = getCard();
      expect(card?.style.background).toBe('rgb(255, 255, 255)');
      expect(card?.style.borderColor).toContain('color-mix');
      expect(getStatus()?.style.color).toBe('rgb(108, 71, 255)');
    });

    it('should not render icon when empty', () => {
      hostComponent.icon.set('');
      hostFixture.detectChanges();
      expect(getIcon()).toBeNull();
    });
  });

  describe('comportamento de clique', () => {
    it('should emit cta when enabled and clicked', () => {
      getCard()?.click();
      expect(hostComponent.ctaCount).toBe(1);
    });

    it('should not emit cta when disabled', () => {
      hostComponent.disabled.set(true);
      hostFixture.detectChanges();
      getCard()?.click();
      expect(hostComponent.ctaCount).toBe(0);
    });

    it('should not emit cta when not actionable', () => {
      hostComponent.actionable.set(false);
      hostFixture.detectChanges();
      getCard()?.click();
      expect(hostComponent.ctaCount).toBe(0);
    });
  });

  describe('estado desabilitado', () => {
    it('should set disabled attribute and custom cursor when disabled', () => {
      hostComponent.disabled.set(true);
      hostFixture.detectChanges();
      expect(getCard()?.disabled).toBe(true);
      expect(getCard()?.style.cursor).toBe('default');
    });

    it('should not render chevron when disabled', () => {
      hostComponent.disabled.set(true);
      hostFixture.detectChanges();
      expect(getChevron()).toBeNull();
    });

    it('should render chevron when enabled', () => {
      expect(getChevron()).toBeTruthy();
    });

    it('should keep enabled but hide chevron and use default cursor when not actionable', () => {
      hostComponent.actionable.set(false);
      hostFixture.detectChanges();

      expect(getCard()?.disabled).toBe(false);
      expect(getCard()?.style.cursor).toBe('default');
      expect(getChevron()).toBeNull();
    });
  });

  describe('acessibilidade', () => {
    it('should create the component directly', () => {
      const fixture = TestBed.createComponent(UwActionCardComponent);
      expect(fixture.componentInstance).toBeTruthy();
    });
  });
});
