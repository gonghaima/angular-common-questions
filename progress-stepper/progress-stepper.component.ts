import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Step {
  label: string;
  completed: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-progress-stepper',
  template: `
    <div class="stepper-container">
      <div class="stepper-header">
        <div 
          *ngFor="let step of steps; let i = index" 
          class="step-wrapper"
          [class.last-step]="i === steps.length - 1">
          
          <div 
            class="step"
            [class.current]="i === currentStep"
            [class.completed]="step.completed"
            [class.disabled]="step.disabled"
            [class.clickable]="isStepClickable(i)"
            (click)="onStepClick(i)">
            
            <div class="step-number">
              <span *ngIf="!step.completed">{{ i + 1 }}</span>
              <span *ngIf="step.completed" class="checkmark">✓</span>
            </div>
            
            <div class="step-label">{{ step.label }}</div>
          </div>
          
          <div *ngIf="i < steps.length - 1" class="step-connector"
               [class.completed]="step.completed"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stepper-container {
      width: 100%;
      padding: 20px;
    }
    
    .stepper-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .step-wrapper {
      display: flex;
      align-items: center;
      flex: 1;
    }
    
    .step-wrapper.last-step {
      flex: none;
    }
    
    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: default;
    }
    
    .step.clickable {
      cursor: pointer;
    }
    
    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      border: 2px solid #ddd;
      background: white;
      color: #666;
      margin-bottom: 8px;
    }
    
    .step.current .step-number {
      border-color: #007bff;
      background: #007bff;
      color: white;
    }
    
    .step.completed .step-number {
      border-color: #28a745;
      background: #28a745;
      color: white;
    }
    
    .step.disabled .step-number {
      border-color: #ccc;
      background: #f8f9fa;
      color: #ccc;
    }
    
    .step-label {
      font-size: 14px;
      text-align: center;
      color: #666;
      min-width: 80px;
    }
    
    .step.current .step-label {
      color: #007bff;
      font-weight: 500;
    }
    
    .step.completed .step-label {
      color: #28a745;
    }
    
    .step.disabled .step-label {
      color: #ccc;
    }
    
    .step-connector {
      flex: 1;
      height: 2px;
      background: #ddd;
      margin: 0 10px;
    }
    
    .step-connector.completed {
      background: #28a745;
    }
    
    .checkmark {
      font-size: 18px;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class ProgressStepperComponent {
  @Input() steps: Step[] = [];
  @Input() currentStep: number = 0;
  @Input() linear: boolean = true;
  
  @Output() stepChange = new EventEmitter<number>();
  @Output() stepClick = new EventEmitter<number>();

  onStepClick(stepIndex: number): void {
    this.stepClick.emit(stepIndex);
    
    if (this.isStepClickable(stepIndex)) {
      this.currentStep = stepIndex;
      this.stepChange.emit(stepIndex);
    }
  }

  isStepClickable(stepIndex: number): boolean {
    const step = this.steps[stepIndex];
    
    if (step?.disabled) {
      return false;
    }
    
    if (this.linear) {
      // In linear mode, only allow clicking on completed steps or the next step
      return step?.completed || stepIndex <= this.currentStep + 1;
    }
    
    // In non-linear mode, allow clicking on any non-disabled step
    return true;
  }
}