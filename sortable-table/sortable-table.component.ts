import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SortColumn {
  key: string;
  label: string;
  sortable?: boolean;
  sortFn?: (a: any, b: any) => number;
}

@Component({
  selector: 'app-sortable-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="sortable-table">
      <thead>
        <tr>
          <th *ngFor="let col of columns" (click)="onSort(col)" [class.sortable]="col.sortable !== false">
            {{ col.label }}
            <span *ngIf="sortKey === col.key">{{ sortDir === 'asc' ? '▲' : '▼' }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of sortedItems; let rowIndex = index">
          <ng-container *ngFor="let col of columns">
            <td>
              <ng-container *ngIf="cellTemplate; else defaultCell"
                [ngTemplateOutlet]="cellTemplate"
                [ngTemplateOutletContext]="{ $implicit: item, col: col, rowIndex: rowIndex }">
              </ng-container>
              <ng-template #defaultCell>{{ item[col.key] }}</ng-template>
            </td>
          </ng-container>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .sortable-table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ccc; padding: 8px; }
    th.sortable { cursor: pointer; user-select: none; }
    th.sortable:hover { background: #f0f0f0; }
  `]
})
export class SortableTableComponent {
  @Input() items: any[] = [];
  @Input() columns: SortColumn[] = [];
  @Input() cellTemplate?: TemplateRef<any>;
  @Output() sortChange = new EventEmitter<{ key: string; dir: 'asc' | 'desc' }>();

  sortKey: string | null = null;
  sortDir: 'asc' | 'desc' = 'asc';

  get sortedItems() {
    if (!this.sortKey) return this.items;
    const col = this.columns.find(c => c.key === this.sortKey);
    const arr = [...this.items];
    if (col?.sortFn) {
      arr.sort((a, b) => this.sortDir === 'asc' ? col.sortFn!(a, b) : col.sortFn!(b, a));
    } else {
      arr.sort((a, b) => {
        if (a[this.sortKey!] < b[this.sortKey!]) return this.sortDir === 'asc' ? -1 : 1;
        if (a[this.sortKey!] > b[this.sortKey!]) return this.sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return arr;
  }

  onSort(col: SortColumn) {
    if (col.sortable === false) return;
    if (this.sortKey === col.key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = col.key;
      this.sortDir = 'asc';
    }
    this.sortChange.emit({ key: this.sortKey, dir: this.sortDir });
  }
}
