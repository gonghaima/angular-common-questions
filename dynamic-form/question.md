# Angular Coding Question: Dynamic Form Builder

## Problem Statement
Create a reusable Angular component called `dynamic-form` that can render forms dynamically based on a configuration object.

### Requirements
- Accept a form configuration array that defines field types, labels, validation rules
- Support field types: text, email, number, select, checkbox, textarea
- Implement reactive forms with validation
- Display validation errors below each field
- Emit form value changes and submit events
- Support conditional field visibility based on other field values

### Bonus
- Add custom field types via component registry
- Support nested field groups
- Implement field dependencies (one field's options depend on another)

---

**Example Usage:**
```typescript
formConfig = [
  { key: 'name', type: 'text', label: 'Full Name', required: true },
  { key: 'email', type: 'email', label: 'Email', required: true },
  { key: 'age', type: 'number', label: 'Age', min: 18, max: 100 },
  { key: 'country', type: 'select', label: 'Country', options: ['US', 'UK', 'CA'] },
  { key: 'newsletter', type: 'checkbox', label: 'Subscribe to newsletter' }
];
```

```html
<app-dynamic-form 
  [config]="formConfig" 
  (formSubmit)="onSubmit($event)"
  (valueChanges)="onValueChange($event)">
</app-dynamic-form>
```

---

**Write unit tests to verify:**
- Form renders correctly based on configuration
- Validation works for required fields and field types
- Form submission emits correct data
- Value changes are emitted properly
- Conditional field visibility works
- Error messages display correctly

**Key concepts tested:**
- Reactive forms and FormBuilder
- Dynamic component rendering
- Custom validation
- Event handling and data flow
- TypeScript interfaces and generics
- Component composition patterns