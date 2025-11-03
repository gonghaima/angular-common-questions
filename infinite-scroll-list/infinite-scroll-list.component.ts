import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-infinite-scroll-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #scrollContainer class="scroll-container" (scroll)="onScroll()">
      <ng-container *ngFor="let item of items">
        <ng-container *ngTemplateOutlet="itemTemplate ? itemTemplate : defaultTemplate; context: {$implicit: item}"></ng-container>
      </ng-container>
      <div *ngIf="loading" class="loading">Loading...</div>
      <div *ngIf="noMore" class="no-more">No more items</div>
    </div>
    <ng-template #defaultTemplate let-item>
      <div class="item">{{ item | json }}</div>
    </ng-template>
    <ng-template #itemTpl let-item></ng-template>
  `,
  styles: [`
    .scroll-container { height: 300px; overflow-y: auto; border: 1px solid #ccc; }
    .item { padding: 8px; border-bottom: 1px solid #eee; }
    .loading, .no-more { text-align: center; padding: 8px; color: #888; }
  `]
})
export class InfiniteScrollListComponent implements OnInit, OnDestroy {
  @Input() fetchFn!: (page: number, pageSize?: number) => Observable<any[]>;
  @Input() pageSize = 20;
  @Input() itemTemplate?: TemplateRef<any>;
  @Output() itemsLoaded = new EventEmitter<any[]>();
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  items: any[] = [];
  page = 1;
  loading = false;
  noMore = false;
  private sub = new Subscription();

  ngOnInit() {
    this.loadItems();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onScroll() {
    const el = this.scrollContainer.nativeElement;
    if (!this.loading && !this.noMore && el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      this.loadItems();
    }
  }

  public loadItems() {
    this.loading = true;
    const fetch$ = this.fetchFn(this.page, this.pageSize).subscribe(data => {
      if (!data || data.length === 0) {
        this.noMore = true;
      } else {
        this.items = [...this.items, ...data];
        this.itemsLoaded.emit(data);
        this.page++;
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    });
    this.sub.add(fetch$);
  }
}
