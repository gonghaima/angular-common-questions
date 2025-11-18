import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, delay } from 'rxjs';
import { AutoCompleteComponent, AutoCompleteItem } from './auto-complete.component';
import { By } from '@angular/platform-browser';

describe('AutoCompleteComponent', () => {
  let component: AutoCompleteComponent;
  let fixture: ComponentFixture<AutoCompleteComponent>;
  let mockSearchFn: jest.Mock;

  const mockSuggestions: AutoCompleteItem[] = [
    { id: 1, label: 'John Doe' },
    { id: 2, label: 'Jane Smith' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoCompleteComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteComponent);
    component = fixture.componentInstance;
    
    mockSearchFn = jest.fn().mockReturnValue(of(mockSuggestions));
    component.searchFn = mockSearchFn;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should debounce input and call searchFn', fakeAsync(() => {
    component.searchControl.setValue('jo');
    tick(299);
    expect(mockSearchFn).not.toHaveBeenCalled();
    
    tick(1);
    expect(mockSearchFn).toHaveBeenCalledWith('jo');
  }));

  it('should display suggestions', fakeAsync(() => {
    component.searchControl.setValue('john');
    tick(300);
    fixture.detectChanges();
    
    const suggestions = fixture.nativeElement.querySelectorAll('.suggestion-item');
    expect(suggestions.length).toBe(2);
    expect(suggestions[0].textContent.trim()).toBe('John Doe');
  }));

  it('should emit selection on item click', () => {
    const emitSpy = jest.spyOn(component.selectionChange, 'emit');
    component.selectItem(mockSuggestions[0]);
    
    expect(emitSpy).toHaveBeenCalledWith(mockSuggestions[0]);
    expect(component.searchControl.value).toBe('John Doe');
  });

  it('should navigate with arrow keys', () => {
    component.suggestions = mockSuggestions;
    component.showDropdown = true;
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    component.onKeyDown(event);
    expect(component.highlightedIndex).toBe(0);
    
    component.onKeyDown(event);
    expect(component.highlightedIndex).toBe(1);
  });

  it('should select highlighted item on Enter', () => {
    const emitSpy = jest.spyOn(component.selectionChange, 'emit');
    component.suggestions = mockSuggestions;
    component.highlightedIndex = 0;
    
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeyDown(event);
    
    expect(emitSpy).toHaveBeenCalledWith(mockSuggestions[0]);
  });

  it('should show loading state', fakeAsync(() => {
    mockSearchFn.mockReturnValue(of(mockSuggestions).pipe(delay(100)));
    
    component.searchControl.setValue('test');
    tick(300);
    
    expect(component.loading).toBe(true);
    tick(100);
    expect(component.loading).toBe(false);
  }));

  it('should use default template when no custom template provided', fakeAsync(() => {
    component.searchControl.setValue('john');
    tick(300);
    fixture.detectChanges();
    
    const suggestions = fixture.nativeElement.querySelectorAll('.suggestion-item');
    expect(suggestions[0].textContent.trim()).toBe('John Doe');
  }));
});