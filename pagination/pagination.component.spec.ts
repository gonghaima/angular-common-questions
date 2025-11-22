import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';

@Component({
  template: `
    <pagination
      [totalItems]="totalItems"
      [itemsPerPage]="itemsPerPage"
      [currentPage]="currentPage"
      [maxVisiblePages]="maxVisiblePages"
      (pageChange)="onPageChange($event)"
    >
    </pagination>
  `,
  standalone: true,
  imports: [PaginationComponent],
})
class HostComponent {
  totalItems = 50;
  itemsPerPage = 10;
  currentPage = 1;
  maxVisiblePages = 5;
  onPageChange = jest.fn((page: number) => {
    this.currentPage = page;
  });
}

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const pagination = fixture.debugElement.query(
      By.directive(PaginationComponent)
    );
    expect(pagination).toBeTruthy();
  });

  it('should display correct number of page buttons', () => {
    host.maxVisiblePages = 5;
    fixture.detectChanges();
    const pageButtons = fixture.debugElement.queryAll(By.css('li button'));
    // 5 page buttons + Previous + Next
    expect(pageButtons.length).toBe(7);
  });

  it('should emit pageChange when a page is clicked', () => {
    host.currentPage = 2;
    fixture.detectChanges();
    const pageButtons = fixture.debugElement.queryAll(By.css('li button'));
    pageButtons[4].nativeElement.click(); // Click page 4
    fixture.detectChanges();
    expect(host.onPageChange).toHaveBeenCalledWith(4);
  });

  it('should disable Previous on first page', () => {
    host.currentPage = 1;
    fixture.detectChanges();
    const prevButton = fixture.debugElement.query(
      By.css('li button[aria-label="Previous page"]')
    );
    expect(prevButton.nativeElement.disabled).toBe(true);
  });

  it('should disable Next on last page', () => {
    host.currentPage = 5;
    fixture.detectChanges();
    const nextButton = fixture.debugElement.query(
      By.css('li button[aria-label="Next page"]')
    );
    expect(nextButton.nativeElement.disabled).toBe(true);
  });

  it('should show ellipsis when there are many pages', () => {
    host.totalItems = 200;
    host.itemsPerPage = 10;
    host.currentPage = 10;
    host.maxVisiblePages = 5;
    fixture.detectChanges();
    const ellipsis = fixture.debugElement.queryAll(By.css('span'));
    expect(ellipsis.length).toBeGreaterThan(0);
  });
});
