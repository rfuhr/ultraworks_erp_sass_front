import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwCardComponent } from './uw-card.component';
import { UwCardHeaderDirective, UwCardFooterDirective } from './uw-card.directives';

describe('UwCardComponent', () => {
  let component: UwCardComponent;
  let fixture: ComponentFixture<UwCardComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwCardComponent],
    });

    fixture = TestBed.createComponent(UwCardComponent);
    component = fixture.componentInstance;
  });

  function getCard(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-card');
  }

  function getStripe(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-card__stripe');
  }

  function getHeader(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-card__header');
  }

  function getFooter(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-card__footer');
  }

  function getDivider(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-card__divider');
  }

  function getBody(): HTMLElement | null {
    return fixture.nativeElement.querySelector('.uw-card__body');
  }

  describe('variant', () => {
    it('should default to outlined', () => {
      fixture.detectChanges();
      expect(getCard()?.classList.contains('uw-card--outlined')).toBe(true);
    });

    it('should apply flat variant', () => {
      fixture.componentRef.setInput('variant', 'flat');
      fixture.detectChanges();
      expect(getCard()?.classList.contains('uw-card--flat')).toBe(true);
    });
  });

  describe('hoverable', () => {
    it('should add hoverable class when true', () => {
      fixture.componentRef.setInput('hoverable', true);
      fixture.detectChanges();
      expect(getCard()?.classList.contains('uw-card--hoverable')).toBe(true);
    });

    it('should not add hoverable class when false', () => {
      fixture.detectChanges();
      expect(getCard()?.classList.contains('uw-card--hoverable')).toBe(false);
    });
  });

  describe('stripe', () => {
    it('should not render stripe when stripe is none (default)', () => {
      fixture.detectChanges();
      expect(getStripe()).toBeNull();
    });

    it('should render stripe and add has-stripe class when stripe is set', () => {
      fixture.componentRef.setInput('stripe', 'primary');
      fixture.detectChanges();
      expect(getStripe()).toBeTruthy();
      expect(getCard()?.classList.contains('uw-card--has-stripe')).toBe(true);
    });

    it('should apply correct stripe color class', () => {
      fixture.componentRef.setInput('stripe', 'warning');
      fixture.detectChanges();
      expect(getStripe()?.classList.contains('uw-card__stripe--warning')).toBe(true);
    });

    it('should render all stripe variants', () => {
      const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const;
      for (const variant of variants) {
        fixture.componentRef.setInput('stripe', variant);
        fixture.detectChanges();
        expect(getStripe()?.classList.contains(`uw-card__stripe--${variant}`)).toBe(true);
      }
    });

    it('should not tint background when stripeBg is false', () => {
      fixture.componentRef.setInput('stripe', 'primary');
      fixture.componentRef.setInput('stripeBg', false);
      fixture.detectChanges();
      expect(getCard()?.style.backgroundColor).toBe('');
    });

    it('should tint background when stripeBg is true (default)', () => {
      fixture.componentRef.setInput('stripe', 'primary');
      fixture.detectChanges();
      expect(getCard()?.style.backgroundColor).toBe('var(--uw-card-bg-primary)');
    });
  });

  describe('background color', () => {
    it('should set background via bgColor input', () => {
      fixture.componentRef.setInput('bgColor', '#ff0000');
      fixture.detectChanges();
      expect(getCard()?.style.backgroundColor).toBe('rgb(255, 0, 0)');
    });

    it('should set background via stripe CSS variable', () => {
      fixture.componentRef.setInput('stripe', 'info');
      fixture.detectChanges();
      expect(getCard()?.style.backgroundColor).toBe('var(--uw-card-bg-info)');
    });

    it('should prefer bgColor over stripe background', () => {
      fixture.componentRef.setInput('stripe', 'primary');
      fixture.componentRef.setInput('bgColor', '#ff0000');
      fixture.detectChanges();
      expect(getCard()?.style.backgroundColor).toBe('rgb(255, 0, 0)');
    });
  });

  describe('content projection', () => {
    @Component({
      standalone: true,
      imports: [UwCardComponent, UwCardHeaderDirective, UwCardFooterDirective],
      template: `
        <uw-card>
          <div uwCardHeader>Header content</div>
          <p>Body content</p>
          <div uwCardFooter>Footer content</div>
        </uw-card>
      `,
    })
    class TestHostComponent {}

    let hostFixture: ComponentFixture<TestHostComponent>;

    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [TestHostComponent],
      });
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();
    });

    it('should project header content', () => {
      const header = hostFixture.nativeElement.querySelector('.uw-card__header');
      expect(header).toBeTruthy();
      expect(header.textContent).toContain('Header content');
    });

    it('should project body content', () => {
      const body = hostFixture.nativeElement.querySelector('.uw-card__body');
      expect(body).toBeTruthy();
      expect(body.textContent).toContain('Body content');
    });

    it('should project footer content', () => {
      const footer = hostFixture.nativeElement.querySelector('.uw-card__footer');
      expect(footer).toBeTruthy();
      expect(footer.textContent).toContain('Footer content');
    });

    it('should show divider when footer is present', () => {
      const divider = hostFixture.nativeElement.querySelector('.uw-card__divider');
      expect(divider).toBeTruthy();
    });
  });

  describe('content projection without directives (backward compat)', () => {
    @Component({
      standalone: true,
      imports: [UwCardComponent],
      template: `
        <uw-card>
          <p>Only body content</p>
        </uw-card>
      `,
    })
    class SimpleHostComponent {}

    let simpleFixture: ComponentFixture<SimpleHostComponent>;

    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [SimpleHostComponent],
      });
      simpleFixture = TestBed.createComponent(SimpleHostComponent);
      simpleFixture.detectChanges();
    });

    it('should project content into body', () => {
      const body = simpleFixture.nativeElement.querySelector('.uw-card__body');
      expect(body).toBeTruthy();
      expect(body.textContent).toContain('Only body content');
    });

    it('should not render header section', () => {
      expect(simpleFixture.nativeElement.querySelector('.uw-card__header')).toBeNull();
    });

    it('should not render footer section', () => {
      expect(simpleFixture.nativeElement.querySelector('.uw-card__footer')).toBeNull();
    });

    it('should not render divider', () => {
      expect(simpleFixture.nativeElement.querySelector('.uw-card__divider')).toBeNull();
    });
  });

  describe('defaults', () => {
    it('should create the component', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });
});
