# Angular Coding Question: Drag & Drop Kanban Board

## Problem Statement
Create a kanban board component with draggable cards between columns using Angular CDK. The component should allow users to manage tasks across different workflow stages with drag-and-drop functionality.

### Requirements
- Create 3 columns: "To Do", "In Progress", "Done"
- Cards can be dragged between columns using Angular CDK Drag & Drop
- Each card displays title and priority (High/Medium/Low with color coding)
- Add new cards with a reactive form (title and priority fields)
- Persist board state in localStorage
- Use OnPush change detection strategy for performance
- Cards should be reorderable within the same column

### Technical Requirements
- Use Angular CDK `@angular/cdk/drag-drop`
- Implement `CdkDropList` and `CdkDrag` directives
- Use Reactive Forms for the add card form
- Implement proper TypeScript interfaces for data models
- Handle drag events: `cdkDropListDropped`

---

**Bonus:**
- Add delete card functionality with confirmation
- Filter cards by priority level
- Add smooth animations for drag operations
- Export/import board data as JSON