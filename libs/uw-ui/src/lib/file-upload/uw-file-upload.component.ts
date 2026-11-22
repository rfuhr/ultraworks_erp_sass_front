import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type FileUploadSize = 'sm' | 'md';

@Component({
  selector: 'uw-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uw-file-upload.component.html',
  styleUrl: './uw-file-upload.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UwFileUploadComponent implements OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private objectUrl: string | null = null;

  protected readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  readonly file = signal<File | null>(null);
  readonly error = signal<string | null>(null);
  readonly isDragOver = signal(false);

  readonly accept = input<string>('image/png,image/jpeg,image/webp,image/avif,application/pdf,.doc,.docx,.xls,.xlsx');
  readonly maxSize = input<number>(10 * 1024 * 1024);
  readonly disabled = input(false);
  readonly size = input<FileUploadSize>('md');
  readonly hint = input<string>('PNG, JPG, WebP, AVIF, PDF, DOC ou XLS • Máx 10MB');
  readonly errorMessage = input<string | null>(null);
  readonly src = input<string | null>(null);
  readonly srcType = input<string | null>(null);
  readonly srcName = input<string | null>(null);
  readonly srcSize = input<number | null>(null);
  readonly previewMode = input<'thumbnail' | 'full'>('thumbnail');
  readonly aspectRatio = input<string | null>(null);

  readonly fileChange = output<File | null>();
  readonly errorChange = output<string>();

  protected readonly previewUrl = computed<string | null>(() => {
    const f = this.file();
    if (f) {
      if (!f.type.startsWith('image/')) return null;
      return this.objectUrl;
    }
    if (!this.isImage()) return null;
    return this.src();
  });

  protected readonly previewBg = computed<string | null>(() => {
    if (this.previewMode() !== 'full') return null;
    const url = this.previewUrl();
    return url ? `url(${url})` : null;
  });

  protected readonly isImage = computed(() => {
    const f = this.file();
    if (f) return f.type.startsWith('image/');
    if (!this.src()) return false;
    const type = this.srcType();
    if (type) return type.startsWith('image/');
    return true;
  });

  protected readonly fileName = computed(() => {
    const f = this.file();
    if (f) return f.name;
    return this.srcName() ?? '';
  });
  protected readonly fileSize = computed(() => {
    const f = this.file();
    if (f) return this.formatSize(f.size);
    const s = this.srcSize();
    return s !== null ? this.formatSize(s) : '';
  });
  protected readonly fileType = computed(() => {
    const f = this.file();
    if (f) {
      const ext = f.name.split('.').pop()?.toUpperCase() ?? '';
      return ext;
    }
    const name = this.srcName();
    if (name) {
      const ext = name.split('.').pop()?.toUpperCase() ?? '';
      return ext;
    }
    return '';
  });
  protected readonly isDisabled = computed(() => this.disabled());

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDragOver.set(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDragOver.set(false);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.isDragOver.set(false);
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  protected onClick(): void {
    if (this.disabled()) return;
    this.fileInput()?.nativeElement.click();
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onClick();
    }
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.processFile(file);
    }
    input.value = '';
  }

  private processFile(file: File): void {
    this.error.set(null);

    if (!this.validateType(file)) {
      const msg = `Tipo de arquivo não suportado. Aceito: ${this.accept()}`;
      this.error.set(msg);
      this.errorChange.emit(msg);
      return;
    }

    if (!this.validateSize(file)) {
      const msg = `Arquivo muito grande. Máximo permitido: ${this.formatSize(this.maxSize())}`;
      this.error.set(msg);
      this.errorChange.emit(msg);
      return;
    }

    this.revokePreview();
    this.file.set(file);

    if (file.type.startsWith('image/')) {
      this.objectUrl = URL.createObjectURL(file);
    }

    this.fileChange.emit(file);
  }

  protected readonly empty = computed(() => this.file() === null && this.src() === null);

  protected onRemove(event: MouseEvent): void {
    event.stopPropagation();
    this.revokePreview();
    this.file.set(null);
    this.error.set(null);
    this.fileChange.emit(null);
  }

  private revokePreview(): void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
  }

  private validateType(file: File): boolean {
    const accepted = this.accept().split(',').map(a => a.trim()).filter(Boolean);
    if (accepted.length === 0) return true;

    const fileExt = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`;
    return accepted.some(a => {
      if (a.startsWith('.')) {
        return a.toLowerCase() === fileExt;
      }
      if (a.endsWith('/*')) {
        const typePrefix = a.slice(0, -1);
        return file.type.startsWith(typePrefix);
      }
      return file.type === a;
    });
  }

  private validateSize(file: File): boolean {
    return file.size <= this.maxSize();
  }

  private formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  ngOnDestroy(): void {
    this.revokePreview();
  }
}
