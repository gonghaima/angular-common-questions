# Tabs Component

Your task is to create a reusable "Tabs" component in Angular.

## Requirements:

1.  **Tabs Container (`<app-tabs>`):**
    *   This component will act as a container for individual tabs.
    *   It should display a list of tab headers.
    *   When a tab header is clicked, the corresponding tab's content should be displayed.
    *   Only one tab's content should be visible at a time.
    *   The first tab should be active by default.

2.  **Tab Panel (`<app-tab>`):**
    *   This component will represent a single tab with its content.
    *   It should have an `@Input()` property for the `title` of the tab, which will be displayed in the tab header.
    *   The content of the `<app-tab>` element will be the content of the tab panel.

## Example Usage:

```html
<app-tabs>
  <app-tab title="Tab 1">
    <p>Content for Tab 1</p>
  </app-tab>
  <app-tab title="Tab 2">
    <p>Content for Tab 2</p>
    <p>Some more content...</p>
  </app-tab>
  <app-tab title="Tab 3">
    <h1>Content for Tab 3</h1>
  </app-tab>
</app-tabs>
```

## Implementation Hints:

*   You will likely need to use `@ContentChildren` in your `TabsComponent` to get a reference to all the `TabComponent` instances.
*   Manage the active tab state within the `TabsComponent`.
*   Use `ng-content` to project the content of the `TabComponent`.

Good luck!
