# Angular Coding Question: Accordion Component

## Problem Statement
Create a reusable Angular accordion component that displays collapsible sections. Each section should have a header and content area that can be expanded or collapsed.

### Requirements
- Create an `accordion` component that manages multiple accordion items.
- Create an `accordion-item` component for individual sections.
- Only one section should be open at a time (single-select mode).
- The component should emit events when sections are opened/closed.
- Support keyboard navigation (Enter/Space to toggle, Arrow keys to navigate).
- Add smooth expand/collapse animations.

### Bonus
- Add a `multiple` input to allow multiple sections open simultaneously.
- Support disabled accordion items.
- Add ARIA attributes for accessibility.

---

**Example Usage:**
```html
<app-accordion (selectionChange)="onSelectionChange($event)">
  <app-accordion-item title="Section 1" [expanded]="true">
    <p>Content for section 1</p>
  </app-accordion-item>
  <app-accordion-item title="Section 2">
    <p>Content for section 2</p>
  </app-accordion-item>
  <app-accordion-item title="Section 3" [disabled]="true">
    <p>Content for section 3</p>
  </app-accordion-item>
</app-accordion>
```

---

**Write unit tests to verify:**
- Only one section is open at a time in single-select mode.
- Events are emitted when sections toggle.
- Keyboard navigation works correctly.
- Disabled items cannot be toggled.
- Multiple mode allows multiple sections open.