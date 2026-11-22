import { TestBed } from '@angular/core/testing';
import { UwDocViewerComponent } from './uw-doc-viewer.component';
import type { DocViewerDocument } from './uw-doc-viewer.types';

const DOCUMENTO_BASE: DocViewerDocument = {
  id: '11',
  tipo: 'RG',
  nome: 'rg.jpg',
  tamanho: '1 MB',
  dataEnvio: '2026-08-01T10:00:00.000Z',
  url: 'https://storage.example.com/documentos/rg.jpg',
  status: null,
  observacao: '',
};

describe('UwDocViewerComponent', () => {
  afterEach(() => TestBed.resetTestingModule());

  function configurar(documento: Partial<DocViewerDocument> = {}) {
    TestBed.configureTestingModule({
      imports: [UwDocViewerComponent],
    });
    const fixture = TestBed.createComponent(UwDocViewerComponent);
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('document', { ...DOCUMENTO_BASE, ...documento });
    fixture.detectChanges();
    return fixture;
  }

  it('exibe imagem inline quando o documento é uma imagem', () => {
    const fixture = configurar();
    const imagem = fixture.nativeElement.querySelector('img') as HTMLImageElement;

    expect(imagem).toBeTruthy();
    expect(imagem.getAttribute('src')).toBe(DOCUMENTO_BASE.url);
    expect(fixture.nativeElement.querySelector('iframe')).toBeNull();
  });

  it('exibe PDF inline quando o documento é um PDF', () => {
    const fixture = configurar({
      nome: 'contrato.pdf',
      url: 'https://storage.example.com/documentos/contrato.pdf',
    });
    const frame = fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement;

    expect(frame).toBeTruthy();
    expect(frame.getAttribute('src')).toContain('contrato.pdf');
    expect(fixture.nativeElement.querySelector('img')).toBeNull();
  });

  it('mantém o card de download para formatos não visualizáveis', () => {
    const fixture = configurar({
      nome: 'documento.docx',
      url: 'https://storage.example.com/documentos/documento.docx',
    });

    expect(fixture.nativeElement.querySelector('img')).toBeNull();
    expect(fixture.nativeElement.querySelector('iframe')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Baixar documento');
  });
});
