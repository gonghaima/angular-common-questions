import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-debounce-search',
  template: `
    <input [formControl]="searchControl" [placeholder]="placeholder" />
    <button *ngIf="searchControl.value" (click)="clear()">Clear</button>
  `
})
export class DebounceSearchComponent implements OnInit, OnDestroy {
  @Input() placeholder = 'Search...';
  @Output() search = new EventEmitter<string>();

  searchControl = new FormControl('');
  private sub!: Subscription;

  ngOnInit() {
    this.sub = this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(value => this.search.emit(value || ''));
  }

  clear() {
    this.searchControl.setValue('');
    this.search.emit('');
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
