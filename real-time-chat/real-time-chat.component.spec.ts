import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RealTimeChatComponent, Message } from './real-time-chat.component';

@Component({
  template: `
    <app-real-time-chat 
      [messages]="messages"
      [currentUser]="currentUser"
      (messageSent)="onMessageSent($event)"
      (messageSearch)="onMessageSearch($event)">
    </app-real-time-chat>
  `,
  standalone: true,
  imports: [RealTimeChatComponent],
})
class HostComponent {
  messages: Message[] = [
    { id: 1, sender: 'Alice', content: 'Hello!', timestamp: new Date(), status: 'read' },
    { id: 2, sender: 'Bob', content: 'Hi there!', timestamp: new Date(), status: 'delivered' }
  ];
  currentUser = 'You';
  onMessageSent = jest.fn();
  onMessageSearch = jest.fn();
}

describe('RealTimeChatComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let component: RealTimeChatComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(RealTimeChatComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display messages correctly', () => {
    const messageElements = fixture.debugElement.queryAll(By.css('.message'));
    expect(messageElements.length).toBe(2);
    
    const firstMessage = messageElements[0];
    expect(firstMessage.nativeElement.textContent).toContain('Alice');
    expect(firstMessage.nativeElement.textContent).toContain('Hello!');
  });

  it('should send message when send button is clicked', () => {
    component.messageControl.setValue('Test message');
    fixture.detectChanges();
    
    const sendButton = fixture.debugElement.query(By.css('.message-input button'));
    sendButton.nativeElement.click();
    
    expect(host.onMessageSent).toHaveBeenCalledWith('Test message');
    expect(component.messageControl.value).toBe('');
  });

  it('should send message on Enter key press', () => {
    component.messageControl.setValue('Test message');
    fixture.detectChanges();
    
    const input = fixture.debugElement.query(By.css('.message-input input'));
    input.triggerEventHandler('keyup.enter', {});
    
    expect(host.onMessageSent).toHaveBeenCalledWith('Test message');
  });

  it('should not send empty messages', () => {
    component.messageControl.setValue('   ');
    fixture.detectChanges();
    
    const sendButton = fixture.debugElement.query(By.css('.message-input button'));
    sendButton.nativeElement.click();
    
    expect(host.onMessageSent).not.toHaveBeenCalled();
  });

  it('should disable send button when input is empty', () => {
    component.messageControl.setValue('');
    fixture.detectChanges();
    
    let sendButton = fixture.debugElement.query(By.css('.message-input button'));
    expect(sendButton.nativeElement.disabled).toBe(true);
    
    component.messageControl.setValue('Test');
    fixture.detectChanges();
    
    sendButton = fixture.debugElement.query(By.css('.message-input button'));
    expect(sendButton.nativeElement.disabled).toBe(false);
  });

  it('should filter messages based on search term', fakeAsync(() => {
    component.searchControl.setValue('Alice');
    tick(300); // Wait for debounce
    
    expect(component.filteredMessages.length).toBe(1);
    expect(component.filteredMessages[0].sender).toBe('Alice');
    expect(host.onMessageSearch).toHaveBeenCalledWith('Alice');
  }));

  it('should show all messages when search is cleared', fakeAsync(() => {
    component.searchControl.setValue('Alice');
    tick(300);
    expect(component.filteredMessages.length).toBe(1);
    
    component.searchControl.setValue('');
    tick(300);
    expect(component.filteredMessages.length).toBe(2);
  }));

  it('should apply own-message class for current user messages', () => {
    host.currentUser = 'Alice';
    fixture.detectChanges();
    
    const messageElements = fixture.debugElement.queryAll(By.css('.message'));
    const aliceMessage = messageElements[0];
    
    expect(aliceMessage.nativeElement.classList).toContain('own-message');
  });

  it('should track messages by id', () => {
    const message = host.messages[0];
    const trackResult = component.trackByMessageId(0, message);
    expect(trackResult).toBe(message.id);
  });

  it('should show typing indicator', () => {
    component.isTyping = true;
    fixture.detectChanges();
    
    const typingIndicator = fixture.debugElement.query(By.css('.typing-indicator'));
    expect(typingIndicator).toBeTruthy();
    expect(typingIndicator.nativeElement.textContent.trim()).toBe('Someone is typing...');
  });

  it('should add new message to the list when sending', () => {
    const initialLength = component.messages.length;
    
    component.messageControl.setValue('New message');
    component.sendMessage();
    
    expect(component.messages.length).toBe(initialLength + 1);
    expect(component.messages[component.messages.length - 1].content).toBe('New message');
    expect(component.messages[component.messages.length - 1].sender).toBe(component.currentUser);
  });
});