import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwSearchFieldComponent } from './uw-search-field.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UwSearchFieldComponent', () => {
  let component: UwSearchFieldComponent;
  let fixture: ComponentFixture<UwSearchFieldComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwSearchFieldComponent, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(UwSearchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getInput(): HTMLInputElement | null {
    return fixture.nativeElement.querySelector('.uw-search__input');
  }

  describe('placeholder', () => {
    it('should render default placeholder', () => {
      expect(getInput()?.placeholder).toBe('Buscar...');
    });

    it('should accept custom placeholder', () => {
      fixture.componentRef.setInput('placeholder', 'Pesquisar...');
      fixture.detectChanges();
      expect(getInput()?.placeholder).toBe('Pesquisar...');
    });
  });

  describe('search', () => {
    it('should emit searchChange on search', () => {
      const spy = jest.fn();
      component.searchChange.subscribe(spy);
      component.searchTerm.set('teste');
      component.onSearch();
      expect(spy).toHaveBeenCalledWith('teste');
    });

    it('should emit searchChange with empty on clear', () => {
      const spy = jest.fn();
      component.searchChange.subscribe(spy);
      component.searchTerm.set('teste');
      component.onClear();
      expect(spy).toHaveBeenCalledWith('');
    });
  });

  describe('liveSearch', () => {
    it('should emit searchChange after debounce when liveSearch is active', () => {
      jest.useFakeTimers();
      try {
        const spy = jest.fn();
        component.searchChange.subscribe(spy);
        fixture.componentRef.setInput('liveSearch', true);
        fixture.detectChanges();

        component.onTermChange('jo');
        expect(spy).not.toHaveBeenCalled();

        jest.advanceTimersByTime(300);
        expect(spy).toHaveBeenCalledWith('jo');
      } finally {
        jest.useRealTimers();
      }
    });

    it('should not emit on typing when liveSearch is inactive', () => {
      const spy = jest.fn();
      component.searchChange.subscribe(spy);
      component.onTermChange('jo');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('clear', () => {
    it('should emit cleared event on clear', () => {
      const spy = jest.fn();
      component.cleared.subscribe(spy);
      component.searchTerm.set('teste');
      component.onClear();
      expect(spy).toHaveBeenCalled();
    });

    it('should reset searchTerm on clear', () => {
      component.searchTerm.set('teste');
      component.onClear();
      expect(component.searchTerm()).toBe('');
    });

    it('should show clear button when searchTerm is not empty', () => {
      component.searchTerm.set('teste');
      fixture.detectChanges();
      const clearBtn = fixture.nativeElement.querySelector('.uw-search__clear');
      expect(clearBtn).toBeTruthy();
    });

    it('should hide clear button when searchTerm is empty', () => {
      expect(fixture.nativeElement.querySelector('.uw-search__clear')).toBeFalsy();
    });
  });

  describe('disabled', () => {
    it('should set disabled input', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(component.disabled()).toBe(true);
    });

    it('should not be disabled by default', () => {
      expect(component.disabled()).toBe(false);
    });
  });

  describe('icons', () => {
    it('should render search icon', () => {
      const searchIcon = fixture.nativeElement.querySelector('.uw-search__icon .material-symbols-outlined');
      expect(searchIcon).toBeTruthy();
      expect(searchIcon.textContent).toBe('search');
    });
  });

  describe('defaults', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should default to empty searchTerm', () => {
      expect(component.searchTerm()).toBe('');
    });
  });
});
