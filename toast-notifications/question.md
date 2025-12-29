
# Toast Notifications

## Description

Implement a toast notification system in Angular.

### Requirements:

- **Toast Service**:
  - Create a `ToastService` that can be injected into any component.
  - The service should have methods to add and remove toast messages.
  - It should manage a list of active toasts.

- **Toast Component**:
  - Create a `ToastComponent` to display the toast messages.
  - The component should subscribe to the `ToastService` to get the list of toasts.
  - It should display toasts with different types (e.g., success, error, info, warning).
  - Each toast should be dismissible, either by a close button or after a timeout.

- **Integration**:
  - Show how to use the `ToastService` from another component to trigger toast notifications.
  - Toasts should appear in a corner of the screen (e.g., top-right).
- **(Optional) Advanced Features**:
  - Animate the entrance and exit of toast messages.
  - Allow for custom content in toasts.
  - Add a progress bar to indicate the remaining time before a toast auto-dismisses.

