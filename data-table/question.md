# Angular Coding Question: Data Table Component

## Problem Statement
Create a reusable Angular component called `data-table` that displays tabular data with sorting, filtering, and pagination capabilities.

### Requirements
- Accept an array of data objects and column configuration
- Support column sorting (ascending/descending) with visual indicators
- Implement client-side filtering with a search input
- Add pagination with configurable page size
- Support custom cell templates for specific columns
- Emit events for sort changes, filter changes, and row selection
- Use OnPush change detection strategy for performance

### Bonus
- Support server-side pagination and sorting
- Add row selection (single/multiple) with checkboxes
- Implement column resizing and reordering
- Add export functionality (CSV/JSON)

---

**Example Usage:**
```typescript
columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true, filterable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', template: 'statusTemplate' },
  { key: 'actions', label: 'Actions', template: 'actionsTemplate' }
];

data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' }
];
```

```html
<app-data-table 
  [data]="data" 
  [columns]="columns"
  [pageSize]="10"
  (sortChange)="onSort($event)"
  (filterChange)="onFilter($event)"
  (rowSelect)="onRowSelect($event)">
  
  <ng-template #statusTemplate let-row>
    <span [class]="'status-' + row.status">{{ row.status }}</span>
  </ng-template>
  
  <ng-template #actionsTemplate let-row>
    <button (click)="edit(row)">Edit</button>
    <button (click)="delete(row)">Delete</button>
  </ng-template>
</app-data-table>
```

---

**Write unit tests to verify:**
- Data renders correctly in table format
- Sorting works for sortable columns
- Filtering reduces displayed data
- Pagination shows correct page data
- Custom templates render properly
- Events are emitted correctly
- OnPush change detection works

**Key concepts tested:**
- Component inputs/outputs and data flow
- OnPush change detection strategy
- Custom templates with ng-template
- Pipes for filtering and sorting
- Pagination logic
- Event handling
- Performance optimization
- TypeScript interfaces and generics