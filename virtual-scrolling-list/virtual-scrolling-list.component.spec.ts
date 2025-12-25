import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { VirtualScrollingListComponent, VirtualScrollItem } from './virtual-scrolling-list.component';

@Component({
  template: `
    <app-virtual-scrolling-list 
      [items]="items" 
      [itemHeight]="itemHeight"
      [containerHeight]="containerHeight"
      (visibleRangeChange)="onRangeChange($event)">
      <ng-template let-item let-index="index">
        <div class="test-item">{{ index }}: {{ item.name }}</div>
      </ng-template>
    </app-virtual-scrolling-list>
  `
})
class TestHostComponent {
  items: VirtualScrollItem[] = [];
  itemHeight = 50;
  containerHeight = 200;
  lastRange: any;

  onRangeChange(range: any) {
    this.lastRange = range;
  }
}

describe('VirtualScrollingListComponent', () => {
  let component: VirtualScrollingListComponent;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualScrollingListComponent],
      declarations: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render only visible items', () => {
    // Create 100 items
    hostComponent.items = Array.from({ length: 100 }, (_, i) => ({ 
      name: `Item ${i}`, 
      id: i 
    }));
    
    fixture.detectChanges();
    
    // Should only render items that fit in viewport + buffer
    const renderedItems = fixture.nativeElement.querySelectorAll('.test-item');
    expect(renderedItems.length).toBeLessThan(100);
    expect(renderedItems.length).toBeGreaterThan(0);
  });

  it('should update visible items on scroll', () => {
    hostComponent.items = Array.from({ length: 100 }, (_, i) => ({ 
      name: `Item ${i}`, 
      id: i 
    }));
    
    fixture.detectChanges();
    
    const initialCount = fixture.nativeElement.querySelectorAll('.test-item').length;
    
    // Simulate scroll
    const container = fixture.nativeElement.querySelector('.virtual-scroll-container');
    container.scrollTop = 500;
    container.dispatchEvent(new Event('scroll'));
    
    fixture.detectChanges();
    
    const newItems = fixture.nativeElement.querySelectorAll('.test-item');
    expect(newItems.length).toBeGreaterThan(0);
  });

  it('should emit visible range changes', () => {
    hostComponent.items = Array.from({ length: 50 }, (_, i) => ({ 
      name: `Item ${i}`, 
      id: i 
    }));
    
    fixture.detectChanges();
    
    expect(hostComponent.lastRange).toBeDefined();
    expect(hostComponent.lastRange.start).toBeGreaterThanOrEqual(0);
    expect(hostComponent.lastRange.end).toBeGreaterThanOrEqual(hostComponent.lastRange.start);
  });

  it('should maintain correct total height', () => {
    hostComponent.items = Array.from({ length: 100 }, (_, i) => ({ 
      name: `Item ${i}`, 
      id: i 
    }));
    
    fixture.detectChanges();
    
    const spacer = fixture.nativeElement.querySelector('.virtual-scroll-spacer');
    const expectedHeight = 100 * hostComponent.itemHeight;
    
    expect(spacer.style.height).toBe(`${expectedHeight}px`);
  });

  it('should handle empty items array', () => {
    hostComponent.items = [];
    
    fixture.detectChanges();
    
    const renderedItems = fixture.nativeElement.querySelectorAll('.test-item');
    expect(renderedItems.length).toBe(0);
  });

  it('should use trackBy function correctly', () => {
    const item = { data: { name: 'Test' }, index: 5 };
    const result = component.trackByFn(0, item);
    
    expect(result).toBe(5);
  });
});