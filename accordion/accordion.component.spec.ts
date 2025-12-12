import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AccordionComponent } from './accordion.component';
import { AccordionItemComponent } from './accordion-item.component';

@Component({
  template: `
    <app-accordion [multiple]="multiple" (selectionChange)="onSelectionChange($event)">
      <app-accordion-item title="Item 1" [expanded]="true">Content 1</app-accordion-item>
      <app-accordion-item title="Item 2">Content 2</app-accordion-item>
      <app-accordion-item title="Item 3" [disabled]="true">Content 3</app-accordion-item>
    </app-accordion>
  `
})
class TestHostComponent {
  multiple = false;
  selectedItems: string[] = [];
  
  onSelectionChange(items: string[]) {
    this.selectedItems = items;
  }
}

describe('AccordionComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccordionComponent, AccordionItemComponent, TestHostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only allow one item open in single-select mode', () => {
    const headers = fixture.debugElement.nativeElement.querySelectorAll('.accordion-header');
    
    headers[1].click();
    fixture.detectChanges();
    
    expect(component.selectedItems.length).toBe(1);
  });

  it('should allow multiple items open in multiple mode', () => {
    component.multiple = true;
    fixture.detectChanges();
    
    const headers = fixture.debugElement.nativeElement.querySelectorAll('.accordion-header');
    headers[1].click();
    fixture.detectChanges();
    
    expect(component.selectedItems.length).toBe(2);
  });

  it('should not toggle disabled items', () => {
    const disabledHeader = fixture.debugElement.nativeElement.querySelectorAll('.accordion-header')[2];
    
    disabledHeader.click();
    fixture.detectChanges();
    
    expect(disabledHeader.getAttribute('aria-expanded')).toBe('false');
  });

  it('should handle keyboard navigation', () => {
    const header = fixture.debugElement.nativeElement.querySelectorAll('.accordion-header')[1];
    
    header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    
    expect(component.selectedItems.length).toBe(1);
  });
});