import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Toast[] = [];
  private toastSubject = new BehaviorSubject<Toast[]>([]);
  private lastId = 0;

  getToasts(): Observable<Toast[]> {
    return this.toastSubject.asObservable();
  }

  addToast(message: string, type: 'success' | 'error' | 'info' | 'warning', duration = 3000) {
    const newToast: Toast = {
      id: ++this.lastId,
      message,
      type,
      duration
    };
    this.toasts = [...this.toasts, newToast];
    this.toastSubject.next(this.toasts);

    if (duration) {
      setTimeout(() => this.removeToast(newToast.id), duration);
    }
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.toastSubject.next(this.toasts);
  }
}
