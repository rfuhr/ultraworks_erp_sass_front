import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwChipComponent } from './uw-chip.component';

describe('UwChipComponent', () => {
  let fixture: ComponentFixture<UwChipComponent>;
  let component: UwChipComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UwChipComponent] });
    fixture = TestBed.createComponent(UwChipComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Angular');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label', () => {
    expect(fixture.nativeElement.textContent).toContain('Angular');
  });

  it('should emit removed event', () => {
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();
    const spy = jest.spyOn(component.removed, 'emit');
    fixture.nativeElement.querySelector('.uw-chip__remove')?.click();
    expect(spy).toHaveBeenCalledWith('Angular');
  });
});
