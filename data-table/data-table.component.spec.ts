import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DataTableComponent, TableColumn } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  const mockData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active' }
  ];

  const mockColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true, filterable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    component.data = mockData;
    component.columns = mockColumns;
    component.pageSize = 2;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table with correct data', () => {
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2); // pageSize = 2
  });

  it('should filter data based on search term', () => {
    component.searchTerm = 'John';
    component.onFilter();
    expect(component.filteredData.length).toBe(2); // John Doe and Bob Johnson
  });

  it('should sort data when clicking sortable column', () => {
    spyOn(component.sortChange, 'emit');
    component.onSort(mockColumns[1]); // name column
    
    expect(component.sortColumn).toBe('name');
    expect(component.sortDirection).toBe('asc');
    expect(component.sortChange.emit).toHaveBeenCalledWith({
      column: 'name',
      direction: 'asc'
    });
  });

  it('should toggle sort direction on repeated clicks', () => {
    component.onSort(mockColumns[0]); // first click - asc
    expect(component.sortDirection).toBe('asc');
    
    component.onSort(mockColumns[0]); // second click - desc
    expect(component.sortDirection).toBe('desc');
  });

  it('should not sort non-sortable columns', () => {
    const initialSortColumn = component.sortColumn;
    component.onSort(mockColumns[3]); // status column (not sortable)
    expect(component.sortColumn).toBe(initialSortColumn);
  });

  it('should emit filter change event', () => {
    spyOn(component.filterChange, 'emit');
    component.searchTerm = 'test';
    component.onFilter();
    expect(component.filterChange.emit).toHaveBeenCalledWith('test');
  });

  it('should handle pagination correctly', () => {
    fixture.detectChanges();
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(2); // 3 items, pageSize 2
    
    component.goToPage(2);
    expect(component.currentPage).toBe(2);
    expect(component.paginatedData.length).toBe(1); // last page has 1 item
  });

  it('should not navigate to invalid pages', () => {
    component.goToPage(0);
    expect(component.currentPage).toBe(1);
    
    component.goToPage(10);
    expect(component.currentPage).toBe(1);
  });

  it('should reset to page 1 when filtering', () => {
    component.currentPage = 2;
    component.searchTerm = 'John';
    component.onFilter();
    expect(component.currentPage).toBe(1);
  });

  it('should use trackBy function for performance', () => {
    const result = component.trackByFn(0, mockData[0]);
    expect(result).toBe(1); // should return id
  });
});