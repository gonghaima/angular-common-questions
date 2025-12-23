import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiStepFormComponent, StepConfig } from './multi-step-form.component';
import { By } from '@angular/platform-browser';

describe('MultiStepFormComponent', () => {
  let component: MultiStepFormComponent;
  let fixture: ComponentFixture<MultiStepFormComponent>;

  const steps: StepConfig[] = [
    {
      label: 'Step 1',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', validators: [] }
      ]
    },
    {
      label: 'Step 2',
      fields: [
        { name: 'email', label: 'Email', type: 'email', validators: [] }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiStepFormComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiStepFormComponent);
    component = fixture.componentInstance;
    component.steps = steps;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the first step', () => {
    const label = fixture.debugElement.query(By.css('h3')).nativeElement.textContent;
    expect(label).toContain('Step 1');
  });

  it('should go to next step when nextStep is called and step is valid', () => {
    component.form.get('firstName')?.setValue('John');
    component.nextStep();
    fixture.detectChanges();
    expect(component.currentStep).toBe(1);
    const label = fixture.debugElement.query(By.css('h3')).nativeElement.textContent;
    expect(label).toContain('Step 2');
  });

  it('should emit submit event when form is valid and submitted', () => {
    const emitSpy = jest.spyOn(component.submit, 'emit');
    component.form.get('firstName')?.setValue('John');
    component.nextStep();
    component.form.get('email')?.setValue('john@example.com');
    component.onSubmit();
    expect(emitSpy).toHaveBeenCalledWith({ firstName: 'John', email: 'john@example.com' });
  });
});
