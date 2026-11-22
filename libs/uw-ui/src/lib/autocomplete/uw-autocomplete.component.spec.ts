import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwAutocompleteComponent } from './uw-autocomplete.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { AutocompleteOption } from './uw-autocomplete.types';

describe('UwAutocompleteComponent', () => {
  let component: UwAutocompleteComponent;
  let fixture: ComponentFixture<UwAutocompleteComponent>;

  const defaultOptions: AutocompleteOption[] = [
    { value: 'br', label: 'Brasil' },
    { value: 'pt', label: 'Portugal' },
    { value: 'ar', label: 'Argentina' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'gb', label: 'Reino Unido' },
  ];

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwAutocompleteComponent, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(UwAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', defaultOptions);
    fixture.detectChanges();
  });

  function getInput(): HTMLInputElement | null {
    return fixture.nativeElement.querySelector('.autocomplete-input');
  }

  function getDropdown(): HTMLElement | null {
    return document.querySelector('.autocomplete-dropdown');
  }

  describe('render', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render input element', () => {
      expect(getInput()).toBeTruthy();
    });

    it('should show placeholder text', () => {
      expect(getInput()?.placeholder).toBe('Buscar...');
    });

    it('should show custom placeholder', () => {
      fixture.componentRef.setInput('placeholder', 'Escolha um país');
      fixture.detectChanges();
      expect(getInput()?.placeholder).toBe('Escolha um país');
    });
  });

  describe('dropdown', () => {
    it('should open dropdown on focus', () => {
      getInput()?.focus();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);
    });

    it('should close dropdown on escape', () => {
      component.isOpen.set(true);
      component.onKeydown(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(component.isOpen()).toBe(false);
    });

    it('should close on option select', () => {
      component.isOpen.set(true);
      component.selectOption(defaultOptions[0]);
      expect(component.isOpen()).toBe(false);
    });
  });

  describe('local search', () => {
    it('should filter options by search term', () => {
      component.searchTerm.set('Bra');
      fixture.detectChanges();
      const filtered = component.filteredOptions();
      expect(filtered.length).toBe(1);
      expect(filtered[0].value).toBe('br');
    });

    it('should show all options when no search term', () => {
      component.searchTerm.set('');
      fixture.detectChanges();
      expect(component.filteredOptions().length).toBe(5);
    });

    it('should show empty state when no match', () => {
      component.searchTerm.set('Xyzabc');
      fixture.detectChanges();
      expect(component.filteredOptions().length).toBe(0);
    });
  });

  describe('selection', () => {
    it('should update value on select', () => {
      component.selectOption(defaultOptions[0]);
      expect(component.innerValue()).toBe('br');
      expect(component.searchTerm()).toBe('Brasil');
    });

    it('should call onChange on select', () => {
      const fn = jest.fn();
      component.registerOnChange(fn);
      component.selectOption(defaultOptions[1]);
      expect(fn).toHaveBeenCalledWith('pt');
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(() => {
      component.isOpen.set(true);
      fixture.detectChanges();
    });

    it('should move highlight on ArrowDown', () => {
      component.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(component.highlightIndex()).toBe(0);
      component.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      expect(component.highlightIndex()).toBe(1);
    });

    it('should move highlight on ArrowUp', () => {
      component.highlightIndex.set(2);
      component.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(component.highlightIndex()).toBe(1);
    });

    it('should select highlighted option on Enter', () => {
      component.highlightIndex.set(2);
      component.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(component.innerValue()).toBe('ar');
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      component.writeValue('pt');
      expect(component.innerValue()).toBe('pt');
    });

    it('should register onChange callback', () => {
      const fn = jest.fn();
      component.registerOnChange(fn);
      component.selectOption(defaultOptions[0]);
      expect(fn).toHaveBeenCalledWith('br');
    });

    it('should register onTouched callback', () => {
      const fn = jest.fn();
      component.registerOnTouched(fn);
      component.close();
      expect(fn).not.toHaveBeenCalled();
    });
  });

  describe('disabled', () => {
    it('should not be disabled by default', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should apply disabled attribute to input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(getInput()?.disabled).toBe(true);
    });
  });

  describe('ARIA', () => {
    it('should have combobox role on input', () => {
      expect(getInput()?.getAttribute('role')).toBe('combobox');
    });

    it('should have aria-expanded attribute', () => {
      expect(getInput()?.getAttribute('aria-expanded')).toBe('false');
      component.isOpen.set(true);
      fixture.detectChanges();
      expect(getInput()?.getAttribute('aria-expanded')).toBe('true');
    });
  });
});
