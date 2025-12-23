# Multi-Step Form Component

Create a reusable Angular component that implements a multi-step (wizard) form. The component should:

- Display multiple steps, each with its own form fields.
- Allow navigation between steps (Next, Previous buttons).
- Validate each step before allowing the user to proceed.
- Emit the final form data when all steps are completed.
- Support dynamic step content via Angular templates or inputs.

**Requirements:**
- Use Angular Reactive Forms.
- The component should be reusable for different sets of steps and fields.
- Show a summary or confirmation step before submission.

**Bonus:**
- Allow users to jump to any completed step.
- Animate transitions between steps.

---

Example usage:
```html
<multi-step-form [steps]="stepsConfig" (submit)="onSubmit($event)"></multi-step-form>
```

Where `stepsConfig` is an array describing each step's fields and validation.
