# Angular Coding Question: File Upload Component

## Problem Statement
Create a reusable Angular component called `file-upload` that allows users to select and upload files.

### Requirements
- The component should allow users to select one or multiple files using an input or drag-and-drop.
- Display a list of selected files with their names and sizes.
- Emit an event with the selected files when the selection changes.
- Show a visual indicator when files are dragged over the drop area.
- Validate file type and size, and display error messages for invalid files.
- Support custom validation rules via input.

### Bonus
- Allow removing files from the selection.
- Show upload progress (simulate with a timer).

---

**Example Usage:**
```html
<app-file-upload [accept]="'image/*'" [maxSize]="2 * 1024 * 1024" (filesChange)="onFiles($event)"></app-file-upload>
```

---

**Write unit tests to verify:**
- File selection via input and drag-and-drop.
- List of files is displayed.
- Invalid files show error messages.
- Event is emitted on selection change.
- Visual indicator appears on drag-over.
