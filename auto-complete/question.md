# Angular Coding Question: Auto-Complete Component

## Problem Statement
Create a reusable Angular component called `auto-complete` that provides an input field with dropdown suggestions based on user input.

### Requirements
- The component should use Reactive Forms (`FormControl`).
- The component should accept a function that returns an Observable of suggestions based on the input value.
- Debounce user input by 300ms before making API calls.
- Display suggestions in a dropdown below the input.
- Allow users to select a suggestion by clicking or using keyboard navigation (arrow keys, Enter, Escape).
- Emit the selected value via an `@Output()` EventEmitter.
- Hide the dropdown when clicking outside or pressing Escape.
- Show a loading indicator while fetching suggestions.

### Bonus
- Support custom suggestion templates via `ng-template`.
- Highlight the matching text in suggestions.
- Handle empty states and error states.

---

**Example Usage:**
```html
<app-auto-complete 
  [searchFn]="searchUsers" 
  [placeholder]="'Search users...'"
  (selectionChange)="onUserSelected($event)">
</app-auto-complete>
```

---

**Write unit tests to verify:**
- Input debouncing works correctly.
- Suggestions are fetched and displayed.
- Keyboard navigation works (arrow keys, Enter, Escape).
- Selection emits the correct value.
- Dropdown closes on outside click.
- Loading state is shown during API calls.