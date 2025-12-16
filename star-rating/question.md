# Star Rating Component

Create a reusable Angular Star Rating component that allows users to visually select and display a rating.

## Requirements:

1.  **Input Properties**:
    *   `initialRating`: A number representing the default selected rating.
    *   `maxRating`: A number representing the maximum number of stars (e.g., 5).
2.  **Output Events**:
    *   `ratingChange`: An `EventEmitter` that emits the new rating when a user selects it.
3.  **Visual Representation**:
    *   Display a series of stars (e.g., using Unicode character `&#9733;` or an icon font).
    *   Stars should be filled to represent the `currentRating`.
    *   Unfilled stars should have a distinct appearance.
4.  **Interactivity**:
    *   Users should be able to click on a star to select a rating.
    *   On hover, stars up to the hovered star should visually indicate selection (e.g., change color).
    *   When the mouse leaves the component, the stars should revert to displaying the `currentRating`.
5.  **Styling**:
    *   Provide basic CSS to style the stars (e.g., size, color for filled/unfilled states, hover effect).

## Example Usage:

```html
<app-star-rating [initialRating]="3" [maxRating]="5" (ratingChange)="onRatingChange($event)"></app-star-rating>
```

```typescript
// In parent component
onRatingChange(rating: number) {
  console.log('New rating:', rating);
}
```
