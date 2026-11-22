import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwIconComponent } from './uw-icon.component';

describe('UwIconComponent', () => {
  let component: UwIconComponent;
  let fixture: ComponentFixture<UwIconComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwIconComponent],
    });

    fixture = TestBed.createComponent(UwIconComponent);
    component = fixture.componentInstance;
  });

  function getIconSpan(): HTMLSpanElement | null {
    return fixture.nativeElement.querySelector('.material-symbols-outlined');
  }

  describe('name', () => {
    it('should render icon with given name', () => {
      fixture.componentRef.setInput('name', 'home');
      fixture.detectChanges();
      const span = getIconSpan();
      expect(span).toBeTruthy();
      expect(span?.textContent).toBe('home');
    });

    it('should require name input', () => {
      fixture.componentRef.setInput('name', 'home');
      fixture.detectChanges();
      expect(getIconSpan()).toBeTruthy();
    });
  });

  describe('size', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const classFor: Record<(typeof sizes)[number], string> = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };
    const remFor: Record<(typeof sizes)[number], string> = {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.5rem',
    };

    for (const size of sizes) {
      it(`should apply ${size} size class and font-size`, () => {
        fixture.componentRef.setInput('name', 'home');
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        const span = getIconSpan();
        expect(span?.classList.contains(classFor[size])).toBe(true);
        expect(span?.style.fontSize).toBe(remFor[size]);
      });
    }

    it('should default to md size', () => {
      fixture.componentRef.setInput('name', 'home');
      fixture.detectChanges();
      const span = getIconSpan();
      expect(span?.classList.contains('text-base')).toBe(true);
      expect(span?.style.fontSize).toBe('1rem');
    });
  });

  describe('filled', () => {
    it('should add filled class when filled is true', () => {
      fixture.componentRef.setInput('name', 'home');
      fixture.componentRef.setInput('filled', true);
      fixture.detectChanges();
      const span = getIconSpan();
      expect(span?.classList.contains('uw-icon--filled')).toBe(true);
    });

    it('should not add filled class when filled is false', () => {
      fixture.componentRef.setInput('name', 'home');
      fixture.detectChanges();
      const span = getIconSpan();
      expect(span?.classList.contains('uw-icon--filled')).toBe(false);
    });
  });

  describe('aria', () => {
    it('should have aria-hidden="true"', () => {
      fixture.componentRef.setInput('name', 'home');
      fixture.detectChanges();
      const span = getIconSpan();
      expect(span?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('defaults', () => {
    it('should create the component', () => {
      fixture.componentRef.setInput('name', 'home');
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should have material-symbols-outlined class', () => {
      fixture.componentRef.setInput('name', 'home');
      fixture.detectChanges();
      const span = getIconSpan();
      expect(span?.classList.contains('material-symbols-outlined')).toBe(true);
    });
  });
});
