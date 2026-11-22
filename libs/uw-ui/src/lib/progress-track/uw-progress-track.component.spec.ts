import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwProgressTrackComponent, type UwProgressStep } from './uw-progress-track.component';

const passos: UwProgressStep[] = [
  { label: 'Submetido', state: 'done' },
  { label: 'Avaliação', state: 'done' },
  { label: 'Revisão', state: 'disabled', hint: 'não solicitada' },
  { label: 'Reprovado', state: 'done', tone: 'error' },
];

function createHost(steps: UwProgressStep[], ariaLabel?: string): ComponentFixture<unknown> {
  @Component({
    template: `<uw-progress-track [steps]="steps" [ariaLabel]="ariaLabel" />`,
    imports: [UwProgressTrackComponent],
    standalone: true,
  })
  class HostComponent {
    steps = steps;
    ariaLabel = ariaLabel;
  }

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

function nos(fixture: ComponentFixture<unknown>): HTMLElement[] {
  return Array.from(fixture.nativeElement.querySelectorAll('.uw-progress-track__node'));
}

describe('UwProgressTrackComponent', () => {
  it('deve renderizar um nó por etapa', () => {
    const fixture = createHost(passos);

    expect(nos(fixture)).toHaveLength(4);
  });

  it('deve renderizar conectores entre as etapas, sem conector no último nó', () => {
    const fixture = createHost(passos);

    expect(
      fixture.nativeElement.querySelectorAll('.uw-progress-track__connector'),
    ).toHaveLength(3);
  });

  it('deve aplicar estado concluído nas etapas percorridas', () => {
    const fixture = createHost(passos);
    const pontos = fixture.nativeElement.querySelectorAll('.uw-progress-track__dot');

    expect(pontos[0].classList.contains('uw-progress-track__dot--done')).toBe(true);
    expect(pontos[1].classList.contains('uw-progress-track__dot--done')).toBe(true);
  });

  it('deve desabilitar a etapa não percorrida com aria-disabled', () => {
    const fixture = createHost(passos);
    const [terceiro] = Array.from(nos(fixture)).slice(2, 3);
    const ponto = terceiro.querySelector('.uw-progress-track__dot');

    expect(ponto?.classList.contains('uw-progress-track__dot--disabled')).toBe(true);
    expect(terceiro.getAttribute('aria-disabled')).toBe('true');
  });

  it('deve exibir o hint da etapa desabilitada', () => {
    const fixture = createHost(passos);

    expect(fixture.nativeElement.textContent).toContain('não solicitada');
  });

  it('deve destacar o desfecho reprovado com tom de erro', () => {
    const fixture = createHost(passos);
    const pontos = fixture.nativeElement.querySelectorAll('.uw-progress-track__dot');
    const rotulos = fixture.nativeElement.querySelectorAll('.uw-progress-track__label');

    expect(pontos[3].classList.contains('uw-progress-track__dot--error')).toBe(true);
    expect(rotulos[3].classList.contains('uw-progress-track__label--error')).toBe(true);
  });

  it('deve marcar a etapa corrente', () => {
    const fixture = createHost([{ label: 'Avaliação', state: 'current' }]);
    const ponto = fixture.nativeElement.querySelector('.uw-progress-track__dot');

    expect(ponto.classList.contains('uw-progress-track__dot--current')).toBe(true);
  });

  it('deve tracejar o conector quando a etapa seguinte está desabilitada', () => {
    const fixture = createHost(passos);
    const conectores = fixture.nativeElement.querySelectorAll('.uw-progress-track__connector');

    expect(
      conectores[1].classList.contains('uw-progress-track__connector--disabled'),
    ).toBe(true);
  });

  it('deve preencher o conector quando a etapa seguinte foi concluída', () => {
    const fixture = createHost(passos);
    const conectores = fixture.nativeElement.querySelectorAll('.uw-progress-track__connector');

    expect(
      conectores[0].classList.contains('uw-progress-track__connector--completed'),
    ).toBe(true);
  });

  it('deve expor rótulo acessível na trilha', () => {
    const fixture = createHost(passos, 'Progresso do trabalho');
    const trilha = fixture.nativeElement.querySelector('.uw-progress-track');

    expect(trilha.getAttribute('role')).toBe('list');
    expect(trilha.getAttribute('aria-label')).toBe('Progresso do trabalho');
  });

  it('deve permitir sobrescrever o ícone da etapa', () => {
    const fixture = createHost([{ label: 'Etapa', state: 'done', icon: 'done_all' }]);
    const icone = fixture.nativeElement.querySelector('.uw-progress-track__dot uw-icon');

    expect(icone?.textContent?.trim()).toBe('done_all');
  });
});
