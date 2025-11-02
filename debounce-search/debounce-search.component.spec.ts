import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DebounceSearchComponent } from './debounce-search.component';
import { By } from '@angular/platform-browser';

describe('DebounceSearchComponent', () => {
  let component: DebounceSearchComponent;
  let fixture: ComponentFixture<DebounceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DebounceSearchComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebounceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit value after debounce time', fakeAsync(() => {
    const emitSpy = jest.spyOn(component.search, 'emit');
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'hello';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(399);
    expect(emitSpy).not.toHaveBeenCalled();
    tick(1);
    expect(emitSpy).toHaveBeenCalledWith('hello');
  }));

  it('should emit only distinct values', fakeAsync(() => {
    const emitSpy = jest.spyOn(component.search, 'emit');
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(400);
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(400);
    expect(emitSpy).toHaveBeenCalledTimes(1);
  }));

  it('should clear input and emit empty string', () => {
    const emitSpy = jest.spyOn(component.search, 'emit');
    component.searchControl.setValue('abc');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.searchControl.value).toBe('');
    expect(emitSpy).toHaveBeenCalledWith('');
  });
});
