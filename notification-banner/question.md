# Angular Coding Question: Notification Banner Component

## Problem Statement
Create a reusable Angular component called `notification-banner` that displays a dismissible banner at the top of the page.

### Requirements
- The component should display a message and an optional type (success, error, info, warning).
- The banner should be dismissible by the user (close button).
- Support auto-dismiss after a configurable timeout (in ms).
- Emit an event when the banner is dismissed (either by user or timeout).
- Allow projecting custom content via `ng-content`.

### Bonus
- Support multiple banners (stacked display).
- Animate banner appearance/disappearance.

---

**Example Usage:**
```html
<app-notification-banner [type]="'success'" [timeout]="3000" (dismissed)="onDismiss()">
  <strong>Success!</strong> Your action was completed.
</app-notification-banner>
```

---

**Write unit tests to verify:**
- Banner displays with correct message and type.
- Dismiss button works.
- Auto-dismiss works after timeout.
- Event is emitted on dismiss.
- Custom content is projected.
