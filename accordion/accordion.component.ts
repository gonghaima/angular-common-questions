import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { AccordionItemComponent } from './accordion-item.component';

@Component({
  selector: 'app-accordion',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class AccordionComponent implements AfterContentInit {
  @Input() multiple = false;
  @Output() selectionChange = new EventEmitter<string[]>();

  @ContentChildren(AccordionItemComponent) items!: QueryList<AccordionItemComponent>;

  ngAfterContentInit() {
    this.items.forEach(item => {
      item.toggle.subscribe(() => this.onItemToggle(item));
    });
  }

  private onItemToggle(toggledItem: AccordionItemComponent) {
    if (!this.multiple) {
      this.items.forEach(item => {
        if (item !== toggledItem) {
          item.expanded = false;
        }
      });
    }
    
    const openItems = this.items.filter(item => item.expanded).map(item => item.id);
    this.selectionChange.emit(openItems);
  }
}