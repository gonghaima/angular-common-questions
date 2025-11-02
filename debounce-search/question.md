# Angular Coding Question: Debounce Search Component

## Problem Statement
Create a reusable Angular component called `debounce-search` that provides an input box. The component should emit the search value only after the user stops typing for 400ms. Use Reactive Forms and RxJS operators. Demonstrate how to use this component in a parent component and handle the emitted search value.

### Requirements
- The component should use Reactive Forms (`FormControl`).
- The component should emit the search value via an `@Output()` EventEmitter only after 400ms of no typing (debounce).
- The component should be reusable and accept an optional placeholder input.
- Provide a sample usage in a parent component.
- Write unit tests to verify debounce and emission behavior.

---

**Bonus:**
- Add a clear button to reset the input and emit an empty value.
