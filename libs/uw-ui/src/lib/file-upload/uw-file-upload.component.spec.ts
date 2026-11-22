import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwFileUploadComponent } from './uw-file-upload.component';

function createDragEvent(type: string, file?: File): Event {
  const event = new Event(type);
  if (file) {
    Object.defineProperty(event, 'dataTransfer', {
      value: { files: [file] },
    });
  }
  return event;
}

describe('UwFileUploadComponent', () => {
  let component: UwFileUploadComponent;
  let fixture: ComponentFixture<UwFileUploadComponent>;

  function createFile(name: string, type: string, size = 1024): File {
    return new File([new ArrayBuffer(size)], name, { type });
  }

  beforeAll(() => {
    globalThis.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    globalThis.URL.revokeObjectURL = jest.fn();
  });

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwFileUploadComponent],
    });

    fixture = TestBed.createComponent(UwFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('empty state', () => {
    it('should render placeholder with icon, text and hint', () => {
      const placeholder = fixture.nativeElement.querySelector('.uw-file-upload__placeholder');
      expect(placeholder).toBeTruthy();

      const icon = placeholder.querySelector('.material-symbols-outlined');
      expect(icon).toBeTruthy();
      expect(icon.textContent).toBe('upload');

      const text = placeholder.querySelector('.uw-file-upload__text');
      expect(text).toBeTruthy();
      expect(text.textContent).toContain('Clique para enviar');

      const hint = placeholder.querySelector('.uw-file-upload__hint');
      expect(hint).toBeTruthy();
    });

    it('should render custom hint', () => {
      fixture.componentRef.setInput('hint', 'Custom hint');
      fixture.detectChanges();
      const hint = fixture.nativeElement.querySelector('.uw-file-upload__hint');
      expect(hint.textContent).toBe('Custom hint');
    });
  });

  describe('click to select', () => {
    it('should trigger input click when area is clicked', () => {
      const input = fixture.nativeElement.querySelector('input[type="file"]');
      const clickSpy = jest.spyOn(input, 'click');
      const area = fixture.nativeElement.querySelector('.uw-file-upload');
      area.click();
      expect(clickSpy).toHaveBeenCalled();
    });
  });

  describe('drag and drop', () => {
    it('should set isDragOver on dragover', () => {
      const event = createDragEvent('dragover');
      jest.spyOn(event, 'preventDefault');
      fixture.nativeElement.dispatchEvent(event);
      expect(component.isDragOver()).toBe(true);
    });

    it('should reset isDragOver on dragleave', () => {
      component.isDragOver.set(true);
      fixture.detectChanges();
      fixture.nativeElement.dispatchEvent(createDragEvent('dragleave'));
      expect(component.isDragOver()).toBe(false);
    });

    it('should add drag-over class when isDragOver is true', () => {
      component.isDragOver.set(true);
      fixture.detectChanges();
      const area = fixture.nativeElement.querySelector('.uw-file-upload');
      expect(area.classList.contains('uw-file-upload--drag-over')).toBe(true);
    });

    it('should process file on drop', () => {
      const file = createFile('foto.png', 'image/png');
      const processSpy = jest.spyOn(component as unknown as { processFile: (f: File) => void }, 'processFile');
      const event = createDragEvent('drop', file);
      jest.spyOn(event, 'preventDefault');
      fixture.nativeElement.dispatchEvent(event);
      expect(processSpy).toHaveBeenCalledWith(file);
    });
  });

  describe('validation', () => {
    it('should accept valid MIME type', () => {
      fixture.componentRef.setInput('accept', 'image/png');
      fixture.detectChanges();
      const file = createFile('foto.png', 'image/png');
      component['processFile'](file);
      expect(component.error()).toBeNull();
      expect(component.file()).toBe(file);
    });

    it('should reject invalid MIME type', () => {
      fixture.componentRef.setInput('accept', 'image/png');
      fixture.detectChanges();
      const file = createFile('doc.pdf', 'application/pdf');
      component['processFile'](file);
      expect(component.error()).toBeTruthy();
      expect(component.file()).toBeNull();
    });

    it('should accept file extension in accept list', () => {
      fixture.componentRef.setInput('accept', 'image/png,.pdf');
      fixture.detectChanges();
      const file = createFile('doc.pdf', 'application/pdf');
      component['processFile'](file);
      expect(component.error()).toBeNull();
      expect(component.file()).toBe(file);
    });

    it('should accept image/* wildcard', () => {
      fixture.componentRef.setInput('accept', 'image/*');
      fixture.detectChanges();
      const file = createFile('foto.webp', 'image/webp');
      component['processFile'](file);
      expect(component.error()).toBeNull();
      expect(component.file()).toBe(file);
    });

    it('should reject file exceeding maxSize', () => {
      fixture.componentRef.setInput('maxSize', 100);
      fixture.detectChanges();
      const file = createFile('large.jpg', 'image/jpeg', 200);
      component['processFile'](file);
      expect(component.error()).toBeTruthy();
      expect(component.file()).toBeNull();
    });

    it('should accept file within maxSize', () => {
      fixture.componentRef.setInput('maxSize', 2048);
      fixture.detectChanges();
      const file = createFile('small.jpg', 'image/jpeg', 1024);
      component['processFile'](file);
      expect(component.error()).toBeNull();
      expect(component.file()).toBe(file);
    });

    it('should emit errorChange on validation error', () => {
      const spy = jest.fn();
      component.errorChange.subscribe(spy);
      fixture.componentRef.setInput('accept', 'image/png');
      fixture.detectChanges();
      const file = createFile('doc.pdf', 'application/pdf');
      component['processFile'](file);
      expect(spy).toHaveBeenCalled();
    });

    it('should render external errorMessage input', () => {
      fixture.componentRef.setInput('errorMessage', 'Campo obrigatório');
      fixture.detectChanges();
      const error = fixture.nativeElement.querySelector('.uw-file-upload__error');
      expect(error).toBeTruthy();
      expect(error.textContent).toBe('Campo obrigatório');
    });
  });

  describe('preview', () => {
    it('should set preview URL for image files', () => {
      const file = createFile('foto.png', 'image/png');
      component['processFile'](file);
      expect(component.previewUrl()).toBeTruthy();
    });

    it('should not set preview URL for non-image files', () => {
      const file = createFile('doc.pdf', 'application/pdf');
      component['processFile'](file);
      expect(component.previewUrl()).toBeNull();
    });

    it('should show file info for non-image files', () => {
      const file = createFile('relatorio.pdf', 'application/pdf');
      component['processFile'](file);
      fixture.detectChanges();
      const fileInfo = fixture.nativeElement.querySelector('.uw-file-upload__file-info');
      expect(fileInfo).toBeTruthy();
      const fileName = fixture.nativeElement.querySelector('.uw-file-upload__file-name');
      expect(fileName.textContent).toBe('relatorio.pdf');
    });

    it('should clean up ObjectURL on remove', () => {
      const revokeSpy = jest.fn();
      globalThis.URL.revokeObjectURL = revokeSpy;
      const file = createFile('foto.png', 'image/png');
      (component as unknown as { processFile: (f: File) => void }).processFile(file);
      (component as unknown as { onRemove: (e: MouseEvent) => void }).onRemove(new MouseEvent('click'));
      expect(revokeSpy).toHaveBeenCalledWith('blob:mock-url');
    });
  });

  describe('fileChange output', () => {
    it('should emit file when selected', () => {
      const spy = jest.fn();
      component.fileChange.subscribe(spy);
      const file = createFile('foto.png', 'image/png');
      component['processFile'](file);
      expect(spy).toHaveBeenCalledWith(file);
    });

    it('should emit null when removed', () => {
      const spy = jest.fn();
      component.fileChange.subscribe(spy);
      const file = createFile('foto.png', 'image/png');
      component['processFile'](file);
      component.onRemove(new MouseEvent('click'));
      expect(spy).toHaveBeenCalledWith(null);
    });
  });

  describe('disabled state', () => {
    it('should add disabled class when disabled input is true', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const area = fixture.nativeElement.querySelector('.uw-file-upload');
      expect(area.classList.contains('uw-file-upload--disabled')).toBe(true);
    });

    it('should not process file when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const processSpy = jest.spyOn(component as unknown as { processFile: (f: File) => void }, 'processFile');
      const file = createFile('foto.png', 'image/png');
      const event = createDragEvent('drop', file);
      fixture.nativeElement.dispatchEvent(event);
      expect(processSpy).not.toHaveBeenCalled();
    });

    it('should not trigger click when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('input[type="file"]');
      const clickSpy = jest.spyOn(input, 'click');
      const area = fixture.nativeElement.querySelector('.uw-file-upload');
      area.click();
      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('size variants', () => {
    it('should default to md (no sm class)', () => {
      const area = fixture.nativeElement.querySelector('.uw-file-upload');
      expect(component.size()).toBe('md');
      expect(area.classList.contains('uw-file-upload--sm')).toBe(false);
    });

    it('should add sm class when size is sm', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();
      const area = fixture.nativeElement.querySelector('.uw-file-upload');
      expect(area.classList.contains('uw-file-upload--sm')).toBe(true);
    });

    it('should render placeholder hint (type and max size) in sm mode', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.componentRef.setInput('hint', 'PDF • Máx 10MB');
      fixture.detectChanges();
      const hint = fixture.nativeElement.querySelector('.uw-file-upload__hint');
      expect(hint).toBeTruthy();
      expect(hint.textContent).toBe('PDF • Máx 10MB');
    });
  });

  describe('defaults', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should default to empty file', () => {
      expect(component.file()).toBeNull();
    });

    it('should default to null error', () => {
      expect(component.error()).toBeNull();
    });
  });
});
