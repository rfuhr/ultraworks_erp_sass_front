import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwImageComponent } from './uw-image.component';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwImageComponent],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ imports: [HostComponent] });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

describe('UwImageComponent', () => {
  it('deve renderizar skeleton durante loading', () => {
    const fixture = createHost(`<uw-image src="foto.jpg" alt="Foto"/>`);
    const skeleton = fixture.nativeElement.querySelector('.image-skeleton');
    const img = fixture.nativeElement.querySelector('.image-img');
    expect(skeleton).toBeTruthy();
    expect(img).toBeTruthy();
    expect(img?.classList.contains('image-hidden')).toBe(true);
  });

  it('deve ter alt text', () => {
    const fixture = createHost(`<uw-image src="foto.jpg" alt="Minha Foto"/>`);
    const img = fixture.nativeElement.querySelector('.image-img');
    expect(img?.getAttribute('alt')).toBe('Minha Foto');
  });

  it('deve mostrar fallback ao errar', () => {
    const fixture = createHost(`<uw-image src="invalida.jpg" alt="Foto"/>`);
    const img = fixture.nativeElement.querySelector('.image-img');
    img?.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    const fallback = fixture.nativeElement.querySelector('.image-fallback');
    expect(fallback).toBeTruthy();
    expect(fallback?.textContent).toContain('Imagem não disponível');
  });

  it('deve remover classe image-hidden ao carregar', () => {
    const fixture = createHost(`<uw-image src="foto.jpg" alt="Foto"/>`);
    const img = fixture.nativeElement.querySelector('.image-img');
    img?.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(img?.classList.contains('image-hidden')).toBe(false);
  });

  it('deve usar lazy loading por padrão', () => {
    const fixture = createHost(`<uw-image src="foto.jpg" alt="Foto"/>`);
    const img = fixture.nativeElement.querySelector('.image-img');
    expect(img?.getAttribute('loading')).toBe('lazy');
  });
});
