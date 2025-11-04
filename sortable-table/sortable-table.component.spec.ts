import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortableTableComponent, SortColumn } from './sortable-table.component';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-sortable-table [items]="data" [columns]="columns" [cellTemplate]="tpl" (sortChange)="onSort($event)"></app-sortable-table>
    <ng-template #tpl let-item let-col="col">
      <span class="custom-cell">{{ item[col.key] }}!</span>
    </ng-template>
  `,
  standalone: true,
  imports: [SortableTableComponent]
})
class HostComponent {
  @ViewChild(SortableTableComponent) table!: SortableTableComponent;
  data = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Carol', age: 35 }
  ];
  columns: SortColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' }
  ];
  onSort = jest.fn();
}

describe('SortableTableComponent', () => {
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

  it('should render headers and rows', () => {
    const headers = fixture.debugElement.queryAll(By.css('th'));
    expect(headers.length).toBe(2);
    expect(headers[0].nativeElement.textContent).toContain('Name');
    expect(headers[1].nativeElement.textContent).toContain('Age');
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(3);
  });

  it('should sort by column and toggle direction', () => {
    const nameHeader = fixture.debugElement.queryAll(By.css('th'))[0].nativeElement;
    nameHeader.click();
    fixture.detectChanges();
    expect(host.table.sortKey).toBe('name');
    expect(host.table.sortDir).toBe('asc');
    nameHeader.click();
    fixture.detectChanges();
    expect(host.table.sortDir).toBe('desc');
  });

  it('should emit sortChange event', () => {
    const ageHeader = fixture.debugElement.queryAll(By.css('th'))[1].nativeElement;
    ageHeader.click();
    fixture.detectChanges();
    expect(host.onSort).toHaveBeenCalledWith({ key: 'age', dir: 'asc' });
  });

  it('should render custom cell templates', () => {
    const customCells = fixture.debugElement.queryAll(By.css('.custom-cell'));
    expect(customCells.length).toBe(6); // 3 rows x 2 columns
    expect(customCells[0].nativeElement.textContent).toContain('Alice!');
  });
});
