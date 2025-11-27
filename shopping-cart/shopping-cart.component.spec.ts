import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartComponent, CartItem } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty cart message when no items', () => {
    component.items = [];
    fixture.detectChanges();
    
    const emptyMessage = fixture.nativeElement.querySelector('.empty-cart');
    expect(emptyMessage.textContent).toContain('Your cart is empty');
  });

  it('should display cart items correctly', () => {
    const mockItems: CartItem[] = [
      { id: 1, name: 'Laptop', price: 999.99, quantity: 1 }
    ];
    component.items = mockItems;
    fixture.detectChanges();

    const itemName = fixture.nativeElement.querySelector('.item-name');
    expect(itemName.textContent).toContain('Laptop');
  });

  it('should increase quantity when + button clicked', () => {
    const mockItems: CartItem[] = [
      { id: 1, name: 'Laptop', price: 999.99, quantity: 1 }
    ];
    component.items = mockItems;
    fixture.detectChanges();

    // Ensure EventEmitter is initialized before spying
    if (!component.cartChange) {
      component.cartChange = new (require('@angular/core').EventEmitter)();
    }
    jest.spyOn(component.cartChange, 'emit');
    
    const increaseBtn = fixture.nativeElement.querySelectorAll('.quantity-controls button')[1];
    increaseBtn.click();

    expect(component.items[0].quantity).toBe(2);
    expect(component.cartChange.emit).toHaveBeenCalledWith(mockItems);
  });

  it('should decrease quantity when - button clicked', () => {
    const mockItems: CartItem[] = [
      { id: 1, name: 'Laptop', price: 999.99, quantity: 2 }
    ];
    component.items = mockItems;
    fixture.detectChanges();

    if (!component.cartChange) {
      component.cartChange = new (require('@angular/core').EventEmitter)();
    }
    jest.spyOn(component.cartChange, 'emit');
    
    const decreaseBtn = fixture.nativeElement.querySelector('.quantity-controls button');
    decreaseBtn.click();

    expect(component.items[0].quantity).toBe(1);
    expect(component.cartChange.emit).toHaveBeenCalledWith(mockItems);
  });

  it('should not decrease quantity below 1', () => {
    const mockItems: CartItem[] = [
      { id: 1, name: 'Laptop', price: 999.99, quantity: 1 }
    ];
    component.items = mockItems;
    fixture.detectChanges();

    const decreaseBtn = fixture.nativeElement.querySelector('.quantity-controls button');
    expect(decreaseBtn.disabled).toBe(true);
  });

  it('should remove item when remove button clicked', () => {
    const mockItems: CartItem[] = [
      { id: 1, name: 'Laptop', price: 999.99, quantity: 1 },
      { id: 2, name: 'Mouse', price: 29.99, quantity: 1 }
    ];
    component.items = mockItems;
    fixture.detectChanges();

    if (!component.itemRemoved) {
      component.itemRemoved = new (require('@angular/core').EventEmitter)();
    }
    if (!component.cartChange) {
      component.cartChange = new (require('@angular/core').EventEmitter)();
    }
    jest.spyOn(component.itemRemoved, 'emit');
    jest.spyOn(component.cartChange, 'emit');
    
    const removeBtn = fixture.nativeElement.querySelector('.remove-btn');
    removeBtn.click();

    expect(component.items.length).toBe(1);
    expect(component.itemRemoved.emit).toHaveBeenCalledWith(mockItems[0]);
    expect(component.cartChange.emit).toHaveBeenCalled();
  });

  it('should calculate total items correctly', () => {
    const mockItems: CartItem[] = [
      { id: 1, name: 'Laptop', price: 999.99, quantity: 2 },
      { id: 2, name: 'Mouse', price: 29.99, quantity: 3 }
    ];
    component.items = mockItems;

    expect(component.totalItems).toBe(5);
  });

  it('should calculate total price correctly', () => {
    const mockItems: CartItem[] = [
      { id: 1, name: 'Laptop', price: 100, quantity: 2 },
      { id: 2, name: 'Mouse', price: 50, quantity: 1 }
    ];
    component.items = mockItems;

    expect(component.totalPrice).toBe('250.00');
  });

  it('should calculate subtotal correctly', () => {
    const item: CartItem = { id: 1, name: 'Laptop', price: 100, quantity: 2 };
    
    expect(component.getSubtotal(item)).toBe('200.00');
  });

  it('should save to localStorage when quantity changes', () => {
    const mockItems: CartItem[] = [
      { id: 1, name: 'Laptop', price: 999.99, quantity: 1 }
    ];
    component.items = mockItems;
    
    jest.spyOn(window.localStorage.__proto__, 'setItem');
    component.increaseQuantity(mockItems[0]);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(mockItems));
  });

  it('should load from localStorage on init', () => {
    const mockItems: CartItem[] = [
      { id: 1, name: 'Laptop', price: 999.99, quantity: 1 }
    ];
    
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify(mockItems));
    
    component.ngOnInit();
    
    expect(component.items).toEqual(mockItems);
  });
});