import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface StepConfig {
  label: string;
  fields: Array<{
    name: string;
    label: string;
    type: string;
    validators?: any[];
  }>;
}

@Component({
  selector: 'multi-step-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div *ngFor="let step of steps; let i = index">
        <div *ngIf="currentStep === i">
          <h3>{{ step.label }}</h3>
          <div *ngFor="let field of step.fields">
            <label>{{ field.label }}</label>
            <input [type]="field.type" [formControlName]="field.name" />
            <div *ngIf="form.get(field.name)?.invalid && form.get(field.name)?.touched">
              Field is required
            </div>
          </div>
        </div>
      </div>
      <button type="button" (click)="prevStep()" [disabled]="currentStep === 0">Previous</button>
      <button type="button" (click)="nextStep()" *ngIf="currentStep < steps.length - 1">Next</button>
      <button type="submit" *ngIf="currentStep === steps.length - 1">Submit</button>
    </form>
  `,
  styles: [`form { max-width: 400px; margin: auto; }`]
})
export class MultiStepFormComponent implements OnInit {
  @Input() steps: StepConfig[] = [];
  @Output() submit = new EventEmitter<any>();

  form!: FormGroup;
  currentStep = 0;

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const controls: { [key: string]: FormControl } = {};
    this.steps.forEach(step => {
      step.fields.forEach(field => {
        controls[field.name] = new FormControl('', field.validators || []);
      });
    });
    this.form = new FormGroup(controls);
  }

  nextStep() {
    if (this.isStepValid()) {
      this.currentStep++;
    } else {
      this.markStepTouched();
    }
  }

  prevStep() {
    
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isStepValid() {
    const step = this.steps[this.currentStep];
    let valid = true;
    step.fields.forEach(field => {
      if (this.form.get(field.name)?.invalid) {
        valid = false;
      }
    });
    return valid;
  }

  markStepTouched() {
    const step = this.steps[this.currentStep];
    step.fields.forEach(field => {
      this.form.get(field.name)?.markAsTouched();
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.markStepTouched();
    }
  }
}