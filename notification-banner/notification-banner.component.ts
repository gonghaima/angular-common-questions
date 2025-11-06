import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" class="banner" [ngClass]="type">
      <ng-content></ng-content>
      <button class="close" (click)="dismiss()">&times;</button>
    </div>
  `,
  styles: [`
    .banner { position: fixed; top: 0; left: 0; right: 0; padding: 16px; color: #fff; display: flex; align-items: center; justify-content: space-between; z-index: 1000; }
    .banner.success { background: #43a047; }
    .banner.error { background: #e53935; }
    .banner.info { background: #1e88e5; }
    .banner.warning { background: #fbc02d; color: #333; }
    .close { background: none; border: none; color: inherit; font-size: 1.5em; cursor: pointer; margin-left: 16px; }
  `]
})
export class NotificationBannerComponent implements OnInit, OnDestroy {
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() timeout?: number;
  @Output() dismissed = new EventEmitter<void>();

  visible = true;
  private timer: any;

  ngOnInit() {
    if (this.timeout && this.timeout > 0) {
      this.timer = setTimeout(() => this.dismiss(), this.timeout);
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  dismiss() {
    this.visible = false;
    this.dismissed.emit();
  }
}
