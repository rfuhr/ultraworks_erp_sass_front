import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNgxMask } from 'ngx-mask';
import { CustomInputComponent } from './uw-input.component';

describe('CustomInputComponent — cartaoValidade', () => {
  let fixture: ComponentFixture<CustomInputComponent>;
  let componente: CustomInputComponent;

  function criar(valorInicial?: string, maxlength = 5): void {
    TestBed.configureTestingModule({
      imports: [CustomInputComponent],
      providers: [provideNgxMask()],
    });
    fixture = TestBed.createComponent(CustomInputComponent);
    componente = fixture.componentInstance;
    fixture.componentRef.setInput('type', 'cartaoValidade');
    fixture.componentRef.setInput('maxlength', maxlength);
    if (valorInicial !== undefined) {
      componente.writeValue(valorInicial);
    }
    fixture.detectChanges();
  }

  afterEach(() => TestBed.resetTestingModule());

  it('expõe máscara, placeholder e teclado numérico da validade', () => {
    criar();

    expect(componente.maskPattern()).toBe('00/00');
    expect(componente.effectivePlaceholder()).toBe('MM/AA');
    expect(componente.inputmode()).toBe('numeric');
    expect(componente.dropSpecialChars()).toBe(true);
  });

  it('formata o valor programático como MM/AA', () => {
    criar('1230');

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('12/30');
  });

  it('mantém a digitação parcial sem inventar separador', () => {
    criar('12');

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('12');
  });

  it('respeita o limite de 5 caracteres', () => {
    criar();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('maxlength')).toBe('5');
  });
});
