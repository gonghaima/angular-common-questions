import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-shopping-cart',
  template: `
    <div class="shopping-cart">
      <h3>Shopping Cart ({{ totalItems }} items)</h3>
      
      <div *ngIf="items.length === 0" class="empty-cart">
        Your cart is empty
      </div>
      
      <div *ngFor="let item of items" class="cart-item">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-price">\${{ item.price }}</span>
        
        <div class="quantity-controls">
          <button (click)="decreaseQuantity(item)" [disabled]="item.quantity <= 1">-</button>
          <span class="quantity">{{ item.quantity }}</span>
          <button (click)="increaseQuantity(item)">+</button>
        </div>
        
        <span class="subtotal">\${{ getSubtotal(item) }}</span>
        <button (click)="removeItem(item)" class="remove-btn">Remove</button>
      </div>
      
      <div *ngIf="items.length > 0" class="cart-total">
        <strong>Total: \${{ totalPrice }}</strong>
      </div>
    </div>
  `,
  styles: [`
    .shopping-cart { padding: 20px; border: 1px solid #ddd; }
    .cart-item { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #eee; }
    .quantity-controls { display: flex; align-items: center; gap: 5px; }
    .quantity-controls button { width: 30px; height: 30px; }
    .remove-btn { background: #ff4444; color: white; border: none; padding: 5px 10px; }
    .cart-total { margin-top: 15px; text-align: right; }
    .empty-cart { text-align: center; color: #666; padding: 20px; }
  `]
})
export class ShoppingCartComponent implements OnInit {
  @Input() items: CartItem[] = [];
  @Output() cartChange = new EventEmitter<CartItem[]>();
  @Output() itemRemoved = new EventEmitter<CartItem>();

  ngOnInit() {
    this.loadFromStorage();
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.saveToStorage();
    this.cartChange.emit(this.items);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveToStorage();
      this.cartChange.emit(this.items);
    }
  }

  removeItem(item: CartItem) {
    this.items = this.items.filter(i => i.id !== item.id);
    this.saveToStorage();
    this.itemRemoved.emit(item);
    this.cartChange.emit(this.items);
  }

  getSubtotal(item: CartItem): string {
    return (item.price * item.quantity).toFixed(2);
  }

  get totalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): string {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  }

  private saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  private loadFromStorage() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }
}