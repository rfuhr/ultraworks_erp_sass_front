import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwAvatarGroupComponent } from './uw-avatar-group.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UwAvatarGroupComponent', () => {
  let component: UwAvatarGroupComponent;
  let fixture: ComponentFixture<UwAvatarGroupComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwAvatarGroupComponent, NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(UwAvatarGroupComponent);
    component = fixture.componentInstance;
  });

  describe('items', () => {
    it('should render avatars for each item', () => {
      fixture.componentRef.setInput('items', [
        { src: 'a.jpg', initials: 'A' },
        { src: 'b.jpg', initials: 'B' },
      ]);
      fixture.detectChanges();
      const avatars = fixture.nativeElement.querySelectorAll('uw-avatar');
      expect(avatars.length).toBe(2);
    });

    it('should not render avatars when items is empty', () => {
      fixture.componentRef.setInput('items', []);
      fixture.detectChanges();
      const avatars = fixture.nativeElement.querySelectorAll('uw-avatar');
      expect(avatars.length).toBe(0);
    });
  });

  describe('maxVisible', () => {
    it('should limit visible avatars', () => {
      fixture.componentRef.setInput('items', [
        { src: 'a.jpg' }, { src: 'b.jpg' }, { src: 'c.jpg' }, { src: 'd.jpg' },
      ]);
      fixture.componentRef.setInput('maxVisible', 2);
      fixture.detectChanges();
      const avatars = fixture.nativeElement.querySelectorAll('uw-avatar');
      expect(avatars.length).toBe(2);
    });

    it('should show +N remainder indicator', () => {
      fixture.componentRef.setInput('items', [
        { src: 'a.jpg' }, { src: 'b.jpg' }, { src: 'c.jpg' }, { src: 'd.jpg' }, { src: 'e.jpg' },
      ]);
      fixture.componentRef.setInput('maxVisible', 3);
      fixture.detectChanges();
      const remainder = fixture.nativeElement.querySelector('.uw-avatar-group__remainder');
      expect(remainder).toBeTruthy();
      expect(remainder.textContent.trim()).toBe('+2');
    });

    it('should not show remainder when within maxVisible', () => {
      fixture.componentRef.setInput('items', [
        { src: 'a.jpg' }, { src: 'b.jpg' },
      ]);
      fixture.detectChanges();
      const remainder = fixture.nativeElement.querySelector('.uw-avatar-group__remainder');
      expect(remainder).toBeFalsy();
    });
  });

  describe('defaults', () => {
    it('should create the component', () => {
      fixture.componentRef.setInput('items', []);
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });
});
