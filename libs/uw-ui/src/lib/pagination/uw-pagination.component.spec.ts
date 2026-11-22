import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwPaginationComponent } from './uw-pagination.component';

describe('UwPaginationComponent', () => {
  let fixture: ComponentFixture<UwPaginationComponent>;
  let component: UwPaginationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [UwPaginationComponent] }).compileComponents();
    fixture = TestBed.createComponent(UwPaginationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('page', 0);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('totalElements', 25);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar na primeira página e exibir 3 páginas', () => {
    expect(component.page()).toBe(0);
    expect(fixture.nativeElement.textContent).toContain('1');
    expect(fixture.nativeElement.textContent).toContain('3');
  });

  it('deve desabilitar a primeira página e habilitar a próxima', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.uw-pagination__btn') as NodeListOf<HTMLButtonElement>;
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[buttons.length - 1].disabled).toBe(false);
  });

  it('deve emitir pageChange ao navegar', () => {
    const spy = jest.fn();
    component.pageChange.subscribe(spy);

    const buttons = fixture.nativeElement.querySelectorAll('.uw-pagination__btn') as NodeListOf<HTMLButtonElement>;
    buttons[buttons.length - 2].click();

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('deve exibir o intervalo de itens', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('1');
    expect(text).toContain('10');
    expect(text).toContain('25');
  });
});
