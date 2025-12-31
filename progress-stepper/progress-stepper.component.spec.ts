import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressStepperComponent, Step } from './progress-stepper.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ProgressStepperComponent', () => {
  let component: ProgressStepperComponent;
  let fixture: ComponentFixture<ProgressStepperComponent>;

  const mockSteps: Step[] = [
    { label: 'Step 1', completed: true },
    { label: 'Step 2', completed: false },
    { label: 'Step 3', completed: false, disabled: true }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressStepperComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressStepperComponent);
    component = fixture.componentInstance;
    component.steps = mockSteps;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all steps with correct labels', () => {
    const stepElements = fixture.debugElement.queryAll(By.css('.step'));
    expect(stepElements.length).toBe(3);
    
    const labels = stepElements.map(el => el.query(By.css('.step-label')).nativeElement.textContent.trim());
    expect(labels).toEqual(['Step 1', 'Step 2', 'Step 3']);
  });

  it('should show checkmark for completed steps', () => {
    const firstStep = fixture.debugElement.query(By.css('.step'));
    const checkmark = firstStep.query(By.css('.checkmark'));
    expect(checkmark).toBeTruthy();
    expect(checkmark.nativeElement.textContent).toBe('✓');
  });

  it('should show step number for non-completed steps', () => {
    const stepElements = fixture.debugElement.queryAll(By.css('.step'));
    const secondStepNumber = stepElements[1].query(By.css('.step-number span:not(.checkmark)'));
    expect(secondStepNumber.nativeElement.textContent).toBe('2');
  });

  it('should apply current class to current step', () => {
    component.currentStep = 1;
    fixture.detectChanges();
    
    const stepElements = fixture.debugElement.queryAll(By.css('.step'));
    expect(stepElements[1].nativeElement.classList).toContain('current');
    expect(stepElements[0].nativeElement.classList).not.toContain('current');
  });

  it('should apply completed class to completed steps', () => {
    const stepElements = fixture.debugElement.queryAll(By.css('.step'));
    expect(stepElements[0].nativeElement.classList).toContain('completed');
    expect(stepElements[1].nativeElement.classList).not.toContain('completed');
  });

  it('should apply disabled class to disabled steps', () => {
    const stepElements = fixture.debugElement.queryAll(By.css('.step'));
    expect(stepElements[2].nativeElement.classList).toContain('disabled');
  });

  it('should emit stepClick event when step is clicked', () => {
    jest.spyOn(component.stepClick, 'emit');
    
    const firstStep = fixture.debugElement.query(By.css('.step'));
    firstStep.nativeElement.click();
    
    expect(component.stepClick.emit).toHaveBeenCalledWith(0);
  });

  it('should emit stepChange event when clickable step is clicked', () => {
    jest.spyOn(component.stepChange, 'emit');
    component.currentStep = 0;
    
    const firstStep = fixture.debugElement.query(By.css('.step'));
    firstStep.nativeElement.click();
    
    expect(component.stepChange.emit).toHaveBeenCalledWith(0);
  });

  describe('Linear mode', () => {
    beforeEach(() => {
      component.linear = true;
      component.currentStep = 1;
    });

    it('should allow clicking on completed steps', () => {
      expect(component.isStepClickable(0)).toBe(true);
    });

    it('should allow clicking on current step', () => {
      expect(component.isStepClickable(1)).toBe(true);
    });

    it('should not allow clicking on future steps', () => {
      expect(component.isStepClickable(2)).toBe(false);
    });

    it('should not allow clicking on disabled steps', () => {
      component.steps[2].disabled = true;
      expect(component.isStepClickable(2)).toBe(false);
    });
  });

  describe('Non-linear mode', () => {
    beforeEach(() => {
      component.linear = false;
    });

    it('should allow clicking on any non-disabled step', () => {
      expect(component.isStepClickable(0)).toBe(true);
      expect(component.isStepClickable(1)).toBe(true);
    });

    it('should not allow clicking on disabled steps', () => {
      expect(component.isStepClickable(2)).toBe(false);
    });
  });

  it('should show step connectors between steps', () => {
    const connectors = fixture.debugElement.queryAll(By.css('.step-connector'));
    expect(connectors.length).toBe(2); // n-1 connectors for n steps
  });

  it('should apply completed class to connectors after completed steps', () => {
    const connectors = fixture.debugElement.queryAll(By.css('.step-connector'));
    expect(connectors[0].nativeElement.classList).toContain('completed');
    expect(connectors[1].nativeElement.classList).not.toContain('completed');
  });

  it('should apply clickable class to clickable steps', () => {
    component.linear = false;
    fixture.detectChanges();
    
    const stepElements = fixture.debugElement.queryAll(By.css('.step'));
    expect(stepElements[0].nativeElement.classList).toContain('clickable');
    expect(stepElements[1].nativeElement.classList).toContain('clickable');
    expect(stepElements[2].nativeElement.classList).not.toContain('clickable'); // disabled
  });
});