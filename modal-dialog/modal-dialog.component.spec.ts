import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDialogComponent } from './modal-dialog.component';

describe('ModalDialogComponent', () => {
  let component: ModalDialogComponent;
  let fixture: ComponentFixture<ModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event when close button clicked', () => {
    jest.spyOn(component.modalClose, 'emit');
    
    const closeBtn = fixture.nativeElement.querySelector('.close-btn');
    closeBtn.click();
    
    expect(component.modalClose.emit).toHaveBeenCalled();
  });

  it('should close on backdrop click when backdropDismiss is true', () => {
    component.config = { backdropDismiss: true };
    jest.spyOn(component.modalClose, 'emit');
    
    const backdrop = fixture.nativeElement.querySelector('.modal-backdrop');
    backdrop.click();
    
    expect(component.modalClose.emit).toHaveBeenCalled();
  });

  it('should not close on backdrop click when backdropDismiss is false', () => {
    component.config = { backdropDismiss: false };
    jest.spyOn(component.modalClose, 'emit');
    
    const backdrop = fixture.nativeElement.querySelector('.modal-backdrop');
    backdrop.click();
    
    expect(component.modalClose.emit).not.toHaveBeenCalled();
  });

  it('should close on ESC key press', () => {
    jest.spyOn(component.modalClose, 'emit');
    
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    
    expect(component.modalClose.emit).toHaveBeenCalled();
  });

  it('should apply correct size class', () => {
    component.config = { size: 'lg' };
    fixture.detectChanges();
    
    const modalContent = fixture.nativeElement.querySelector('.modal-content');
    expect(modalContent.classList).toContain('modal-lg');
  });
});