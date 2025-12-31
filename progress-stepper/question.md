# Angular Coding Question: Progress Stepper Component

## Problem Statement
Create a reusable Angular component called `progress-stepper` that displays a multi-step progress indicator. The component should allow navigation between steps and track completion status.

### Requirements
- The component should accept an array of step objects with `label`, `completed`, and optional `disabled` properties.
- Display steps horizontally with connecting lines between them.
- Allow clicking on completed or current steps to navigate.
- Emit events when a step is clicked or when the current step changes.
- Support both linear (sequential) and non-linear navigation modes.
- Show visual indicators for current, completed, and disabled steps.

### Bonus
- Add step validation before allowing navigation to the next step.
- Support custom step content via `ng-content` or templates.
- Add animations for step transitions.

---

**Example Usage:**
```html
<app-progress-stepper 
  [steps]="steps" 
  [currentStep]="currentStepIndex"
  [linear]="true"
  (stepChange)="onStepChange($event)"
  (stepClick)="onStepClick($event)">
</app-progress-stepper>
```

**Step Interface:**
```typescript
interface Step {
  label: string;
  completed: boolean;
  disabled?: boolean;
}
```

---

**Write unit tests to verify:**
- Steps are displayed correctly with proper styling.
- Navigation works for clickable steps.
- Linear mode prevents skipping steps.
- Events are emitted correctly.
- Disabled steps cannot be clicked.