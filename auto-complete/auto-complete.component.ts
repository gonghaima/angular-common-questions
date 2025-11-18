import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild, ContentChild, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, finalize } from 'rxjs/operators';

export interface AutoCompleteItem {
  id: string | number;
  label: string;
  value?: any;
}

@Component({
  selector: 'app-auto-complete',
  template: `
    <div class="auto-complete-container">
      <input 
        #inputRef
        [formControl]="searchControl"
        [placeholder]="placeholder"
        (focus)="onFocus()"
        (keydown)="onKeyDown($event)"
        class="auto-complete-input">
      
      <div *ngIf="showDropdown" class="dropdown">
        <div *ngIf="loading" class="loading">Loading...</div>
        <div *ngIf="!loading && suggestions.length === 0" class="no-results">No results found</div>
        <div 
          *ngFor="let item of suggestions; let i = index"
          [class.highlighted]="i === highlightedIndex"
          (click)="selectItem(item)"
          class="suggestion-item">
          
          <ng-container *ngIf="suggestionTemplate; else defaultTemplate">
            <ng-container *ngTemplateOutlet="suggestionTemplate; context: { $implicit: item }"></ng-container>
          </ng-container>
          
          <ng-template #defaultTemplate>
            {{ item.label }}
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auto-complete-container { position: relative; }
    .auto-complete-input { width: 100%; padding: 8px; border: 1px solid #ccc; }
    .dropdown { 
      position: absolute; 
      top: 100%; 
      left: 0; 
      right: 0; 
      background: white; 
      border: 1px solid #ccc; 
      max-height: 200px; 
      overflow-y: auto; 
      z-index: 1000; 
    }
    .suggestion-item { 
      padding: 8px; 
      cursor: pointer; 
      border-bottom: 1px solid #eee; 
    }
    .suggestion-item:hover, .highlighted { background-color: #f0f0f0; }
    .loading, .no-results { padding: 8px; color: #666; }
  `]
})
export class AutoCompleteComponent implements OnInit, OnDestroy {
  @Input() searchFn!: (query: string) => Observable<AutoCompleteItem[]>;
  @Input() placeholder = 'Search...';
  @Output() selectionChange = new EventEmitter<AutoCompleteItem>();

  @ViewChild('inputRef') inputRef!: ElementRef;
  @ContentChild('suggestionTemplate') suggestionTemplate?: TemplateRef<any>;

  searchControl = new FormControl('');
  suggestions: AutoCompleteItem[] = [];
  showDropdown = false;
  loading = false;
  highlightedIndex = -1;
  
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query || query.length < 2) {
          this.suggestions = [];
          this.showDropdown = false;
          return [];
        }
        
        this.loading = true;
        return this.searchFn(query).pipe(
          finalize(() => this.loading = false)
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe(suggestions => {
      this.suggestions = suggestions;
      this.showDropdown = suggestions.length > 0;
      this.highlightedIndex = -1;
    });
  }

  onFocus() {
    if (this.suggestions.length > 0) {
      this.showDropdown = true;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, this.suggestions.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex >= 0) {
          this.selectItem(this.suggestions[this.highlightedIndex]);
        }
        break;
      case 'Escape':
        this.showDropdown = false;
        this.inputRef.nativeElement.blur();
        break;
    }
  }

  selectItem(item: AutoCompleteItem) {
    this.searchControl.setValue(item.label);
    this.showDropdown = false;
    this.selectionChange.emit(item);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}