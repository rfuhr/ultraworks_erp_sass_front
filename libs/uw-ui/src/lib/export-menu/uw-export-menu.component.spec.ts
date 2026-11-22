import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwExportMenuComponent } from './uw-export-menu.component';

describe('UwExportMenuComponent', () => {
  let fixture: ComponentFixture<UwExportMenuComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [UwExportMenuComponent] });
    fixture = TestBed.createComponent(UwExportMenuComponent);
    fixture.detectChanges();
  });

  it('abre o menu ao clicar no botão', () => {
    const botao: HTMLButtonElement = fixture.nativeElement.querySelector('uw-button button');
    botao.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.uw-export-menu__panel')).not.toBeNull();
  });

  it('emite o formato escolhido e fecha o menu', () => {
    const emitidos: string[] = [];
    fixture.componentInstance.exportar.subscribe((formato) => emitidos.push(formato));

    fixture.nativeElement.querySelector('uw-button button').click();
    fixture.detectChanges();
    const itens: HTMLButtonElement[] = fixture.nativeElement.querySelectorAll('.uw-export-menu__item');
    itens[1].click();
    fixture.detectChanges();

    expect(emitidos).toEqual(['csv']);
    expect(fixture.nativeElement.querySelector('.uw-export-menu__panel')).toBeNull();
  });

  it('não abre enquanto estiver carregando', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('uw-button button').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.uw-export-menu__panel')).toBeNull();
  });
});
