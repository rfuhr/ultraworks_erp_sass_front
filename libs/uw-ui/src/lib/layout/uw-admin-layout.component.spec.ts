import { TestBed } from '@angular/core/testing';
import { UwAdminLayoutComponent } from './uw-admin-layout.component';

describe('UwAdminLayoutComponent', () => {
  it('deve renderizar menu, usuário e emitir navegação', async () => {
    await TestBed.configureTestingModule({ imports: [UwAdminLayoutComponent] }).compileComponents();

    const fixture = TestBed.createComponent(UwAdminLayoutComponent);
    fixture.componentRef.setInput('menuItems', [
      { label: 'Início', icon: 'home', path: '/home' },
    ]);
    fixture.componentRef.setInput('user', { name: 'Ana Souza', role: 'Admin', initials: 'AS' });
    fixture.componentRef.setInput('breadcrumb', [{ label: 'Início' }]);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Início');
    expect(text).toContain('Ana Souza');

    let navigated = '';
    fixture.componentInstance.navigate.subscribe((path) => (navigated = path));

    const button = fixture.nativeElement.querySelector('.uw-sidebar__item') as HTMLButtonElement;
    button.click();

    expect(navigated).toBe('/home');
  });
});
