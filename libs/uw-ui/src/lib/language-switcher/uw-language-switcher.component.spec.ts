import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwLanguageSwitcherComponent } from './uw-language-switcher.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UwLanguageSwitcherComponent', () => {
  let component: UwLanguageSwitcherComponent;
  let fixture: ComponentFixture<UwLanguageSwitcherComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwLanguageSwitcherComponent, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(UwLanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('languages', () => {
    it('should render language options', () => {
      const options = fixture.nativeElement.querySelectorAll('.uw-lang-switcher__option');
      expect(options.length).toBe(3);
    });

    it('should display language labels', () => {
      const labels = fixture.nativeElement.querySelectorAll('.uw-lang-switcher__label');
      expect(labels[0].textContent).toContain('Português');
      expect(labels[1].textContent).toContain('English');
      expect(labels[2].textContent).toContain('Español');
    });
  });

  describe('selectLanguage', () => {
    it('should change selected language', () => {
      component.selectLanguage('en');
      expect(component.selectedLang).toBe('en');
    });

    it('should emit languageChange event', () => {
      const spy = jest.fn();
      component.languageChange.subscribe(spy);
      component.selectLanguage('es');
      expect(spy).toHaveBeenCalledWith('es');
    });

    it('should mark active language with check icon', () => {
      component.selectLanguage('en');
      fixture.detectChanges();
      const activeOption = fixture.nativeElement.querySelector('.uw-lang-switcher__option--active');
      expect(activeOption).toBeTruthy();
      expect(activeOption.querySelector('uw-icon')).toBeTruthy();
    });
  });

  describe('trigger', () => {
    it('should render trigger button with language icon', () => {
      const trigger = fixture.nativeElement.querySelector('.uw-lang-switcher__trigger');
      expect(trigger).toBeTruthy();
      expect(trigger.querySelector('uw-icon')).toBeTruthy();
    });
  });

  describe('defaults', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should default to pt-br', () => {
      expect(component.selectedLang).toBe('pt-br');
    });
  });
});
