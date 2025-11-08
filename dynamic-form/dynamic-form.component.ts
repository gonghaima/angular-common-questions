import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

export interface FormFieldConfig {
  key: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'textarea';
  label: string;
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
  showIf?: (formValue: any) => boolean;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div *ngFor="let field of config" class="field-group">
        <div *ngIf="shouldShowField(field)">
          <label [for]="field.key">{{ field.label }}</label>
          
          <input 
            *ngIf="field.type === 'text' || field.type === 'email' || field.type === 'number'"
            [id]="field.key"
            [type]="field.type"
            [formControlName]="field.key"
            [min]="field.min"
            [max]="field.max">
          
          <select 
            *ngIf="field.type === 'select'"
            [id]="field.key"
            [formControlName]="field.key">
            <option value="">Select...</option>
            <option *ngFor="let option of field.options" [value]="option">{{ option }}</option>
          </select>
          
          <textarea 
            *ngIf="field.type === 'textarea'"
            [id]="field.key"
            [formControlName]="field.key">
          </textarea>
          
          <input 
            *ngIf="field.type === 'checkbox'"
            type="checkbox"
            [id]="field.key"
            [formControlName]="field.key">
          
          <div class="error" *ngIf="getFieldError(field.key)">
            {{ getFieldError(field.key) }}
          </div>
        </div>
      </div>
      
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `,
  styles: [`
    .field-group { margin-bottom: 1rem; }
    label { display: block; margin-bottom: 0.25rem; font-weight: bold; }
    input, select, textarea { width: 100%; padding: 0.5rem; border: 1px solid #ccc; }
    .error { color: red; font-size: 0.875rem; margin-top: 0.25rem; }
    button { padding: 0.75rem 1.5rem; background: #007bff; color: white; border: none; cursor: pointer; }
    button:disabled { background: #ccc; cursor: not-allowed; }
  `]
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() config: FormFieldConfig[] = [];
  @Output() formSubmit = new EventEmitter<any>();
  @Output() valueChanges = new EventEmitter<any>();

  form!: FormGroup;
  private sub!: Subscription;



  ngOnInit() {
    this.buildForm();
    this.sub = this.form.valueChanges
      .subscribe(value => this.valueChanges.emit(value));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private buildForm() {
    const controls: { [key: string]: FormControl } = {};
    
    this.config.forEach(field => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.type === 'email') validators.push(Validators.email);
      if (field.min !== undefined) validators.push(Validators.min(field.min));
      if (field.max !== undefined) validators.push(Validators.max(field.max));
      
      const defaultValue = field.type === 'checkbox' ? false : '';
      controls[field.key] = new FormControl(defaultValue, validators);
    });
    
    this.form = new FormGroup(controls);
  }

  shouldShowField(field: FormFieldConfig): boolean {
    return !field.showIf || field.showIf(this.form?.value || {});
  }

  getFieldError(fieldKey: string): string | null {
    const control = this.form.get(fieldKey);
    if (!control || !control.errors || !control.touched) return null;
    
    if (control.errors['required']) return `${this.getFieldLabel(fieldKey)} is required`;
    if (control.errors['email']) return 'Invalid email format';
    if (control.errors['min']) return `Minimum value is ${control.errors['min'].min}`;
    if (control.errors['max']) return `Maximum value is ${control.errors['max'].max}`;
    
    return 'Invalid input';
  }

  private getFieldLabel(fieldKey: string): string {
    const field = this.config.find(f => f.key === fieldKey);
    return field?.label || fieldKey;
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}