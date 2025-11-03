# Angular Coding Question: Infinite Scroll List Component

## Problem Statement
Create a reusable Angular component called `infinite-scroll-list` that displays a list of items and automatically loads more items when the user scrolls to the bottom of the list.

### Requirements
- The component should accept an input for a data-fetching function (returns an Observable of items, e.g. `(page: number) => Observable<Item[]>`).
- The component should display the loaded items in a scrollable container.
- When the user scrolls to the bottom, the component should fetch and append the next page of items.
- The component should emit an event when new items are loaded.
- Show a loading indicator while fetching data and prevent duplicate fetches.
- Handle the case when there are no more items to load.

### Bonus
- Allow customizing the item template via `ng-content` or `ng-template`.
- Support an optional input for page size.

---

**Example Usage:**
```html
<app-infinite-scroll-list [fetchFn]="fetchItems" (itemsLoaded)="onItemsLoaded($event)">
  <ng-template let-item>
    <div>{{ item.name }}</div>
  </ng-template>
</app-infinite-scroll-list>
```

---

**Write unit tests to verify:**
- Items are loaded and displayed.
- More items are fetched on scroll.
- Loading state is handled correctly.
- No duplicate fetches occur.
- Event is emitted when items are loaded.
