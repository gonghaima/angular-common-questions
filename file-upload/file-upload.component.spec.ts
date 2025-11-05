import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { By } from '@angular/platform-browser';

describe('FileUploadComponent', () => {
  let fixture: ComponentFixture<FileUploadComponent>;
  let component: FileUploadComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should select files via input', () => {
    const emitSpy = jest.spyOn(component.filesChange, 'emit');
    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' });
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    Object.defineProperty(input, 'files', { value: [file] });
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.files.length).toBe(1);
    expect(component.files[0].name).toBe('foo.txt');
    expect(emitSpy).toHaveBeenCalledWith([file]);
  });

  it('should show error for invalid file type', () => {
    component.accept = 'image/*';
    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' });
    component.handleFiles([file]);
    fixture.detectChanges();
    expect(component.error).toContain('Invalid file type');
  });

  it('should show error for file too large', () => {
    component.maxSize = 1;
    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' });
    component.handleFiles([file]);
    fixture.detectChanges();
    expect(component.error).toContain('File too large');
  });

  it('should emit event when file removed', () => {
    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' });
    component.files = [file];
    const emitSpy = jest.spyOn(component.filesChange, 'emit');
    component.removeFile(0);
    fixture.detectChanges();
    expect(component.files.length).toBe(0);
    expect(emitSpy).toHaveBeenCalledWith([]);
  });

  it('should show drag-over indicator', () => {
    const dropDiv = fixture.debugElement.query(By.css('.upload-drop')).nativeElement;
    dropDiv.dispatchEvent(new Event('dragover'));
    fixture.detectChanges();
    expect(dropDiv.classList).toContain('drag-over');
    dropDiv.dispatchEvent(new Event('dragleave'));
    fixture.detectChanges();
    expect(dropDiv.classList).not.toContain('drag-over');
  });
});
