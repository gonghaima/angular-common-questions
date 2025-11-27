# Angular Coding Question: Shopping Cart Component

## Problem Statement
Create a reusable Angular component called `shopping-cart` that manages a shopping cart with add, remove, and quantity update functionality.

### Requirements
- Display cart items with product name, price, quantity, and subtotal
- Allow increasing/decreasing item quantities with + and - buttons
- Allow removing items from the cart
- Show total price and item count
- Persist cart data in localStorage
- Emit events when cart changes (add, remove, update)
- Handle empty cart state with appropriate message

### Bonus
- Add discount/coupon code functionality
- Implement quantity validation (min: 1, max: 99)
- Add animation for item removal
- Support different currencies

---

**Example Usage:**
```typescript
cartItems = [
  { id: 1, name: 'Laptop', price: 999.99, quantity: 1 },
  { id: 2, name: 'Mouse', price: 29.99, quantity: 2 }
];
```

```html
<app-shopping-cart 
  [items]="cartItems"
  (cartChange)="onCartChange($event)"
  (itemRemoved)="onItemRemoved($event)">
</app-shopping-cart>
```

---

**Write unit tests to verify:**
- Cart displays items correctly
- Quantity updates work properly
- Item removal functions
- Total calculation is accurate
- localStorage persistence works
- Events are emitted correctly
- Empty cart state displays

**Key concepts tested:**
- Component state management
- Event handling and data flow
- Local storage integration
- Template data binding
- Array manipulation methods
- TypeScript interfaces
- Component lifecycle hooks