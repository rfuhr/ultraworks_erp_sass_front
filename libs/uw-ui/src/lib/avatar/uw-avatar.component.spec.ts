import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwAvatarComponent } from './uw-avatar.component';

describe('UwAvatarComponent', () => {
  let component: UwAvatarComponent;
  let fixture: ComponentFixture<UwAvatarComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwAvatarComponent],
    });

    fixture = TestBed.createComponent(UwAvatarComponent);
    component = fixture.componentInstance;
  });

  describe('image', () => {
    it('should render img when src is provided', () => {
      fixture.componentRef.setInput('src', 'foto.jpg');
      fixture.componentRef.setInput('initials', 'JS');
      fixture.detectChanges();
      const img = fixture.nativeElement.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.src).toContain('foto.jpg');
    });

    it('should set alt from initials', () => {
      fixture.componentRef.setInput('src', 'foto.jpg');
      fixture.componentRef.setInput('initials', 'JS');
      fixture.detectChanges();
      const img = fixture.nativeElement.querySelector('img');
      expect(img.alt).toBe('JS');
    });

    it('should set default alt when initials not provided', () => {
      fixture.componentRef.setInput('src', 'foto.jpg');
      fixture.detectChanges();
      const img = fixture.nativeElement.querySelector('img');
      expect(img.alt).toBe('avatar');
    });
  });

  describe('fallback', () => {
    it('should render initials when src is not provided', () => {
      fixture.componentRef.setInput('initials', 'JS');
      fixture.detectChanges();
      const fallback = fixture.nativeElement.querySelector('.uw-avatar__fallback');
      expect(fallback).toBeTruthy();
      expect(fallback.textContent.trim()).toBe('JS');
    });

    it('should not render img when src is not provided', () => {
      fixture.componentRef.setInput('initials', 'JS');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('img')).toBeFalsy();
    });

    it('should not render fallback when src is provided', () => {
      fixture.componentRef.setInput('src', 'foto.jpg');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.uw-avatar__fallback')).toBeFalsy();
    });
  });

  describe('size', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      it(`should apply ${size} size class`, () => {
        fixture.componentRef.setInput('initials', 'JS');
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        const fallback = fixture.nativeElement.querySelector('.uw-avatar__fallback');
        expect(fallback.classList.contains(`uw-avatar--${size}`)).toBe(true);
      });
    }

    it('should default to md size', () => {
      fixture.componentRef.setInput('initials', 'JS');
      fixture.detectChanges();
      const fallback = fixture.nativeElement.querySelector('.uw-avatar__fallback');
      expect(fallback.classList.contains('uw-avatar--md')).toBe(true);
    });
  });

  describe('defaults', () => {
    it('should create the component', () => {
      fixture.componentRef.setInput('initials', 'JS');
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should have rounded-full class on img', () => {
      fixture.componentRef.setInput('src', 'foto.jpg');
      fixture.detectChanges();
      const img = fixture.nativeElement.querySelector('img');
      expect(img.classList.contains('uw-avatar__img')).toBe(true);
    });
  });
});
