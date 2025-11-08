import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent, FormFieldConfig } from './dynamic-form.component';
import { By } from '@angular/platform-browser';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  const mockConfig: FormFieldConfig[] = [
    { key: 'name', type: 'text', label: 'Full Name', required: true },
    { key: 'email', type: 'email', label: 'Email', required: true },
    { key: 'age', type: 'number', label: 'Age', min: 18, max: 100 },
    { key: 'country', type: 'select', label: 'Country', options: ['US', 'UK', 'CA'] },
    { key: 'newsletter', type: 'checkbox', label: 'Subscribe to newsletter' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form fields based on configuration', () => {
    component.config = mockConfig;
    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.css('input'));
    const select = fixture.debugElement.query(By.css('select'));
    const labels = fixture.debugElement.queryAll(By.css('label'));

    expect(inputs.length).toBe(4);
    expect(select).toBeTruthy();
    expect(labels.length).toBe(5);
    expect(labels[0].nativeElement.textContent).toBe('Full Name');
  });

  it('should validate required fields', () => {
    component.config = mockConfig;
    fixture.detectChanges();

    const nameInput = fixture.debugElement.query(By.css('#name')).nativeElement;
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorDiv = fixture.debugElement.query(By.css('.error'));
    expect(errorDiv?.nativeElement.textContent).toContain('Full Name is required');
  });

  it('should validate email format', () => {
    component.config = mockConfig;
    fixture.detectChanges();

    component.form.get('email')?.setValue('invalid-email');
    component.form.get('email')?.markAsTouched();
    fixture.detectChanges();

    const errorDiv = fixture.debugElement.query(By.css('.error'));
    expect(errorDiv?.nativeElement.textContent).toContain('Invalid email format');
  });

  it('should validate number range', () => {
    component.config = mockConfig;
    fixture.detectChanges();

    component.form.get('age')?.setValue(10);
    component.form.get('age')?.markAsTouched();
    fixture.detectChanges();

    const errorDiv = fixture.debugElement.query(By.css('.error'));
    expect(errorDiv?.nativeElement.textContent).toContain('Minimum value is 18');
  });

  it('should emit form submission with valid data', () => {
    const emitSpy = jest.spyOn(component.formSubmit, 'emit');
    component.config = mockConfig;
    fixture.detectChanges();

    component.form.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      age: 25,
      country: 'US',
      newsletter: true
    });
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));

    expect(emitSpy).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      age: 25,
      country: 'US',
      newsletter: true
    });
  });

  it('should emit value changes', () => {
    const emitSpy = jest.spyOn(component.valueChanges, 'emit');
    component.config = mockConfig;
    fixture.detectChanges();

    component.form.get('name')?.setValue('John');

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should handle conditional field visibility', () => {
    const configWithCondition: FormFieldConfig[] = [
      { key: 'hasAccount', type: 'checkbox', label: 'I have an account' },
      { 
        key: 'username', 
        type: 'text', 
        label: 'Username',
        showIf: (formValue) => formValue.hasAccount 
      }
    ];

    component.config = configWithCondition;
    fixture.detectChanges();

    let usernameInput = fixture.debugElement.query(By.css('#username'));
    expect(usernameInput).toBeFalsy();

    component.form.get('hasAccount')?.setValue(true);
    fixture.detectChanges();

    usernameInput = fixture.debugElement.query(By.css('#username'));
    expect(usernameInput).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    component.config = mockConfig;
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTruthy();

    component.form.patchValue({
      name: 'John Doe',
      email: 'john@example.com'
    });
    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalsy();
  });
});