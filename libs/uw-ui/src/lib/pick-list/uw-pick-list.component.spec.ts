import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwPickListComponent } from './uw-pick-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UwPickListComponent', () => {
  let component: UwPickListComponent;
  let fixture: ComponentFixture<UwPickListComponent>;

  const defaultOptions = [
    { label: 'Opção A', value: 'a' },
    { label: 'Opção B', value: 'b' },
    { label: 'Opção C', value: 3 },
  ];

  beforeAll(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwPickListComponent, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(UwPickListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', defaultOptions);
    fixture.detectChanges();
  });

  function getTrigger(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.uw-pick-list__trigger');
  }

  function getClearButton(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.uw-pick-list__clear');
  }

  function getPanel(): HTMLElement | null {
    return document.querySelector('.uw-pick-list__panel');
  }

  function getOptions(): NodeListOf<HTMLElement> {
    return document.querySelectorAll('.uw-pick-list__option');
  }

  describe('render', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render trigger element', () => {
      expect(getTrigger()).toBeTruthy();
    });

    it('should show placeholder text when no value', () => {
      expect(getTrigger()?.textContent?.trim()).toBe('Selecionar...');
    });
  });

  describe('dropdown', () => {
    it('should open panel on trigger click', () => {
      getTrigger()?.click();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);
    });

    it('should close panel on option select', () => {
      getTrigger()?.click();
      fixture.detectChanges();
      component.onSelect(defaultOptions[0]);
      fixture.detectChanges();
      expect(component.isOpen()).toBe(false);
    });

    it('should close panel on outside click', () => {
      getTrigger()?.click();
      fixture.detectChanges();
      component.closeDropdown();
      expect(component.isOpen()).toBe(false);
    });
  });

  describe('selection', () => {
    it('should emit valueChange on option select', () => {
      const spy = jest.fn();
      component.valueChange.subscribe(spy);
      component.onSelect(defaultOptions[0]);
      expect(spy).toHaveBeenCalledWith('a');
    });

    it('should update trigger text after selection', () => {
      fixture.componentRef.setInput('value', 'a');
      fixture.detectChanges();
      expect(getTrigger()?.textContent?.trim()).toBe('Opção A');
    });
  });

  describe('placeholder', () => {
    it('should have default placeholder "Selecionar..."', () => {
      expect(component.placeholder()).toBe('Selecionar...');
    });

    it('should accept custom placeholder', () => {
      fixture.componentRef.setInput('placeholder', 'Escolha um evento');
      fixture.detectChanges();
      expect(getTrigger()?.textContent?.trim()).toBe('Escolha um evento');
    });
  });

  describe('clearable', () => {
    it('should hide clear button when clearable is false', () => {
      fixture.componentRef.setInput('clearable', false);
      fixture.componentRef.setInput('value', 'a');
      fixture.detectChanges();
      expect(getClearButton()).toBeFalsy();
    });

    it('should show clear button when clearable is true and has value', () => {
      fixture.componentRef.setInput('clearable', true);
      fixture.componentRef.setInput('value', 'a');
      fixture.detectChanges();
      expect(getClearButton()).toBeTruthy();
    });

    it('should hide clear button when clearable is true but no value', () => {
      fixture.componentRef.setInput('clearable', true);
      fixture.detectChanges();
      expect(getClearButton()).toBeFalsy();
    });

    it('should emit valueChange with null on clear', () => {
      const spy = jest.fn();
      component.valueChange.subscribe(spy);
      const event = new MouseEvent('click');
      component.onClear(event);
      expect(spy).toHaveBeenCalledWith(null);
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

    it('should apply disabled attribute to trigger', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(getTrigger()?.disabled).toBe(true);
    });

    it('should not open dropdown when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      component.toggleDropdown();
      expect(component.isOpen()).toBe(false);
    });
  });

  describe('selectedLabel', () => {
    it('should return correct label for selected value', () => {
      expect(component.selectedLabel()).toBe('');
      fixture.componentRef.setInput('value', 'a');
      fixture.detectChanges();
      expect(component.selectedLabel()).toBe('Opção A');
    });

    it('should return empty string when no value selected', () => {
      expect(component.selectedLabel()).toBe('');
    });
  });

  describe('hasValue', () => {
    it('should return true when value is set', () => {
      fixture.componentRef.setInput('value', 'a');
      fixture.detectChanges();
      expect(component.hasValue()).toBe(true);
    });

    it('should return false when value is null', () => {
      expect(component.hasValue()).toBe(false);
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(() => {
      component.isOpen.set(true);
      fixture.detectChanges();
    });

    it('should highlight first matching option on type', () => {
      const event = new KeyboardEvent('keydown', { key: 'O' });
      component.onKeydown(event);
      expect(component.highlightedIndex()).toBe(0);
    });

    it('should highlight option matching multiple characters', () => {
      const e1 = new KeyboardEvent('keydown', { key: 'O' });
      component.onKeydown(e1);
      const e2 = new KeyboardEvent('keydown', { key: 'p' });
      component.onKeydown(e2);
      expect(component.highlightedIndex()).toBe(0);
    });

    it('should move highlight on ArrowDown', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeydown(event);
      expect(component.highlightedIndex()).toBe(0);
      component.onKeydown(event);
      expect(component.highlightedIndex()).toBe(1);
    });

    it('should move highlight on ArrowUp', () => {
      component.highlightedIndex.set(2);
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeydown(event);
      expect(component.highlightedIndex()).toBe(1);
    });

    it('should close on Escape', () => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.onKeydown(event);
      expect(component.isOpen()).toBe(false);
    });

    it('should select highlighted option on Enter', () => {
      const spy = jest.fn();
      component.valueChange.subscribe(spy);
      component.highlightedIndex.set(1);
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onKeydown(event);
      expect(spy).toHaveBeenCalledWith('b');
    });
  });

  describe('icons', () => {
    it('should render chevron icon', () => {
      const chevron = fixture.nativeElement.querySelector('.uw-pick-list__chevron');
      expect(chevron).toBeTruthy();
      expect(chevron.textContent).toBe('expand_more');
    });
  });
});
