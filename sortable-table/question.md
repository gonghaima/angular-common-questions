# Angular Coding Question: Sortable Table Component

## Problem Statement
Create a reusable Angular component called `sortable-table` that displays a table with sortable columns.

### Requirements
- The component should accept an array of objects (`items`) and a column configuration (`columns`) as inputs.
- Display a table with headers and rows based on the configuration.
- When a user clicks a column header, sort the table by that column. Clicking again toggles ascending/descending order.
- Emit an event when the sort order changes, providing the column and direction.
- Support custom cell templates via `ng-template`.

### Bonus
- Allow multi-column sorting.
- Support custom sort functions per column.

---

**Example Usage:**
```html
<app-sortable-table [items]="data" [columns]="columns" (sortChange)="onSort($event)">
  <ng-template let-item let-col="col" let-rowIndex="rowIndex">
    <span *ngIf="col.key === 'name'">{{ item.name | uppercase }}</span>
    <span *ngIf="col.key === 'age'">{{ item.age }}</span>
  </ng-template>
</app-sortable-table>
```

---

**Write unit tests to verify:**
- Table renders with correct headers and rows.
- Sorting works and toggles direction.
- Event is emitted on sort change.
- Custom cell templates are rendered.
