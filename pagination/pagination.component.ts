import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav aria-label="Pagination Navigation">
      <ul class="pagination">
        <li>
          <button
            aria-label="Previous page"
            [disabled]="currentPage === 1"
            (click)="selectPage(currentPage - 1)"
          >
            Previous
          </button>
        </li>
        <li *ngFor="let page of pages" [class.active]="page === currentPage">
          <button
            *ngIf="page !== '...'"
            (click)="selectPage(page)"
            [attr.aria-current]="page === currentPage ? 'page' : null"
          >
            {{ page }}
          </button>
          <span *ngIf="page === '...'">...</span>
        </li>
        <li>
          <button
            aria-label="Next page"
            [disabled]="currentPage === totalPages"
            (click)="selectPage(currentPage + 1)"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  `,
  styles: [
    `
      .pagination {
        display: flex;
        list-style: none;
        padding: 0;
      }
      .pagination li {
        margin: 0 2px;
      }
      .pagination button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .pagination .active button {
        font-weight: bold;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() itemsPerPage = 10;
  @Input() currentPage = 1;
  @Input() maxVisiblePages = 5;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage) || 1;
  }

  get pages(): (number | string)[] {
    const total = this.totalPages;
    const max = this.maxVisiblePages;
    const current = this.currentPage;
    if (total <= max) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    let start = Math.max(1, current - Math.floor(max / 2));
    let end = start + max - 1;
    if (end > total) {
      end = total;
      start = end - max + 1;
    }
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < total) {
      if (end < total - 1) pages.push('...');
      pages.push(total);
    }
    return pages;
  }

  selectPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.pageChange.emit(page);
  }
}
