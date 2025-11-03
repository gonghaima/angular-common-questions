import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InfiniteScrollListComponent } from './infinite-scroll-list.component';
import { of, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';

// Host component for custom template testing
@Component({
  template: `
    <app-infinite-scroll-list [fetchFn]="fetchFn" [itemTemplate]="tpl" (itemsLoaded)="onLoaded($event)"></app-infinite-scroll-list>
    <ng-template #tpl let-item>
      <div class="custom-item">{{item.name}}</div>
    </ng-template>
  `,
  standalone: true,
  imports: [InfiniteScrollListComponent]
})
class HostComponent {
  @ViewChild(InfiniteScrollListComponent) list!: InfiniteScrollListComponent;
  fetchFn = (page: number) => of([{ name: 'Item ' + page }]);
  onLoaded = jest.fn();
}

describe('InfiniteScrollListComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load and display items', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('.custom-item'));
    expect(items.length).toBe(1);
    expect(items[0].nativeElement.textContent).toContain('Item 1');
  }));

  it('should fetch more items on scroll', fakeAsync(() => {
    const fetchSpy = jest.spyOn(host, 'fetchFn');
    tick();
    fixture.detectChanges();
    fetchSpy.mockClear();
    const scrollEl = host.list.scrollContainer.nativeElement;
    scrollEl.scrollTop = scrollEl.scrollHeight;
    scrollEl.dispatchEvent(new Event('scroll'));
    tick();
    fixture.detectChanges();
    expect(fetchSpy).toHaveBeenCalledWith(2, 20);
  }));

  it('should emit itemsLoaded event', fakeAsync(() => {
    host.list.loadItems();
    tick();
    fixture.detectChanges();
    expect(host.onLoaded).toHaveBeenCalledWith([{ name: 'Item 1' }]);
  }));

  it('should show loading indicator', fakeAsync(() => {
    const subject = new Subject<any[]>();
    host.fetchFn = () => subject.asObservable();
    fixture.detectChanges();
    host.list.loadItems();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.loading'))).toBeTruthy();
    subject.next([]);
    subject.complete();
    tick();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.loading'))).toBeFalsy();
  }));
});
