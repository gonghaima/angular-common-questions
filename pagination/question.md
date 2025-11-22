# Pagination Component

Create a reusable Angular component called `pagination` that displays pagination controls for navigating through pages of data.

## Requirements

- Accept the following inputs:
  - `totalItems`: number (total number of items)
  - `itemsPerPage`: number (number of items per page)
  - `currentPage`: number (current active page)
- Emit an event (`pageChange`) when the user selects a different page.
- Display page numbers, "Previous" and "Next" buttons.
- Disable "Previous" on the first page and "Next" on the last page.
- Show a reasonable number of page links (e.g., 5 at a time) and use ellipsis (`...`) if there are many pages.

## Example Usage

```html
<pagination
  [totalItems]="100"
  [itemsPerPage]="10"
  [currentPage]="1"
  (pageChange)="onPageChange($event)"
>
</pagination>
```

## Bonus

- Allow customization of the maximum number of visible page links.
- Add accessibility features (ARIA labels, keyboard navigation).
