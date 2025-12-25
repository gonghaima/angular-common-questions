import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface VirtualScrollItem {
  [key: string]: any;
}

export interface VisibleRange {
  start: number;
  end: number;
}

@Component({
  selector: 'app-virtual-scrolling-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="virtual-scroll-container" 
         #container
         [style.height.px]="containerHeight"
         (scroll)="onScroll($event)">
      
      <div class="virtual-scroll-spacer" 
           [style.height.px]="totalHeight">
        
        <div class="virtual-scroll-content" 
             [style.transform]="'translateY(' + offsetY + 'px)'">
          
          <div *ngFor="let item of visibleItems; let i = index; trackBy: trackByFn"
               class="virtual-scroll-item"
               [style.height.px]="itemHeight">
            <ng-container *ngTemplateOutlet="itemTemplate; context: { 
              $implicit: item.data, 
              index: item.index 
            }"></ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .virtual-scroll-container {
      overflow-y: auto;
      position: relative;
    }
    
    .virtual-scroll-spacer {
      position: relative;
    }
    
    .virtual-scroll-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
    
    .virtual-scroll-item {
      overflow: hidden;
    }
  `]
})
export class VirtualScrollingListComponent implements OnInit, OnDestroy {
  @Input() items: VirtualScrollItem[] = [];
  @Input() itemHeight: number = 50;
  @Input() containerHeight: number = 400;
  @Input() bufferSize: number = 5;
  
  @Output() visibleRangeChange = new EventEmitter<VisibleRange>();
  
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;
  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;
  
  visibleItems: { data: VirtualScrollItem; index: number }[] = [];
  totalHeight = 0;
  offsetY = 0;
  
  private currentRange: VisibleRange = { start: 0, end: 0 };

  ngOnInit() {
    this.calculateDimensions();
    this.updateVisibleItems();
  }

  ngOnDestroy() {}

  onScroll(event: Event) {
    this.updateVisibleItems();
  }

  private calculateDimensions() {
    this.totalHeight = this.items.length * this.itemHeight;
  }

  private updateVisibleItems() {
    const scrollTop = this.container.nativeElement.scrollTop;
    const viewportHeight = this.containerHeight;
    
    const startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.bufferSize);
    const endIndex = Math.min(
      this.items.length - 1,
      Math.ceil((scrollTop + viewportHeight) / this.itemHeight) + this.bufferSize
    );
    
    this.offsetY = startIndex * this.itemHeight;
    
    this.visibleItems = [];
    for (let i = startIndex; i <= endIndex; i++) {
      if (this.items[i]) {
        this.visibleItems.push({
          data: this.items[i],
          index: i
        });
      }
    }
    
    const newRange = { start: startIndex, end: endIndex };
    if (newRange.start !== this.currentRange.start || newRange.end !== this.currentRange.end) {
      this.currentRange = newRange;
      this.visibleRangeChange.emit(newRange);
    }
  }

  trackByFn(index: number, item: { data: VirtualScrollItem; index: number }) {
    return item.index;
  }
}