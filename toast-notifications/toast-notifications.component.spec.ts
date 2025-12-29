import { ToastNotificationsComponent } from './toast-notifications.component';
import { ToastService } from './toast.service';
import { of } from 'rxjs';

describe('ToastNotificationsComponent', () => {
  let component: ToastNotificationsComponent;
  let toastService: ToastService;

  beforeEach(() => {
    toastService = {
      getToasts: jest.fn().mockReturnValue(of([])),
      addToast: jest.fn(),
      removeToast: jest.fn(),
    } as any;
    component = new ToastNotificationsComponent(toastService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addToast for success', () => {
    component.showSuccess();
    expect(toastService.addToast).toHaveBeenCalledWith(
      'Success message!',
      'success'
    );
  });

  it('should call addToast for error', () => {
    component.showError();
    expect(toastService.addToast).toHaveBeenCalledWith(
      'Error message!',
      'error'
    );
  });

  it('should call addToast for info', () => {
    component.showInfo();
    expect(toastService.addToast).toHaveBeenCalledWith('Info message!', 'info');
  });

  it('should call addToast for warning', () => {
    component.showWarning();
    expect(toastService.addToast).toHaveBeenCalledWith(
      'Warning message!',
      'warning'
    );
  });
});
