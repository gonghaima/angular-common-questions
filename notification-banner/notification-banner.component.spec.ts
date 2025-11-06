import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { NotificationBannerComponent } from './notification-banner.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-notification-banner [type]="type" [timeout]="timeout" (dismissed)="onDismiss()">
      <span class="msg">{{ message }}</span>
    </app-notification-banner>
  `,
  standalone: true,
  imports: [NotificationBannerComponent]
})
class HostComponent {
  type: 'success' | 'error' | 'info' | 'warning' = 'success';
  timeout?: number;
  message = 'Test message';
  onDismiss = jest.fn();
}

describe('NotificationBannerComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display message and type', () => {
    const banner = fixture.debugElement.query(By.css('.banner'));
    expect(banner).toBeTruthy();
    expect(banner.nativeElement.classList).toContain('success');
    expect(banner.nativeElement.textContent).toContain('Test message');
  });

  it('should dismiss on close button click', () => {
    const closeBtn = fixture.debugElement.query(By.css('.close')).nativeElement;
    closeBtn.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.banner'))).toBeNull();
    expect(host.onDismiss).toHaveBeenCalled();
  });

  it('should auto-dismiss after timeout', () => {
    jest.useFakeTimers();
    
    // Create new fixture with timeout set from start
    const timeoutFixture = TestBed.createComponent(HostComponent);
    const timeoutHost = timeoutFixture.componentInstance;
    timeoutHost.timeout = 100;
    timeoutFixture.detectChanges();
    
    // Get component instance
    const bannerComponent = timeoutFixture.debugElement.query(By.directive(NotificationBannerComponent)).componentInstance;
    
    // Verify banner is initially visible
    expect(bannerComponent.visible).toBe(true);
    expect(timeoutFixture.debugElement.query(By.css('.banner'))).toBeTruthy();
    
    // Fast-forward time
    jest.advanceTimersByTime(101);
    timeoutFixture.detectChanges();
    
    // Banner should be hidden and removed from DOM
    expect(bannerComponent.visible).toBe(false);
    expect(timeoutFixture.debugElement.query(By.css('.banner'))).toBeNull();
    expect(timeoutHost.onDismiss).toHaveBeenCalled();
    
    jest.useRealTimers();
  });

  it('should project custom content', () => {
    const msg = fixture.debugElement.query(By.css('.msg'));
    expect(msg.nativeElement.textContent).toContain('Test message');
  });
});
