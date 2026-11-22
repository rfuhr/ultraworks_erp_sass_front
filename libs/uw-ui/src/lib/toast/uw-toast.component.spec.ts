import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UwToastComponent } from './uw-toast.component';
import { ToastService } from './toast.service';
import { NoopAnimations } from '@angular/platform-browser/animations';

function createHost(template: string): ComponentFixture<unknown> {
  @Component({
    template,
    imports: [UwToastComponent],
    standalone: true,
  })
  class HostComponent {}

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [HostComponent],
    providers: [ToastService],
    ...NoopAnimations ? {} : {},
  });

  const fixture = TestBed.createComponent(HostComponent);
  fixture.detectChanges();
  return fixture;
}

describe('UwToastComponent', () => {
  beforeEach(() => {
    const service = TestBed.inject(ToastService);
    service.clear();
  });

  it('deve criar o componente', () => {
    const fixture = createHost(`<uw-toast />`);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve adicionar toasts via serviço', () => {
    const fixture = createHost(`<uw-toast />`);
    const service = TestBed.inject(ToastService);
    service.show('Mensagem de teste', 'success');
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].message).toBe('Mensagem de teste');
  });

  it('deve remover toast pelo id', () => {
    const service = TestBed.inject(ToastService);
    const id = service.show('Remover', 'info');
    expect(service.toasts().length).toBe(1);
    service.remove(id);
    expect(service.toasts().length).toBe(0);
  });

  it('deve limpar todos os toasts', () => {
    const service = TestBed.inject(ToastService);
    service.show('A', 'success');
    service.show('B', 'error');
    service.clear();
    expect(service.toasts().length).toBe(0);
  });
});
