import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, interval } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

@Component({
  selector: 'app-real-time-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="chat-container">
      <div class="search-bar">
        <input [formControl]="searchControl" placeholder="Search messages..." />
      </div>
      
      <div #messagesContainer class="messages-container">
        <div *ngFor="let message of filteredMessages; trackBy: trackByMessageId" 
             class="message" 
             [class.own-message]="message.sender === currentUser">
          <div class="message-header">
            <span class="sender">{{ message.sender }}</span>
            <span class="timestamp">{{ message.timestamp | date:'short' }}</span>
            <span class="status">{{ message.status }}</span>
          </div>
          <div class="message-content">{{ message.content }}</div>
        </div>
        
        <div *ngIf="isTyping" class="typing-indicator">
          Someone is typing...
        </div>
      </div>
      
      <div class="message-input">
        <input [formControl]="messageControl" 
               placeholder="Type a message..." 
               (keyup.enter)="sendMessage()" />
        <button (click)="sendMessage()" [disabled]="!messageControl.value?.trim()">
          Send
        </button>
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      display: flex;
      flex-direction: column;
      height: 400px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    
    .search-bar input {
      width: 100%;
      padding: 8px;
      border: none;
      border-bottom: 1px solid #eee;
    }
    
    .messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }
    
    .message {
      margin-bottom: 12px;
      padding: 8px;
      border-radius: 8px;
      background: #f5f5f5;
    }
    
    .own-message {
      background: #007bff;
      color: white;
      margin-left: 20%;
    }
    
    .message-header {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      margin-bottom: 4px;
    }
    
    .typing-indicator {
      font-style: italic;
      color: #666;
    }
    
    .message-input {
      display: flex;
      padding: 16px;
      border-top: 1px solid #eee;
    }
    
    .message-input input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 8px;
    }
    
    .message-input button {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .message-input button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class RealTimeChatComponent implements OnInit, OnDestroy {
  @Input() messages: Message[] = [];
  @Input() currentUser = 'You';
  @Output() messageSent = new EventEmitter<string>();
  @Output() messageSearch = new EventEmitter<string>();
  
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  
  messageControl = new FormControl('');
  searchControl = new FormControl('');
  filteredMessages: Message[] = [];
  isTyping = false;
  
  private destroy$ = new Subject<void>();
  private messageIdCounter = 1000;
  
  ngOnInit() {
    this.filteredMessages = [...this.messages];
    
    // Search functionality
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.filterMessages(searchTerm || '');
      this.messageSearch.emit(searchTerm || '');
    });
    
    // Simulate incoming messages
    interval(5000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.simulateIncomingMessage();
    });
    
    // Simulate typing indicator
    interval(8000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.simulateTyping();
    });
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  sendMessage() {
    const content = this.messageControl.value?.trim();
    if (!content) return;
    
    this.messageSent.emit(content);
    
    const newMessage: Message = {
      id: ++this.messageIdCounter,
      sender: this.currentUser,
      content,
      timestamp: new Date(),
      status: 'sent'
    };
    
    this.messages = [...this.messages, newMessage];
    this.filterMessages(this.searchControl.value || '');
    this.messageControl.setValue('');
    
    setTimeout(() => this.scrollToBottom(), 0);
  }
  
  trackByMessageId(index: number, message: Message): number {
    return message.id;
  }
  
  private filterMessages(searchTerm: string) {
    if (!searchTerm) {
      this.filteredMessages = [...this.messages];
    } else {
      this.filteredMessages = this.messages.filter(message =>
        message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.sender.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
  
  private simulateIncomingMessage() {
    const senders = ['Alice', 'Bob', 'Charlie'];
    const contents = ['Hello!', 'How are you?', 'What\'s up?', 'Good morning!'];
    
    const newMessage: Message = {
      id: ++this.messageIdCounter,
      sender: senders[Math.floor(Math.random() * senders.length)],
      content: contents[Math.floor(Math.random() * contents.length)],
      timestamp: new Date(),
      status: 'delivered'
    };
    
    this.messages = [...this.messages, newMessage];
    this.filterMessages(this.searchControl.value || '');
    setTimeout(() => this.scrollToBottom(), 0);
  }
  
  private simulateTyping() {
    this.isTyping = true;
    setTimeout(() => {
      this.isTyping = false;
    }, 2000);
  }
  
  private scrollToBottom() {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }
}