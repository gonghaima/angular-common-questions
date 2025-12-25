# Angular Coding Question: Virtual Scrolling List Component

## Problem Statement
Create a reusable Angular component called `virtual-scrolling-list` that efficiently renders large lists by only displaying visible items in the viewport. This technique is essential for performance when dealing with thousands of items.

### Requirements
- The component should accept an array of items and an item height as inputs.
- Only render items that are currently visible in the scrollable viewport.
- Calculate which items to display based on scroll position and container height.
- Maintain proper scroll behavior and total scrollable height.
- The component should be performant with 10,000+ items.
- Support custom item templates via content projection.

### Bonus
- Support variable item heights.
- Add buffer zones (render a few extra items above/below viewport).
- Emit events when visible range changes.

---

**Example Usage:**
```html
<app-virtual-scrolling-list 
  [items]="largeDataSet" 
  [itemHeight]="50" 
  [containerHeight]="400"
  (visibleRangeChange)="onRangeChange($event)">
  <ng-template let-item let-index="index">
    <div class="list-item">{{ index }}: {{ item.name }}</div>
  </ng-template>
</app-virtual-scrolling-list>
```

---

**Write unit tests to verify:**
- Only visible items are rendered in DOM.
- Scroll position correctly updates visible items.
- Total scrollable height is maintained.
- Performance with large datasets.
- Custom templates work correctly.