import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

export interface ModalConfig {
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  backdropDismiss?: boolean;
}

@Component({
  selector: 'app-modal-dialog',
  template: `
    <div class="modal-backdrop" (click)="onBackdropClick()">
      <div class="modal-content" [class]="'modal-' + config.size" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>{{ config.title }}</h3>
          <button class="close-btn" (click)="close()">&times;</button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-content {
      background: white;
      border-radius: 8px;
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal-sm { width: 300px; }
    .modal-md { width: 500px; }
    .modal-lg { width: 800px; }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #eee;
    }
    .modal-body { padding: 16px; }
    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }
  `]
})
export class ModalDialogComponent {
  @Input() config: ModalConfig = { size: 'md', backdropDismiss: true };
  @Output() modalClose = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.close();
  }

  onBackdropClick() {
    if (this.config.backdropDismiss) {
      this.close();
    }
  }

  close() {
    this.modalClose.emit();
  }
}