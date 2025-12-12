import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  template: `
    <div class="accordion-header" 
         [class.disabled]="disabled"
         (click)="onToggle()"
         [attr.aria-expanded]="expanded"
         [attr.aria-disabled]="disabled"
         tabindex="0">
      <span>{{ title }}</span>
      <span class="icon" [class.rotated]="expanded">▼</span>
    </div>
    <div class="accordion-content" 
         [class.expanded]="expanded"
         [attr.aria-hidden]="!expanded">
      <div class="content-wrapper">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .accordion-header {
      padding: 1rem;
      background: #f5f5f5;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background-color 0.2s;
    }
    .accordion-header:hover:not(.disabled) {
      background: #e9e9e9;
    }
    .accordion-header.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .icon {
      transition: transform 0.3s;
    }
    .icon.rotated {
      transform: rotate(180deg);
    }
    .accordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
    }
    .accordion-content.expanded {
      max-height: 500px;
    }
    .content-wrapper {
      padding: 1rem;
    }
  `]
})
export class AccordionItemComponent {
  @Input() title = '';
  @Input() expanded = false;
  @Input() disabled = false;
  @Input() id = Math.random().toString(36).substring(2, 11);
  @Output() toggle = new EventEmitter<void>();

  onToggle() {
    if (!this.disabled) {
      this.expanded = !this.expanded;
      this.toggle.emit();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onToggle();
    }
  }
}