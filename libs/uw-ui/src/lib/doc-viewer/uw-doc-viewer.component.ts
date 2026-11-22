import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import type { DocViewerDocument } from './uw-doc-viewer.types';

export type DocViewerPreviewKind = 'imagem' | 'pdf' | 'outro';

const EXTENSOES_IMAGEM = new Set([
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'bmp',
  'svg',
  'avif',
]);

@Directive({
  selector: '[uwSidepanel]',
  standalone: true,
})
export class UwSidepanelDirective {}

@Component({
  selector: 'uw-doc-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, UwSidepanelDirective],
  templateUrl: './uw-doc-viewer.component.html',
  styleUrl: './uw-doc-viewer.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwDocViewerComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly document = input.required<DocViewerDocument>();
  readonly open = input(false);

  readonly close = output<void>();

  readonly sidePanelContent = contentChild(UwSidepanelDirective);

  readonly previewKind = computed<DocViewerPreviewKind>(() => {
    if (!this.document().url) return 'outro';
    const extensao = this.extensaoDocumento();
    if (extensao === 'pdf') return 'pdf';
    return EXTENSOES_IMAGEM.has(extensao) ? 'imagem' : 'outro';
  });

  readonly pdfUrl = computed(() => {
    const url = this.document().url;
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  });

  zoom = 100;

  zoomIn(): void {
    this.zoom = Math.min(200, this.zoom + 25);
  }
  zoomOut(): void {
    this.zoom = Math.max(50, this.zoom - 25);
  }

  download(): void {
    const url = this.document().url;
    if (url) {
      window.open(url, '_blank');
    }
  }

  private extensaoDocumento(): string {
    const documento = this.document();
    const origem = documento.nome || documento.url;
    const semParametros = origem.split('?')[0]?.split('#')[0] ?? '';
    const partes = semParametros.split('.');
    const extensao = partes.length > 1 ? partes.at(-1) : '';
    return extensao?.toLowerCase() ?? '';
  }
}
