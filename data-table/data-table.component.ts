import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  template?: string;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc' | null;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="data-table">
      <div class="table-controls">
        <input 
          type="text" 
          placeholder="Search..." 
          [(ngModel)]="searchTerm"
          (input)="onFilter()"
          class="search-input">
      </div>
      
      <table class="table">
        <thead>
          <tr>
            <th *ngFor="let column of columns" 
                [class.sortable]="column.sortable"
                (click)="onSort(column)">
              {{ column.label }}
              <span *ngIf="column.sortable && sortColumn === column.key" 
                    class="sort-indicator">
                {{ sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of paginatedData; trackBy: trackByFn">
            <td *ngFor="let column of columns">
              <ng-container *ngIf="!column.template">
                {{ row[column.key] }}
              </ng-container>
              <ng-container *ngIf="column.template">
                <ng-content [select]="'[data-template=' + column.template + ']'"></ng-content>
              </ng-container>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="pagination" *ngIf="totalPages > 1">
        <button (click)="goToPage(currentPage - 1)" 
                [disabled]="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button (click)="goToPage(currentPage + 1)" 
                [disabled]="currentPage === totalPages">Next</button>
      </div>
    </div>
  `,
  styles: [`
    .data-table { width: 100%; }
    .search-input { margin-bottom: 1rem; padding: 0.5rem; }
    .table { width: 100%; border-collapse: collapse; }
    .table th, .table td { padding: 0.75rem; border: 1px solid #ddd; text-align: left; }
    .sortable { cursor: pointer; }
    .sort-indicator { margin-left: 0.5rem; }
    .pagination { margin-top: 1rem; text-align: center; }
    .pagination button { margin: 0 0.5rem; padding: 0.5rem 1rem; }
  `]
})
export class DataTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() pageSize: number = 10;
  
  @Output() sortChange = new EventEmitter<SortEvent>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() rowSelect = new EventEmitter<any>();

  searchTerm = '';
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;
  currentPage = 1;
  
  filteredData: any[] = [];
  paginatedData: any[] = [];
  totalPages = 0;

  ngOnInit() {
    this.updateData();
  }

  onSort(column: TableColumn) {
    if (!column.sortable) return;
    
    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
    
    this.sortChange.emit({ column: column.key, direction: this.sortDirection });
    this.updateData();
  }

  onFilter() {
    this.filterChange.emit(this.searchTerm);
    this.currentPage = 1;
    this.updateData();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateData();
    }
  }

  trackByFn(index: number, item: any) {
    return item.id || index;
  }

  private updateData() {
    // Filter data
    this.filteredData = this.data.filter(item => {
      if (!this.searchTerm) return true;
      return Object.values(item).some(value => 
        String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });

    // Sort data
    if (this.sortColumn && this.sortDirection) {
      this.filteredData.sort((a, b) => {
        const aVal = a[this.sortColumn!];
        const bVal = b[this.sortColumn!];
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    // Paginate data
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }
}