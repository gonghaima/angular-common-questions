import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast, ToastService } from './toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast-notifications',
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toasts$ | async" class="toast toast-{{ toast.type }}" (click)="removeToast(toast.id)">
        {{ toast.message }}
      </div>
    </div>

    <div>
      <button (click)="showSuccess()">Show Success</button>
      <button (click)="showError()">Show Error</button>
      <button (click)="showInfo()">Show Info</button>
      <button (click)="showWarning()">Show Warning</button>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
    }
    .toast {
      padding: 15px;
      margin-bottom: 10px;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
    .toast-success { background-color: #28a745; }
    .toast-error { background-color: #dc3545; }
    .toast-info { background-color: #17a2b8; }
    .toast-warning { background-color: #ffc107; color: #000; }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class ToastNotificationsComponent implements OnInit {
  toasts$: Observable<Toast[]>;

  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.getToasts();
  }

  ngOnInit(): void {
  }

  removeToast(id: number) {
    this.toastService.removeToast(id);
  }

  showSuccess() {
    this.toastService.addToast('Success message!', 'success');
  }

  showError() {
    this.toastService.addToast('Error message!', 'error');
  }

  showInfo() {
    this.toastService.addToast('Info message!', 'info');
  }

  showWarning() {
    this.toastService.addToast('Warning message!', 'warning');
  }
}
