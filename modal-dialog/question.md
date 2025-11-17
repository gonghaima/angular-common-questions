# Angular Coding Question: Modal Dialog Component

## Problem Statement
Create a reusable Angular modal dialog component that can display dynamic content and handle user interactions. The modal should support both template content and component injection, with proper backdrop handling and keyboard navigation.

### Requirements
- Create a `ModalDialogComponent` that can be opened programmatically via a service.
- The modal should support closing via backdrop click, ESC key, or close button.
- Implement a `ModalService` with `open()` and `close()` methods.
- The modal should accept configuration options (title, size, backdrop dismissal).
- Support both template content and dynamic component injection.
- Emit events for open, close, and backdrop click actions.
- Write unit tests for the component and service interactions.

---

**Bonus:**
- Add animation transitions for modal open/close.
- Support stacking multiple modals.
- Implement focus trapping within the modal.